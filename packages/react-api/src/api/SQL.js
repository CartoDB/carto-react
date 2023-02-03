import { encodeParameter, getRequest, postRequest } from '@carto/react-core';
import { REQUEST_GET_MAX_URL_LENGTH } from '@carto/react-core';
import { API_VERSIONS } from '@deck.gl/carto';

import { dealWithApiError, CLIENT_ID } from './common';

const DEFAULT_USER_COMPONENT_IN_URL = '{user}';

/**
 * Executes a SQL query
 *
 * @param { object } props
 * @param { Object } props.credentials - CARTO user credentials
 * @param { string } props.credentials.username - CARTO username
 * @param { string } props.credentials.apiKey - CARTO API Key
 * @param { string } props.credentials.serverUrlTemplate - CARTO server URL template
 * @param { string } props.query - SQL query to be executed
 * @param { string } props.connection - connection name required for CARTO cloud native
 * @param { Object } props.opts - Additional options for the HTTP request
 * @param { import('@deck.gl/carto').QueryParameters } props.queryParameters - SQL query parameters
 */
export const executeSQL = async ({
  credentials,
  query,
  connection,
  opts,
  queryParameters
}) => {
  let response;

  if (!credentials) {
    throw new Error('No credentials provided');
  }

  try {
    const request = createRequest({
      credentials,
      connection,
      query,
      opts,
      queryParameters
    });
    response = await fetch(request);
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to SQL API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ credentials, response, data });
  }

  const { apiVersion = API_VERSIONS.V2 } = credentials;

  if (apiVersion === API_VERSIONS.V3) {
    return data.rows;
  }

  return opts && opts.format === 'geojson' ? data : data.rows; // just rows portion of result object
};

/**
 * Create an 'SQL query' request
 * (using GET or POST request, depending on url size)
 */
function createRequest({
  credentials,
  connection,
  query,
  opts = {},
  queryParameters = []
}) {
  const { abortController, ...otherOptions } = opts;

  const { apiVersion = API_VERSIONS.V2 } = credentials;

  const rawParams = {
    client: CLIENT_ID,
    q: query?.trim(),
    ...otherOptions
  };

  if (apiVersion === API_VERSIONS.V1 || apiVersion === API_VERSIONS.V2) {
    rawParams.api_key = credentials.apiKey;
  }

  const requestOpts = { ...otherOptions };
  if (abortController) {
    requestOpts['signal'] = abortController.signal;
  }

  // Get request
  const getParams = {
    ...rawParams,
    queryParameters: queryParameters ? JSON.stringify(queryParameters) : undefined
  };
  const urlParamsForGet = Object.entries(getParams).map(([key, value]) =>
    encodeParameter(key, value)
  );
  const getUrl = generateApiUrl({
    credentials,
    connection,
    parameters: urlParamsForGet
  });

  const isGet = getUrl.length < REQUEST_GET_MAX_URL_LENGTH;
  if (isGet) {
    if (apiVersion === API_VERSIONS.V3) {
      return getRequest(getUrl, requestOpts, {
        Authorization: `Bearer ${credentials.accessToken}`
      });
    } else {
      return getRequest(getUrl, requestOpts);
    }
  }

  // Post request
  const urlParamsForPost =
    apiVersion === API_VERSIONS.V3
      ? [`client=${CLIENT_ID}`]
      : null;

  const payload = {
    ...rawParams,
    queryParameters
  };
  const postUrl = generateApiUrl({
    credentials,
    connection,
    parameters: urlParamsForPost
  });
  if (apiVersion === API_VERSIONS.V3) {
    return postRequest(postUrl, payload, requestOpts, {
      Authorization: `Bearer ${credentials.accessToken}`
    });
  }
  return postRequest(postUrl, payload, requestOpts);
}

/**
 * Generate a valid API url for a request
 */
export function generateApiUrl({ credentials, connection, parameters }) {
  const { apiVersion = API_VERSIONS.V2, apiBaseUrl } = credentials;

  let url;
  switch (apiVersion) {
    case API_VERSIONS.V1:
    case API_VERSIONS.V2:
      url = `${sqlApiUrl(credentials)}api/v2/sql`;
      break;

    case API_VERSIONS.V3:
      url = `${apiBaseUrl}/v3/sql/${connection}/query`;
      break;

    default:
      throw new Error(`Unknown apiVersion ${apiVersion}`);
  }

  if (!parameters) {
    return url;
  }

  return `${url}?${parameters.join('&')}`;
}

/**
 * Prepare a url valid for the specified user, from the serverUrlTemplate
 */
function sqlApiUrl(credentials) {
  let url = credentials.serverUrlTemplate.replace(
    DEFAULT_USER_COMPONENT_IN_URL,
    credentials.username
  );

  if (!url.endsWith('/')) {
    url += '/';
  }

  return url;
}
