import { assert, checkCredentials, makeCall } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

/**
 * Execute a stats service request.
 *
 * @param { object } props
 * @param { string } props.column -
 * @param { object } props.source -
 * @param { object= } props.opts - Additional options for the HTTP request
 */
export async function callStats(props) {
  assert(props.source, 'callStats: missing source');
  assert(props.column, 'callStats: missing column');

  const { source, column, opts } = props;

  checkCredentials(source.credentials);

  if (source.type === MAP_TYPES.TILESET) {
    throw new Error('callStats cannot be used with static tilesets');
  }
  assert(
    source.credentials.apiVersion === API_VERSIONS.V3,
    'Stats API is a feature only available in CARTO 3.'
  );

  const url = buildUrl(source, column);

  return makeCall({ url, credentials: source.credentials, opts });
}

// Aux
function buildUrl(source, column) {
  const isQuery = source.type === MAP_TYPES.QUERY;

  const url = new URL(
    `${source.credentials.apiBaseUrl}/v3/stats/${source.connection}/${
      isQuery ? column : `${source.data}/${column}`
    }`
  );

  if (isQuery) {
    url.searchParams.set('q', source.data);
  }

  return url;
}
