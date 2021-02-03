import { minify } from 'pgsql-minify';

import {
  getFormula,
  buildSqlQueryToGetFormula,
  filterViewportFeaturesToGetFormula
} from 'src/widgets/models/FormulaModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';

import { buildLineFeatures } from '../data-mocks/models/linesForFormula';

import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

describe('getFormula', () => {
  test('should throw with array data', async () => {
    await expect(getFormula({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get formula'
    );
  });

  test('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getFormula({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  });

  describe('SQL Layer', () => {
    describe('should execute an SqlApi request when using "viewportFilter": false', () => {
      const response = { rows: { revenue: 1495728 } };
      const sql = 'SELECT revenue FROM retail_stores LIMIT 1';
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
        const func = await getFormula(params);
        expect(func).toEqual(response.rows);
      });
    });

    describe('should read viewport features when using "viewportFilter": true', () => {
      const viewportFeatures = buildLineFeatures('revenue');

      const buildParamsFor = (operation) => ({
        operation,
        column: 'revenue',
        type: LayerTypes.SQL,
        viewportFilter: true,
        viewportFeatures
      });

      test(AggregationTypes.COUNT, async () => {
        const params = buildParamsFor(AggregationTypes.COUNT);
        const formula = await getFormula(params);
        expect(formula).toEqual([{ value: 3 }]);
      });

      test(AggregationTypes.AVG, async () => {
        const params = buildParamsFor(AggregationTypes.AVG);
        const formula = await getFormula(params);
        expect(formula).toEqual([{ value: 2 }]);
      });

      test(AggregationTypes.SUM, async () => {
        const params = buildParamsFor(AggregationTypes.SUM);
        const formula = await getFormula(params);
        expect(formula).toEqual([{ value: 6 }]);
      });

      test(AggregationTypes.MIN, async () => {
        const params = buildParamsFor(AggregationTypes.MIN);
        const formula = await getFormula(params);
        expect(formula).toEqual([{ value: 1 }]);
      });

      test(AggregationTypes.MAX, async () => {
        const params = buildParamsFor(AggregationTypes.MAX);
        const formula = await getFormula(params);
        expect(formula).toEqual([{ value: 3 }]);
      });
    });
  });
});

describe('buildSqlQueryToGetFormula', () => {
  test('should work as expected', () => {
    const params = {
      data: 'SELECT * FROM stores',
      column: 'revenue',
      operation: AggregationTypes.COUNT
    };
    const buildQuery = (type) =>
      `SELECT ${type}(revenue) as value FROM (SELECT * FROM stores) as q`;
    expect(buildSqlQueryToGetFormula(params)).toEqual(
      minify(buildQuery(params.operation))
    );
  });
});

describe('filterViewportFeaturesToGetFormula', () => {
  const buildParamsFor = (operation) => ({
    operation,
    column: 'revenue',
    viewportFeatures: buildLineFeatures('revenue')
  });

  test(AggregationTypes.COUNT, () => {
    const params = buildParamsFor(AggregationTypes.COUNT);
    expect(filterViewportFeaturesToGetFormula(params)).toEqual([{ value: 3 }]);
  });

  test(AggregationTypes.AVG, () => {
    const params = buildParamsFor(AggregationTypes.AVG);
    expect(filterViewportFeaturesToGetFormula(params)).toEqual([{ value: 2 }]);
  });

  test(AggregationTypes.SUM, () => {
    const params = buildParamsFor(AggregationTypes.SUM);
    expect(filterViewportFeaturesToGetFormula(params)).toEqual([{ value: 6 }]);
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
