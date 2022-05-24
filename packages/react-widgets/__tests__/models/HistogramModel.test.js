import { getHistogram } from '../../src/models/HistogramModel';
import { AggregationTypes, _FilterTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

const TICKS = [1, 2, 3];
const RESULT = [3, 1, 2, 0];

const MOCK_SQL_RESPONSE = Array(TICKS.length)
  .fill(null)
  // Only results [0,2] are used, because we're mocking the case
  // when SQL doesn't have values for the last tick
  .map((_, idx) => ({ tick: idx, value: RESULT[idx] }));

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve({ rows: MOCK_SQL_RESPONSE });
  }
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(RESULT))),
  Methods: {
    FEATURES_HISTOGRAM: 'featuresHistogram'
  }
}));

describe('getHistogram', () => {
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
        ticks: TICKS,
        operation: AggregationTypes.COUNT,
        column: 'column_1'
      };

      const data = await getHistogram(props);

      expect(data).toBe(RESULT);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_HISTOGRAM,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          operation: props.operation,
          column: props.column,
          ticks: props.ticks
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
          filters: {
            column_1: {
              [_FilterTypes.BETWEEN]: {
                values: [[0, 1]]
              }
            }
          },
          credentials: {
            apiVersion: 'v3',
            accessToken: '__test_token__'
          },
          connection: '__test_connection__'
        },
        ticks: TICKS,
        operation: AggregationTypes.COUNT,
        column: 'column_1',
        global: true
      };

      const data = await getHistogram(props);

      expect(data).toEqual(RESULT);

      expect(mockedExecuteModel).toHaveBeenCalledWith({
        model: 'histogram',
        opts: { abortController: undefined },
        params: {
          column: props.column,
          operation: props.operation,
          ticks: props.ticks
        },
        source: props.source
      });
    });
  });
});
