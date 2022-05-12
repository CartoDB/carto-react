import { assert, checkCredentials } from './common';
import { MAP_TYPES, API_VERSIONS, fetchLayerData, FORMATS } from '@deck.gl/carto';

/**
 * Get the TileJson for static tilesets
 *
 * @param { object } props
 * @param { object } props.source - A static tileset C4R source
 */
export async function getTileJson(props) {
  const { source } = props;

  assert(source, 'getTileJson: missing source');
  assert(
    source.type === MAP_TYPES.TILESET,
    'getTileJson: source must be a static tileset'
  );
  checkCredentials(source.credentials);
  assert(
    source.credentials.apiVersion === API_VERSIONS.V3,
    'TileJson is a feature only available in CARTO 3.'
  );

  const { data, format } = await fetchLayerData({
    type: source.type,
    source: source.data,
    connection: source.connection,
    credentials: source.credentials,
    format: FORMATS.TILEJSON,
    clientId: 'carto-for-react'
  });

  assert(format === FORMATS.TILEJSON, 'getTileJson: data is not a tilejson');

  return data;
}
