import { minify } from 'pgsql-minify';

import {
  getFormula,
  buildSqlQueryToGetFormula,
  filterViewportFeaturesToGetFormula
} from 'src/widgets/models/FormulaModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';

import { LINES } from '../data-mocks/models/linesForFormula';

import { mockRequest, mockClear } from '../mockRequest';

describe('getFormula', () => {
  test('should throw an error due to invalid data type', async () => {
    await expect(getFormula({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get formula'
    );
  });

  test('should throw an error if trying to implement client-side-logic with CartoBQTilerLayer', async () => {
    await expect(
      getFormula({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('should decide whether execute a SQL query to get global data or a viewport features filtering', () => {
    describe('should execute a SQL query - "viewportFilter" prop is false', () => {
      const fetchResponse = { rows: { revenue: 1495728 } };
      const requestQuery = 'SELECT revenue FROM retail_stores LIMIT 1';
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
        const func = await getFormula(args);
        expect(func).toEqual(fetchResponse.rows);
      });
    });

    describe('should filter viewport features - "viewportFilter" prop is true', () => {
      const viewportFeatures = LINES('revenue');

      const createArguments = (operation) => ({
        operation,
        column: 'revenue',
        type: LayerTypes.SQL,
        viewportFilter: true,
        viewportFeatures
      });

      test(AggregationTypes.COUNT, async () => {
        const args = createArguments(AggregationTypes.COUNT);
        const func = await getFormula(args);
        expect(func).toEqual([{ value: 3 }]);
      });

      test(AggregationTypes.AVG, async () => {
        const args = createArguments(AggregationTypes.AVG);
        const func = await getFormula(args);
        expect(func).toEqual([{ value: 2 }]);
      });

      test(AggregationTypes.SUM, async () => {
        const args = createArguments(AggregationTypes.SUM);
        const func = await getFormula(args);
        expect(func).toEqual([{ value: 6 }]);
      });

      test(AggregationTypes.MIN, async () => {
        const args = createArguments(AggregationTypes.MIN);
        const func = await getFormula(args);
        expect(func).toEqual([{ value: 1 }]);
      });

      test(AggregationTypes.MAX, async () => {
        const args = createArguments(AggregationTypes.MAX);
        const func = await getFormula(args);
        expect(func).toEqual([{ value: 3 }]);
      });
    });
  });

  describe('buildSqlQueryToGetFormula - simple global operations', () => {
    test('should return a minified SQL query', () => {
      const args = {
        data: 'SELECT * FROM stores',
        column: 'revenue',
        operation: AggregationTypes.COUNT
      };
      const buildQuery = (type) =>
        `SELECT ${type}(revenue) as value FROM (SELECT * FROM stores) as q`;
      expect(buildSqlQueryToGetFormula(args)).toEqual(minify(buildQuery(args.operation)));
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
