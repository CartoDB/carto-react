import { minify } from 'pgsql-minify';

import {
  getCategories,
  buildSqlQueryToGetCategories,
  filterViewportFeaturesToGetCategories
} from 'src/widgets/models/CategoryModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';
import { POINTS } from '../data-mocks/pointsForCategories';

describe('getCategories', () => {
  test('should thrown an error due to invalid data type', async () => {
    await expect(getCategories({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get categories'
    );
  });

  test('should thrown an error if trying to implement client-side-logic with CartoBQTilerLayer', async () => {
    await expect(
      getCategories({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Category Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('buildSqlQueryToGetCategories - simple global operations', () => {
    const createArguments = (operation) => ({
      data: 'SELECT cartodb_id, storetype, revenue FROM retail_stores',
      column: 'storetype',
      operationColumn: 'revenue',
      operation
    });

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

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetCategories(args)).toEqual(minify(query));
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetCategories(args)).toEqual(minify(query));
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetCategories(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetCategories(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
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
