import { API_VERSIONS } from '@deck.gl/carto';
import { ldsGeocode } from '../../src/api/lds';

const sampleCredentialsV3 = {
  apiVersion: API_VERSIONS.V3,
  accessToken: 'thisIsTheTestToken',
  apiBaseUrl: 'https://api.com/'
};

const someCoordinates = {
  latitude: 42.360278,
  longitude: -71.057778
};

describe('lds', () => {
  describe('ldsDecode', () => {
    test('should send proper requests', async () => {
      const fetchMock = (global.fetch = jest.fn().mockImplementation(async () => {
        return {
          ok: true,
          json: async () => [{ value: [someCoordinates] }]
        };
      }));

      const abortController = new AbortController();
      expect(
        await ldsGeocode({
          credentials: sampleCredentialsV3,
          address: 'boston',
          country: 'US',
          limit: 4,
          opts: {
            abortController: abortController
          }
        })
      ).toEqual([someCoordinates]);

      expect(fetchMock).toBeCalledWith(
        'https://api.com//v3/lds/geocoding/geocode?address=boston&country=US&limit=4',
        {
          headers: {
            Authorization: `Bearer ${sampleCredentialsV3.accessToken}`
          },
          signal: abortController.signal
        }
      );
    });
  });
});
