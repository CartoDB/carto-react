import { getCategories } from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { executeSQL } from '@carto/react-api/';

const RESULT = [
  { name: 'a', value: 2 },
  { name: 'b', value: 1 }
];

jest.mock('@carto/react-api', () => ({
  executeSQL: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(RESULT)))
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(RESULT))),
  Methods: {
    FEATURES_CATEGORY: 'featuresCategory'
  }
}));

describe('getCategories', () => {
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

      const data = await getCategories(props);

      expect(data).toBe(RESULT);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_CATEGORY,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          operation: props.operation,
          joinOperation: props.joinOperation,
          column: props.column,
          operationColumn: props.column
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
        operationColumn: 'column_2',
        global: true
      };

      const data = await getCategories(props);

      expect(data).toBe(RESULT);

      expect(executeSQL).toHaveBeenCalledWith({
        credentials: props.source.credentials,
        query: `SELECT column_1 as name, sum(column_2) as value FROM __test__ GROUP BY column_1`,
        connection: props.source.connection,
        opts: {
          abortController: undefined
        }
      });
    });
  });
});
