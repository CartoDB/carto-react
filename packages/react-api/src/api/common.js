import { API_VERSIONS } from '@deck.gl/carto';

const DEFAULT_USER_COMPONENT_IN_URL = '{user}';

/**
 * Return more descriptive error from API
 */
export function dealWithApiError({ credentials, response, data }) {
  switch (response.status) {
    case 401:
      throw new Error(`Unauthorized access to SQL API. Invalid credentials.`);
    case 403:
      throw new Error(`Unauthorized access to SQL API. Invalid credentials.`);
    default:
      throw new Error(`${JSON.stringify(data.error)}`);
  }
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
