import { getHistogram } from '../../src/models/HistogramModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { executeSQL } from '@carto/react-api/';

const TICKS = [1, 2, 3];

const RESULT = [3, 1, 2, 0];

const MOCK_WORKER_RESPONSE = {
  data: RESULT,
  min: 0,
  max: 4,
  ticks: TICKS
};

const MOCK_SQL_RESPONSE = Array(TICKS.length)
  .fill(null)
  // Only results [0,2] are used, because we're mocking the case
  // when SQL doesn't have values for the last tick
  .map((_, idx) => ({
    tick: idx,
    value: RESULT[idx],
    _min: 0,
    _max: 4
  }));

jest.mock('@carto/react-api', () => ({
  executeSQL: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(MOCK_SQL_RESPONSE)))
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(MOCK_WORKER_RESPONSE))),
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
        bins: 18,
        ticks: TICKS,
        operation: AggregationTypes.COUNT,
        column: 'column_1'
      };

      const data = await getHistogram(props);

      expect(data).toBe(MOCK_WORKER_RESPONSE);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_HISTOGRAM,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          operation: props.operation,
          column: props.column,
          ticks: props.ticks,
          bins: props.bins
        }
      );
    });
  });

  describe('global mode', () => {
    test('should work correctly using ticks', async () => {
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
        ticks: TICKS,
        operation: AggregationTypes.COUNT,
        column: 'column_1',
        global: true
      };

      const data = await getHistogram(props);

      expect(data).toEqual({ data: RESULT, max: 4, min: 0, ticks: TICKS });

      expect(executeSQL).toHaveBeenCalledWith({
        credentials: props.source.credentials,
        query: `SELECT tick, count(column_1) as value, MIN(q._min) _min, MAX(q._max) _max FROM (SELECT CASE WHEN column_1 < 1 THEN 0 WHEN column_1 < 2 THEN 1 WHEN column_1 < 3 THEN 2 ELSE 3 END as tick, column_1, minMax.* FROM __test__, (SELECT MIN(column_1) _min, MAX(column_1) _max FROM __test__) minMax) q GROUP BY tick`,
        connection: props.source.connection,
        opts: {
          abortController: undefined
        }
      });
    });

    test('should work correctly using bins', async () => {
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
        ticks: [],
        bins: 4,
        operation: AggregationTypes.COUNT,
        column: 'column_1',
        global: true
      };

      const data = await getHistogram(props);

      expect(data).toEqual({
        data: RESULT,
        min: 0,
        max: 4,
        ticks: TICKS
      });

      expect(executeSQL).toHaveBeenCalledWith({
        credentials: props.source.credentials,
        query: `SELECT tick, count(column_1) as value, MIN(q._min) _min, MAX(q._max) _max FROM (SELECT CASE WHEN column_1 < (minMax._min + (minMax._max - minMax._min) * (1 / 4)) THEN 0 WHEN column_1 < (minMax._min + (minMax._max - minMax._min) * (2 / 4)) THEN 1 WHEN column_1 < (minMax._min + (minMax._max - minMax._min) * (3 / 4)) THEN 2 ELSE 3 END as tick, column_1, minMax.* FROM __test__, (SELECT MIN(column_1) _min, MAX(column_1) _max FROM __test__) minMax) q GROUP BY tick`,
        connection: props.source.connection,
        opts: {
          abortController: undefined
        }
      });
    });
  });
});
