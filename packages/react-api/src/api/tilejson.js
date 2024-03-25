import { checkCredentials, CLIENT_ID } from './common';
import { vectorTilesetSource } from '@deck.gl/carto';
import { _assert as assert } from '@carto/react-core';
import { MAP_TYPES, API_VERSIONS } from '../types';

/**
 * Get the TileJson for static tilesets
 *
 * @param { object } props
 * @param { object } props.source - A static tileset C4R source
 */
export async function getTileJson(props) {
  const { source } = props;

  assert(source, 'getTileJson: missing source');
  assert(source.connection, 'getTileJson: missing connection');
  assert(source.data, 'getTileJson: missing data');
  assert(
    source.type === MAP_TYPES.TILESET,
    'getTileJson: source must be a static tileset'
  );
  checkCredentials(source.credentials);
  assert(
    source.credentials.apiVersion === API_VERSIONS.V3,
    'TileJson is a feature only available in CARTO 3.'
  );

  const data = await vectorTilesetSource({
    connectionName: source.connection,
    apiBaseUrl: source.credentials.apiBaseUrl,
    accessToken: source.credentials.accessToken,
    clientId: CLIENT_ID,
    tableName: source.data
  });

  return data;
}
