import { minify } from 'pgsql-minify';

import {
  getCategories,
  buildSqlQueryToGetCategories,
  filterViewportFeaturesToGetCategories
} from 'src/widgets/models/CategoryModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';

import { mockSqlApiRequest, mockClear } from '../../utils/mockSqlApiRequest';

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

describe('getCategories', () => {
  test('should throw with array data', async () => {
    await expect(getCategories({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get categories'
    );
  });

  test('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getCategories({ type: LayerTypes.BQ, viewportFilter: false })
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
          type: LayerTypes.SQL,
          viewportFilter: false
        };
        const categories = await getCategories(params);
        expect(categories).toEqual(response.rows);
      });
    });

    describe('should read viewport features when using "viewportFilter": true', () => {
      const viewportFeatures = features('storetype', 'revenue');

      const buildGetCategoriesParamsFor = (operation) => ({
        operation,
        column: 'storetype',
        operationColumn: 'revenue',
        type: LayerTypes.SQL,
        viewportFilter: true,
        viewportFeatures
      });

      test(AggregationTypes.COUNT, async () => {
        const params = buildGetCategoriesParamsFor(AggregationTypes.COUNT);
        const categories = await getCategories(params);
        expect(categories).toEqual([
          { name: 'a', value: 2 },
          { name: 'b', value: 1 }
        ]);
      });

      test(AggregationTypes.AVG, async () => {
        const params = buildGetCategoriesParamsFor(AggregationTypes.AVG);
        const categories = await getCategories(params);
        expect(categories).toEqual([
          { name: 'a', value: 1.5 },
          { name: 'b', value: 3 }
        ]);
      });

      test(AggregationTypes.MIN, async () => {
        const params = buildGetCategoriesParamsFor(AggregationTypes.MIN);
        const categories = await getCategories(params);
        expect(categories).toEqual([
          { name: 'a', value: 1 },
          { name: 'b', value: 3 }
        ]);
      });

      test(AggregationTypes.MAX, async () => {
        const params = buildGetCategoriesParamsFor(AggregationTypes.MAX);
        const categories = await getCategories(params);
        expect(categories).toEqual([
          { name: 'a', value: 2 },
          { name: 'b', value: 3 }
        ]);
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
      operation: AggregationTypes.COUNT,
      
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

describe('filterViewportFeaturesToGetCategories', () => {
  const buildParamsFor = (operation) => ({
    operation,
    column: 'storetype',
    operationColumn: 'revenue',
    viewportFeatures: features('storetype', 'revenue')
  });

  test(AggregationTypes.COUNT, () => {
    const params = buildParamsFor(AggregationTypes.COUNT);
    expect(filterViewportFeaturesToGetCategories(params)).toEqual([
      { name: 'a', value: 2 },
      { name: 'b', value: 1 }
    ]);
  });

  test(AggregationTypes.AVG, () => {
    const params = buildParamsFor(AggregationTypes.AVG);
    expect(filterViewportFeaturesToGetCategories(params)).toEqual([
      { name: 'a', value: 1.5 },
      { name: 'b', value: 3 }
    ]);
  });

  test(AggregationTypes.SUM, () => {
    const params = buildParamsFor(AggregationTypes.SUM);
    expect(filterViewportFeaturesToGetCategories(params)).toEqual([
      { name: 'a', value: 3 },
      { name: 'b', value: 3 }
    ]);
  });

  test(AggregationTypes.MIN, () => {
    const params = buildParamsFor(AggregationTypes.MIN);
    expect(filterViewportFeaturesToGetCategories(params)).toEqual([
      { name: 'a', value: 1 },
      { name: 'b', value: 3 }
    ]);
  });

  test(AggregationTypes.MAX, () => {
    const params = buildParamsFor(AggregationTypes.MAX);
    expect(filterViewportFeaturesToGetCategories(params)).toEqual([
      { name: 'a', value: 2 },
      { name: 'b', value: 3 }
    ]);
  });

  test('no features', () => {
    const testCases = [null, undefined];
    for (const tc of testCases) {
      expect(filterViewportFeaturesToGetCategories({ viewportFeatures: tc })).toEqual([]);
    }
  });
});
