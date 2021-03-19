import { minify } from 'pgsql-minify';
import { getFormula, buildSqlQueryToGetFormula } from '../../src/models/FormulaModel';
import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_FORMULA: 'viewportFeaturesFormula'
  }
}));

describe('getFormula', () => {
  test('should throw with array data', async () => {
    await expect(getFormula({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get formula'
    );
  });

  test('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getFormula({ type: SourceTypes.BIGQUERY, viewportFilter: false })
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
          type: SourceTypes.SQL,
          viewportFilter: false
        };
        const func = await getFormula(params);
        expect(func).toEqual(response.rows);
      });
    });

    describe('should handle viewport features when using "viewportFilter": true', () => {
      const viewportFeatures = [...Array(3)].map((_, idx) => ({ revenue: idx }));

      const formulaParams = {
        operation: AggregationTypes.COUNT,
        column: 'revenue',
        type: SourceTypes.SQL,
        viewportFilter: true,
        viewportFeatures,
        dataSource: 'whatever-data-source',
        filters: {}
      };

      test('correctly returns data', async () => {
        executeTask.mockImplementation(() => Promise.resolve([{ value: 3 }]));
        const formula = await getFormula(formulaParams);
        expect(formula).toEqual([{ value: 3 }]);
      });

      test('correctly called', async () => {
        const { column, dataSource, filters, operation } = formulaParams;
        await getFormula(formulaParams);
        expect(executeTask).toHaveBeenCalledWith(
          dataSource,
          Methods.VIEWPORT_FEATURES_FORMULA,
          { column, filters, operation }
        );
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
