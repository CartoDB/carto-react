import { getTimeSeries } from '../../src/models/TimeSeriesModel';
import { AggregationTypes, GroupDateTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

const MOCK_API_RESULT = [
  { name: Date.UTC(1970, 0, 1, 0, 0), value: 2 },
  { name: Date.UTC(1970, 1, 1, 0, 0), value: 3 }
];

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve({ rows: MOCK_API_RESULT });
  }
}));

const MOCK_WORKER_RESULT = [
  Date.UTC(1970, 0, 1, 0, 0),
  Date.UTC(1970, 0, 1, 0, 30),
  Date.UTC(1970, 1, 1, 0, 0),
  Date.UTC(1970, 1, 1, 0, 30),
  Date.UTC(1971, 0, 1, 1, 0)
].map((name) => ({ name, value: 1 }));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(MOCK_WORKER_RESULT))),
  Methods: {
    FEATURES_TIME_SERIES: 'featuresTimeSeries'
  }
}));

const mockedExecuteSQL = jest.fn();

describe('getTimeSeries', () => {
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
        column: 'date_column',
        operationColumn: 'opt_column',
        stepSize: GroupDateTypes.DAYS
      };

      const data = await getTimeSeries(props);

      expect(data).toBe(MOCK_WORKER_RESULT);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_TIME_SERIES,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          operation: props.operation,
          joinOperation: props.joinOperation,
          column: props.column,
          operationColumn: props.operationColumn,
          stepSize: props.stepSize
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
        operation: AggregationTypes.COUNT,
        column: 'date_column',
        operationColumn: 'opt_column',
        global: true,
        stepSize: GroupDateTypes.SECONDS,
        stepMultiplier: 2,
        splitByCategory: 'abc',
        splitByCategoryLimit: 5,
        splitByCategoryValues: ['a', 'b', 'c']
      };

      const data = await getTimeSeries(props);

      expect(data).toEqual(MOCK_API_RESULT);

      expect(mockedExecuteModel).toHaveBeenCalledWith({
        model: 'timeseries',
        source: props.source,
        params: {
          column: props.column,
          operation: props.operation,
          operationColumn: props.operationColumn || props.column,
          stepSize: props.stepSize,
          joinOperation: props.joinOperation,
          stepMultiplier: props.stepMultiplier,
          splitByCategory: props.splitByCategory,
          splitByCategoryLimit: props.splitByCategoryLimit,
          splitByCategoryValues: props.splitByCategoryValues
        },
        opts: {
          abortController: undefined
        }
      });
    });
  });
});
