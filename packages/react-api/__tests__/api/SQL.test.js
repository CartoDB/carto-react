import { REQUEST_GET_MAX_URL_LENGTH } from '@carto/react-core';
import { mockClear, mockSqlApiRequest } from '../mockSqlApiRequest';
import { executeSQL } from '../../src/api/SQL';
import { API_VERSIONS } from '@deck.gl/carto';

describe('should call SqlApi', () => {
  const response = { rows: { revenue: 1495728 } };
  const query = 'SELECT revenue FROM retail_stores LIMIT 1';
  const queryPost = 's'.repeat(REQUEST_GET_MAX_URL_LENGTH);
  const credentials = {
    apiVersion: API_VERSIONS.V2,
    username: 'public',
    apiKey: 'default_public',
    serverUrlTemplate: 'https://{user}.carto.com'
  };

  describe('ok', () => {
    beforeEach(() => {
      mockSqlApiRequest({ response, query, credentials });
    });

    afterAll(() => {
      mockClear();
    });

    test('should return data by GET request', async () => {
      await expect(executeSQL({ credentials, query })).resolves.toEqual(response.rows);
    });

    test('should return data by POST request', async () => {
      await expect(executeSQL({ credentials, query: queryPost })).resolves.toEqual(
        response.rows
      );
    });
  });

  describe('not ok', () => {
    beforeEach(() => {
      mockClear();
    });

    test('should throw due to non-provided credentials', async () => {
      mockSqlApiRequest({ response, query, credentials });
      await expect(executeSQL({})).rejects.toThrow('No credentials provided');
    });

    test('should throw due status response 401', async () => {
      mockSqlApiRequest({
        response,
        status: 401,
        responseIsOk: false,
        query,
        credentials
      });
      await expect(executeSQL({ credentials, query })).rejects.toThrow(
        'Unauthorized access. Invalid credentials'
      );
    });

    test('should throw due status response 403', async () => {
      mockSqlApiRequest({
        response,
        status: 403,
        responseIsOk: false,
        query,
        credentials
      });
      await expect(executeSQL({ credentials, query })).rejects.toThrow(
        'Forbidden access to the requested data'
      );
    });

    test('should throw due to unknown error', async () => {
      const errorResponse = { ...response, hint: '' };
      mockSqlApiRequest({
        response: errorResponse,
        status: 1123,
        responseIsOk: false,
        query,
        credentials
      });
      await expect(executeSQL({ credentials, query })).rejects.toThrow(
        `${errorResponse.hint}`
      );
    });
  });
});
