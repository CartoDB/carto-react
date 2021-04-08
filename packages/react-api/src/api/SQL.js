import { encodeParameter, getRequest, postRequest } from '@carto/react-core';
import { REQUEST_GET_MAX_URL_LENGTH } from '@carto/react-core';
import { ExecuteSQL } from '../types';

import { dealWithApiError, generateApiUrl } from './common';

export const API = 'api/v2/sql';

/**
 * Executes a SQL query
 *
 * @param { Object } credentials - CARTO user credentials
 * @param { string } credentials.username - CARTO username
 * @param { string } credentials.apiKey - CARTO API Key
 * @param { string } credentials.serverUrlTemplate - CARTO server URL template
 * @param { string } query - SQL query to be executed
 * @param { Object } opts - Additional options for the HTTP request
 * @param { string } opts.format - Output format (i.e. geojson)
 * @returns { ExecuteSQL } - Data returned from the SQL query execution
 */
export const executeSQL = async (credentials, query, opts = { format: '' }) => {
  let response;

  try {
    const request = createRequest({ credentials, query, opts });
    response = await fetch(request);
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to ${API} API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ API, credentials, response, data });
  }

  return opts && opts.format === 'geojson' ? data : data.rows; // just rows portion of result object
};

/**
 * Create an 'SQL query' request
 * (using GET or POST request, depending on url size)
 */
function createRequest({ credentials, query, opts }) {
  const { abortController, ...otherOptions } = opts;

  const rawParams = {
    api_key: credentials.apiKey,
    client: credentials.username,
    q: query.trim(),
    ...otherOptions
  };

  const requestOpts = { ...otherOptions };
  if (abortController) {
    requestOpts['signal'] = abortController.signal;
  }

  // Get request
  const encodedParams = Object.entries(rawParams).map(([key, value]) =>
    encodeParameter(key, value)
  );
  const getUrl = generateApiUrl({ API, credentials, parameters: encodedParams });
  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    return getRequest(getUrl, requestOpts);
  }

  // Post request
  const postUrl = generateApiUrl({ API, credentials });
  return postRequest(postUrl, rawParams, requestOpts);
}
