import { getCategories } from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

const RESULT = [
  { name: 'a', value: 2 },
  { name: 'b', value: 1 }
];

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve({ rows: RESULT });
  }
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

      expect(data).toEqual(RESULT);

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

      expect(data).toEqual(RESULT);

      expect(mockedExecuteModel).toHaveBeenCalledWith({
        model: 'category',
        opts: { abortController: undefined },
        params: {
          column: props.column,
          operation: props.operation,
          operationColumn: props.operationColumn
        },
        source: props.source
      });
    });
  });
});
