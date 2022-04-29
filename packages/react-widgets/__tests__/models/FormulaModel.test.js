import { getFormula } from '../../src/models/FormulaModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { executeSQL } from '@carto/react-api';

const RESULT = {
  value: 3.14,
  feature_count: 42
};

jest.mock('@carto/react-api', () => ({
  executeSQL: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve([RESULT])))
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(RESULT))),
  Methods: {
    FEATURES_FORMULA: 'featuresFormula'
  }
}));

describe('getFormula', () => {
  describe('local mode', () => {
    test('should work correctly', async () => {
      const props = {
        source: {
          id: '__test__',
          type: 'query',
          data: 'SELECT * FROM test',
          credentials: {
            apiVersion: 'v2'
          }
        },
        operation: AggregationTypes.SUM,
        column: 'column_1'
      };

      const data = await getFormula(props);

      expect(data).toStrictEqual(RESULT);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_FORMULA,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          operation: props.operation,
          joinOperation: props.joinOperation,
          column: props.column
        }
      );
    });
  });

  describe('global mode', () => {
    test('should work correctly', async () => {
      const props = {
        source: {
          id: '__test__',
          type: 'table',
          data: '__test__',
          credentials: {
            apiVersion: 'v3',
            accessToken: '__test_token__'
          },
          connection: '__test_connection__'
        },
        operation: AggregationTypes.SUM,
        column: 'column_1',
        global: true
      };

      const data = await getFormula(props);

      expect(data).toStrictEqual(RESULT);

      expect(executeSQL).toHaveBeenCalledWith({
        credentials: props.source.credentials,
        query: `SELECT sum(column_1) as value, count(1) as feature_count FROM __test__`,
        connection: props.source.connection,
        opts: {
          abortController: undefined
        }
      });
    });
  });
});
