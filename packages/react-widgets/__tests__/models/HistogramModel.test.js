import { getHistogram } from '../../src/models/HistogramModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { executeSQL } from '@carto/react-api/';

const TICKS = [1, 2, 3];
const RESULT = [3, 1, 2, 0];

const MOCK_SQL_RESPONSE = Array(TICKS.length)
  .fill(null)
  // Only results [0,2] are used, because we're mocking the case
  // when SQL doesn't have values for the last tick
  .map((_, idx) => ({ tick: idx, value: RESULT[idx] }));

jest.mock('@carto/react-api', () => ({
  executeSQL: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(MOCK_SQL_RESPONSE)))
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

      expect(executeSQL).toHaveBeenCalledWith({
        credentials: props.source.credentials,
        query: `SELECT tick, count(column_1) as value FROM (SELECT CASE WHEN column_1 < 1 THEN 0 WHEN column_1 < 2 THEN 1 WHEN column_1 < 3 THEN 2 ELSE 3 END as tick, column_1 FROM __test__) q GROUP BY tick`,
        connection: props.source.connection,
        opts: {
          abortController: undefined
        }
      });
    });
  });
});
