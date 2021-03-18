import { minify } from 'pgsql-minify';
import {
  getCategories,
  buildSqlQueryToGetCategories
} from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

const features = (categoryColumn, operationColumn) => [
  {
    [categoryColumn]: 'a',
    [operationColumn]: 1
  },
  {
    [categoryColumn]: 'a',
    [operationColumn]: 2
  },
  {
    [categoryColumn]: 'b',
    [operationColumn]: 3
  }
];

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

  test('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getCategories({ type: SourceTypes.BIGQUERY, viewportFilter: false })
    ).rejects.toThrow(
      'Category Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('SQL Layer', () => {
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

    describe('should handle viewport features when using "viewportFilter": true', () => {
      const viewportFeatures = features('storetype', 'revenue');

      const categoriesParams = {
        operation: AggregationTypes.COUNT,
        column: 'storetype',
        operationColumn: 'revenue',
        type: SourceTypes.SQL,
        viewportFilter: true,
        viewportFeatures,
        dataSource: 'whatever-data-source',
        filters: {}
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
          dataSource,
          column,
          filters,
          operation,
          operationColumn
        } = categoriesParams;
        await getCategories(categoriesParams);
        expect(executeTask).toHaveBeenCalledWith(
          dataSource,
          Methods.VIEWPORT_FEATURES_CATEGORY,
          { column, filters, operation, operationColumn }
        );
      });
    });
  });
});

describe('buildSqlQueryToGetFormula', () => {
  test('should work as expected', () => {
    const params = {
      data: 'SELECT cartodb_id, storetype, revenue FROM retail_stores',
      column: 'storetype',
      operationColumn: 'revenue',
      operation: AggregationTypes.COUNT
    };
    const buildQuery = (params) => `
        WITH all_categories as (
          SELECT
            ${params.column} as name
          FROM
            (${params.data}) as q
          GROUP BY name
        ),
        categories as (
          SELECT
            ${params.column} as name, ${params.operation}(${params.operationColumn}) as value
          FROM
            (${params.data}) as q
          GROUP BY name
        )
        SELECT
          a.name, b.value
        FROM
          all_categories a
        LEFT JOIN categories b ON a.name=b.name
      `;
    const query = buildQuery(params);
    expect(buildSqlQueryToGetCategories(params)).toEqual(minify(query));
  });
});
