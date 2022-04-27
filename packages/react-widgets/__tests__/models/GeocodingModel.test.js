import { geocodeStreetPoint } from '../../src/models/GeocodingModel';
import { API_VERSIONS } from '@deck.gl/carto';
import { ldsGeocode, executeSQL } from '@carto/react-api/';

const sampleCredentialsV2 = {
  apiVersion: API_VERSIONS.V2
};
const sampleCredentialsV3 = {
  apiVersion: API_VERSIONS.V3,
  accessToken: 'token',
  apiBaseUrl: 'https://api.com/'
};

const bostonCoordinates = {
  latitude: 42.360278,
  longitude: -71.057778
};

jest.mock('@carto/react-api', () => ({
  executeSQL: jest.fn().mockImplementation(async () => global.executeSqlMockResult),
  ldsGeocode: jest.fn().mockImplementation(async () => global.ldsGeocodeMockResult)
}));

describe('geocodeStreetPoint', () => {
  afterEach(() => {
    delete global.executeSqlMockResult;
    delete global.ldsGeocodeMockResult;
  });
  test('executes correct SQL for V2 credentials', async () => {
    global.executeSqlMockResult = [
      {
        geometry: JSON.stringify({
          coordinates: [bostonCoordinates.longitude, bostonCoordinates.latitude]
        })
      }
    ];

    const result = await geocodeStreetPoint(sampleCredentialsV2, {
      searchText: 'boston',
      country: 'US'
    });

    expect(result).toEqual(bostonCoordinates);

    expect(executeSQL).toHaveBeenCalledWith({
      credentials: sampleCredentialsV2,
      query:
        "SELECT ST_AsGeoJSON(cdb_geocode_street_point('boston', '', '', 'US')) AS geometry",
      opts: {}
    });
  });

  test('uses ldsDecode for V3 credentials', async () => {
    global.ldsGeocodeMockResult = [bostonCoordinates];
    const result = await geocodeStreetPoint(sampleCredentialsV3, {
      searchText: 'boston'
    });

    expect(result).toEqual(bostonCoordinates);

    expect(ldsGeocode).toHaveBeenCalledWith({
      credentials: sampleCredentialsV3,
      address: 'boston',
      limit: 1,
      opts: {}
    });
  });
});
