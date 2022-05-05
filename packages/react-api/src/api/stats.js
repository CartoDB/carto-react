import { checkCredentials, dealWithApiError } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

const mandatoryProps = ['source', 'column'];

/**
 * Execute a stats service request.
 *
 * @param { object } props
 * @param { string } props.column -
 * @param { object } props.source -
 * @param { object= } props.opts - Additional options for the HTTP request
 */
export async function callStats(props) {
  mandatoryProps.forEach((prop) => {
    if (!props[prop]) throw new Error('callStats: Missing source');
  });

  const { source, column, opts } = props;

  checkCredentials(source.credentials);
  if (source.type === MAP_TYPES.TILESET) {
    throw new Error('callStats cannot be used with static tilesets');
  }
  if (source.credentials.apiVersion === API_VERSIONS.V2) {
    throw new Error('callStats cannot be used with CARTO 2.');
  }

  const url = buildUrl(source, column);

  const { abortController, ...otherOptions } = opts || {};

  let response;
  let data;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${source.credentials.accessToken}`
      },
      signal: abortController?.signal,
      ...otherOptions
    });
    data = await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to LDS API: ${error}`);
  }

  if (!response.ok) {
    dealWithApiError({ response, data });
  }

  return data;
}

// Aux
function buildUrl(source, column) {
  const isQuery = source.type === MAP_TYPES.QUERY;

  const url = new URL(
    `${source.credentials.apiBaseUrl}/v3/stats/${source.connection}/${
      isQuery ? column : `${source.data}/${column}`
    }`
  );

  if (source.type === MAP_TYPES.QUERY) {
    url.searchParams.set('q', source.data);
  }

  return url;
}
