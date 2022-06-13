import { assert, checkCredentials, makeCall } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { getTileJson } from './tilejson';
import { InvalidColumnError } from '@carto/react-core/';

/**
 * Execute a stats service request.
 *
 * @param { object } props
 * @param { string } props.column - column to get stats for
 * @param { object } props.source - source that owns the column
 * @param { object= } props.opts - Additional options for the HTTP request
 */
export async function getStats(props) {
  assert(props.source, 'getStats: missing source');
  assert(props.column, 'getStats: missing column');

  const { source, column, opts } = props;

  checkCredentials(source.credentials);

  assert(
    source.credentials.apiVersion === API_VERSIONS.V3,
    'Stats API is a feature only available in CARTO 3.'
  );

  if (source.type === MAP_TYPES.TILESET) {
    const tileJson = await getTileJson({ source });
    const tileStatsAttributes = tileJson.tilestats.layers[0].attributes;
    const columnStats = tileStatsAttributes.find(({ attribute }) => attribute === column);

    if (!columnStats) {
      throw new InvalidColumnError(`${column} not found in tileset attributes`);
    }

    return columnStats;
  } else {
    const url = buildUrl(source, column);

    return makeCall({ url, credentials: source.credentials, opts });
  }
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
