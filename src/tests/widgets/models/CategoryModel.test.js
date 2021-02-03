import { minify } from 'pgsql-minify';

import {
  getCategories,
  buildSqlQueryToGetCategories,
  filterViewportFeaturesToGetCategories
} from 'src/widgets/models/CategoryModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';

import { POINTS } from '../data-mocks/models/pointsForCategories';

import { mockRequest, mockClear } from '../mockRequest';

describe('getCategories', () => {
  test('should throw an error due to invalid data type', async () => {
    await expect(getCategories({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get categories'
    );
  });

  test('should throw an error if trying to implement client-side-logic with CartoBQTilerLayer', async () => {
    await expect(
      getCategories({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Category Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('should decide whether execute a SQL query to get global data or a viewport features filtering', () => {
    describe('should execute a SQL query - "viewportFilter" prop is false', () => {
      const fetchResponse = {
        rows: [
          { category: 'Supermarket', value: 3 },
          { category: 'Hypermarket', value: 1 }
        ]
      };
      const requestQuery = 'SELECT storetype, revenue FROM retail_stores LIMIT 4';
      const credentials = {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com'
      };

      mockRequest({ fetchResponse, requestQuery, credentials });

      beforeEach(() => {
        mockClear();
      });

      test('should execute a SQL query', async () => {
        const args = {
          data: requestQuery,
          credentials,
          operation: AggregationTypes.COUNT,
          column: 'revenue',
          type: LayerTypes.SQL,
          viewportFilter: false
        };
        const func = await getCategories(args);
        expect(func).toEqual(fetchResponse.rows);
      });
    });

    describe('should filter viewport features - "viewportFilter" prop is true', () => {
      const viewportFeatures = POINTS('storetype', 'revenue');

      const createArguments = (operation) => ({
        operation,
        column: 'storetype',
        operationColumn: 'revenue',
        type: LayerTypes.SQL,
        viewportFilter: true,
        viewportFeatures
      });

      test(AggregationTypes.COUNT, async () => {
        const args = createArguments(AggregationTypes.COUNT);
        const func = await getCategories(args);
        expect(func).toEqual([
          { category: 'a', value: 2 },
          { category: 'b', value: 1 }
        ]);
      });

      test(AggregationTypes.AVG, async () => {
        const args = createArguments(AggregationTypes.AVG);
        const func = await getCategories(args);
        expect(func).toEqual([
          { category: 'a', value: 1.5 },
          { category: 'b', value: 3 }
        ]);
      });

      test(AggregationTypes.MIN, async () => {
        const args = createArguments(AggregationTypes.MIN);
        const func = await getCategories(args);
        expect(func).toEqual([
          { category: 'a', value: 1 },
          { category: 'b', value: 3 }
        ]);
      });

      test(AggregationTypes.MAX, async () => {
        const args = createArguments(AggregationTypes.MAX);
        const func = await getCategories(args);
        expect(func).toEqual([
          { category: 'a', value: 2 },
          { category: 'b', value: 3 }
        ]);
      });
    });
  });

  describe('buildSqlQueryToGetFormula - simple global operations', () => {
    test('should return a minified SQL query', () => {
      const args = {
        data: 'SELECT cartodb_id, storetype, revenue FROM retail_stores',
        column: 'storetype',
        operationColumn: 'revenue',
        operation: AggregationTypes.COUNT
      };
      const buildQuery = (args) => `
        WITH all_categories as (
          SELECT
            ${args.column} as category
          FROM
            (${args.data}) as q
          GROUP BY category
        ),
        categories as (
          SELECT
            ${args.column} as category, ${args.operation}(${args.operationColumn}) as value
          FROM
            (${args.data}) as q
          GROUP BY category
        )
        SELECT
          a.category, b.value
        FROM
          all_categories a
        LEFT JOIN categories b ON a.category=b.category
      `;
      const query = buildQuery(args);
      expect(buildSqlQueryToGetCategories(args)).toEqual(minify(query));
    });
  });

  describe('filterViewportFeaturesToGetCategories - simple viewport features filtering', () => {
    const createArguments = (operation) => ({
      operation,
      column: 'storetype',
      operationColumn: 'revenue',
      viewportFeatures: POINTS('storetype', 'revenue')
    });

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      expect(filterViewportFeaturesToGetCategories(args)).toEqual([
        { category: 'a', value: 2 },
        { category: 'b', value: 1 }
      ]);
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      expect(filterViewportFeaturesToGetCategories(args)).toEqual([
        { category: 'a', value: 1.5 },
        { category: 'b', value: 3 }
      ]);
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      expect(filterViewportFeaturesToGetCategories(args)).toEqual([
        { category: 'a', value: 3 },
        { category: 'b', value: 3 }
      ]);
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      expect(filterViewportFeaturesToGetCategories(args)).toEqual([
        { category: 'a', value: 1 },
        { category: 'b', value: 3 }
      ]);
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
      expect(filterViewportFeaturesToGetCategories(args)).toEqual([
        { category: 'a', value: 2 },
        { category: 'b', value: 3 }
      ]);
    });

    test('no features', () => {
      const testCases = [null, undefined];
      for (const tc of testCases) {
        expect(filterViewportFeaturesToGetCategories({ viewportFeatures: tc })).toEqual(
          []
        );
      }
    });
  });
});
