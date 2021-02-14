import { executeSQL } from 'src/api';
import { API } from 'src/api/SQL';
import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';
import { REQUEST_GET_MAX_URL_LENGTH } from '../../utils/requestsUtils';

describe('should call SqlApi', () => {
  const response = { rows: { revenue: 1495728 } };
  const sql = 'SELECT revenue FROM retail_stores LIMIT 1';
  const sqlByPost = 's'.repeat(REQUEST_GET_MAX_URL_LENGTH);
  const credentials = {
    username: 'public',
    apiKey: 'default_public',
    serverUrlTemplate: 'https://{user}.carto.com'
  };

  describe('ok', () => {
    beforeEach(() => {
      mockSqlApiRequest({ response, sql, credentials });
    });

    afterAll(() => {
      mockClear();
    });

    test('should return data by GET request', async () => {
      await expect(executeSQL(credentials, sql)).resolves.toEqual(response.rows);
    });

    test('should return data by POST request', async () => {
      await expect(executeSQL(credentials, sqlByPost)).resolves.toEqual(response.rows);
    });

    test('should return data in geojson format', async () => {
      await expect(executeSQL(credentials, sql, { format: 'geojson' })).resolves.toEqual(
        response
      );
    });
  });

  describe('not ok', () => {
    beforeEach(() => {
      mockClear();
    });

    test('should throw due to non-provided credentials', async () => {
      mockSqlApiRequest({ response, sql, credentials });
      await expect(executeSQL()).rejects.toThrow(
        `Failed to connect to ${API} API: TypeError: Cannot read property 'apiKey' of undefined`
      );
    });

    test('should throw due status response 401', async () => {
      mockSqlApiRequest({ response, status: 401, responseIsOk: false, sql, credentials });
      await expect(executeSQL(credentials, sql)).rejects.toThrow(
        `Unauthorized access to ${API} API: invalid combination of user ('${credentials.username}') and apiKey ('${credentials.apiKey}')`
      );
    });

    test('should throw due status response 403', async () => {
      mockSqlApiRequest({ response, status: 403, responseIsOk: false, sql, credentials });
      await expect(executeSQL(credentials, sql)).rejects.toThrow(
        `Unauthorized access to ${API} API: the provided apiKey('${credentials.apiKey}') doesn't provide access to the requested data`
      );
    });

    test('should throw due to unknown error', async () => {
      const errorResponse = { ...response, error: {} };
      mockSqlApiRequest({
        response: errorResponse,
        status: 'unknown',
        responseIsOk: false,
        sql,
        credentials
      });
      await expect(executeSQL(credentials, sql)).rejects.toThrow(
        `${JSON.stringify(errorResponse.error)}`
      );
    });
  });
});
