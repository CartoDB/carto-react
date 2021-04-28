import { minify } from 'pgsql-minify';
import { getCategories } from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_CATEGORY: 'viewportFeaturesCategory'
  }
}));

describe('getCategories', () => {
  test('should throw with array data', async () => {
    await expect(getCategories({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get categories'
    );
  });

  test.skip('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getCategories({ type: SourceTypes.BIGQUERY, viewportFilter: false })
    ).rejects.toThrow(
      'Category Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('should correctly handle viewport features', () => {
    const categoriesParams = {
      column: 'storetype',
      operationColumn: 'revenue',
      operation: AggregationTypes.COUNT,
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      executeTask.mockImplementation(() =>
        Promise.resolve([
          { name: 'a', value: 2 },
          { name: 'b', value: 1 }
        ])
      );
      const categories = await getCategories(categoriesParams);
      expect(categories).toEqual([
        { name: 'a', value: 2 },
        { name: 'b', value: 1 }
      ]);
    });

    test('correctly called', async () => {
      const {
        column,
        operationColumn,
        operation,
        filters,
        dataSource
      } = categoriesParams;
      await getCategories(categoriesParams);
      expect(executeTask).toHaveBeenCalledWith(
        dataSource,
        Methods.VIEWPORT_FEATURES_CATEGORY,
        { column, filters, operation, operationColumn }
      );
    });
  });

  describe.skip('SQL Layer', () => {
    describe('should execute a SqlApi request when using "viewportFilter": false', () => {
      const response = {
        rows: [
          { name: 'Supermarket', value: 3 },
          { name: 'Hypermarket', value: 1 }
        ]
      };
      const sql = 'SELECT storetype, revenue FROM retail_stores LIMIT 4';
      const credentials = {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com'
      };

      mockSqlApiRequest({ response, sql, credentials });

      beforeEach(() => {
        mockClear();
      });

      test('should call SqlApi', async () => {
        const params = {
          data: sql,
          credentials,
          operation: AggregationTypes.COUNT,
          column: 'revenue',
          type: SourceTypes.SQL,
          viewportFilter: false
        };
        const categories = await getCategories(params);
        expect(categories).toEqual(response.rows);
      });
    });
  });
});
