import { getTileJson } from '../../src/api/tilejson';
import { MAP_TYPES, API_VERSIONS } from '../../src/types';

const mockedVectorTilesetSource = jest.fn();

jest.mock('@deck.gl/carto', () => ({
  ...jest.requireActual('@deck.gl/carto'),
  vectorTilesetSource: (props) => {
    mockedVectorTilesetSource(props);
    return Promise.resolve({});
  }
}));

const TEST_CONNECTION = '__test_connection__';
const TEST_TILESET = '__test_tileset__';
const TEST_API_KEY = '__test_api_key__';

describe('tilejson', () => {
  describe('getTileJson', () => {
    test('should return a tilejson', async () => {
      const source = {
        type: MAP_TYPES.TILESET,
        data: TEST_TILESET,
        connection: TEST_CONNECTION,
        credentials: {
          accessToken: TEST_API_KEY,
          apiVersion: API_VERSIONS.V3,
          apiBaseUrl: 'https://gcp-us-east1.api.carto.com'
        }
      };

      const tilejson = await getTileJson({ source });

      expect(mockedVectorTilesetSource).toBeCalledWith({
        connectionName: '__test_connection__',
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
        accessToken: '__test_api_key__',
        clientId: 'carto-for-react', // hardcoded as no neeed to export CLIENT_ID from '@carto/react-api/api/common';
        tableName: '__test_tileset__'
      });

      expect(tilejson).toBeDefined();
    });
  });
});
