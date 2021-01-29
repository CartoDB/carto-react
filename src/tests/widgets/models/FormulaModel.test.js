import { minify } from 'pgsql-minify';

import {
  getFormula,
  buildSqlQueryToGetFormula,
  filterViewportFeaturesToGetFormula
} from 'src/widgets/models/FormulaModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';
import { LINES } from '../data-mocks/linesForFormula';

describe('getFormula', () => {
  test('should thrown an error due to invalid data type', () => {
    try {
      getFormula({ data: [] });
    } catch (err) {
      expect(err).toBe('Array is not a valid type to get formula');
    }
  });

  test('should thrown an error if trying to implement client-side-logic with CartoBQTilerLayer', () => {
    try {
      getFormula({ type: LayerTypes.BQ, viewportFilter: true });
    } catch (err) {
      expect(err).toBe(
        'Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.'
      );
    }
  });

  describe('buildSqlQueryToGetFormula - simple global operations', () => {
    const createArguments = (operation) => ({
      data: 'SELECT * FROM stores',
      column: 'revenue',
      operation
    });

    const buildQuery = (type) =>
      `SELECT ${type}(revenue) as value FROM (SELECT * FROM stores) as q`;

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      const query = buildQuery(args.operation);
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(query));
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      const query = buildQuery(args.operation);
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(query));
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      const query = buildQuery(args.operation);
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      const query = buildQuery(args.operation);
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
      const query = buildQuery(args.operation);
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(query));
    });
  });

  describe('filterViewportFeaturesToGetFormula - simple viewport features filtering', () => {
    const createArguments = (operation) => ({
      operation,
      column: 'revenue',
      viewportFeatures: LINES('revenue')
    });

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      expect(filterViewportFeaturesToGetFormula(args)).toEqual([{ value: 3 }]);
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      expect(filterViewportFeaturesToGetFormula(args)).toEqual([{ value: 2 }]);
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      expect(filterViewportFeaturesToGetFormula(args)).toEqual([{ value: 6 }]);
    });

    test('no features', () => {
      const testCases = [null, undefined];
      for (const tc of testCases) {
        expect(filterViewportFeaturesToGetFormula({ viewportFeatures: tc })).toEqual([
          { value: null }
        ]);
      }
    });
  });
});
