import { checkCredentials, makeCall } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { getTileJson } from './tilejson';
import {
  InvalidColumnError,
  REQUEST_GET_MAX_URL_LENGTH,
  _assert as assert
} from '@carto/react-core/';

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
  }

  const isQuery = source.type === MAP_TYPES.QUERY;
  const baseUrl = new URL(
    `${source.credentials.apiBaseUrl}/v3/stats/${source.connection}/${
      isQuery ? column : `${source.data}/${column}`
    }`
  );

  const queryParams = {};
  if (isQuery) {
    queryParams.q = source.data;
    if (source.queryParameters) {
      queryParams.queryParameters = JSON.stringify(source.queryParameters);
    }
  }

  const queryParamsFormatted = new URLSearchParams(queryParams).toString();
  const getUrl = `${baseUrl}${queryParamsFormatted ? '?' + queryParamsFormatted : ''}`;
  if (getUrl.length <= REQUEST_GET_MAX_URL_LENGTH) {
    return makeCall({
      url: getUrl,
      credentials: source.credentials,
      opts
    });
  } else {
    queryParams.queryParameters = source.queryParameters;
    return makeCall({
      url: baseUrl,
      credentials: source.credentials,
      opts: {
        ...opts,
        method: 'POST',
        body: JSON.stringify(queryParams)
      }
    });
  }
}
