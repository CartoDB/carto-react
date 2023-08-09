import { getTileJson } from '../../src/api/tilejson';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

const mockedFetchLayerData = jest.fn();

jest.mock('@deck.gl/carto', () => ({
  ...jest.requireActual('@deck.gl/carto'),
  fetchLayerData: (props) => {
    mockedFetchLayerData(props);
    return Promise.resolve({
      data: {},
      format: 'tilejson'
    });
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

      expect(mockedFetchLayerData).toBeCalledWith({
        clientId: 'c4react', // hardcoded as no neeed to export CLIENT_ID from '@carto/react-api/api/common';
        connection: '__test_connection__',
        credentials: {
          accessToken: '__test_api_key__',
          apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
          apiVersion: 'v3'
        },
        format: 'tilejson',
        source: '__test_tileset__',
        type: 'tileset'
      });

      expect(tilejson).toBeDefined();
    });
  });
});
