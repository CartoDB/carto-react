import { getTimeSeries } from '../../src/models/TimeSeriesModel';
import { AggregationTypes, GroupDateTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

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

jest.mock('@carto/react-api', () => ({
  executeSQL: (...args) => mockedExecuteSQL(...args)
}));

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
    const DEFAULT_PROPS = {
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
      global: true
    };

    describe('no-week stepSize', () => {
      const MOCK_API_RESULT = [
        {
          ['_agg_' + GroupDateTypes.YEARS]: 1970,
          ['_agg_' + GroupDateTypes.MONTHS]: 1,
          value: 2
        },
        {
          ['_agg_' + GroupDateTypes.YEARS]: 1970,
          ['_agg_' + GroupDateTypes.MONTHS]: 2,
          value: 3
        }
      ];

      const RESULT = [
        { name: Date.UTC(1970, 0, 1, 0, 0), value: 2 },
        { name: Date.UTC(1970, 1, 1, 0, 0), value: 3 }
      ];

      test('should work correctly', async () => {
        mockedExecuteSQL.mockImplementation(
          () => new Promise((resolve) => resolve(MOCK_API_RESULT))
        );

        const props = {
          ...DEFAULT_PROPS,
          stepSize: GroupDateTypes.MONTHS
        };

        const data = await getTimeSeries(props);

        expect(data).toEqual(RESULT);

        expect(mockedExecuteSQL).toHaveBeenCalledWith({
          credentials: props.source.credentials,
          query: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,count(*) as value FROM __test__ GROUP BY _agg_year,_agg_month ORDER BY _agg_year,_agg_month`,
          connection: props.source.connection,
          opts: {
            abortController: undefined
          }
        });
      });
    });

    describe('week stepSize', () => {
      const MOCK_API_RESULT = [
        {
          ['_agg_' + GroupDateTypes.YEARS]: 1970,
          ['_agg_' + GroupDateTypes.MONTHS]: 1,
          ['_agg_' + GroupDateTypes.DAYS]: 1,
          value: 2,
          _grouped_count: 10
        },
        {
          ['_agg_' + GroupDateTypes.YEARS]: 1970,
          ['_agg_' + GroupDateTypes.MONTHS]: 1,
          ['_agg_' + GroupDateTypes.DAYS]: 2,
          value: 3,
          _grouped_count: 20
        }
      ];

      const RESULTS = {
        [AggregationTypes.AVG]: [{ name: -259200000, value: 2.6666666666666665 }],
        [AggregationTypes.SUM]: [{ name: -259200000, value: 5 }],
        [AggregationTypes.MIN]: [{ name: -259200000, value: 2 }],
        [AggregationTypes.MAX]: [{ name: -259200000, value: 3 }],
        [AggregationTypes.COUNT]: [{ name: -259200000, value: 5 }]
      };

      const RESULTS_QUERIES = {
        [AggregationTypes.AVG]: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,extract(day from cast(date_column as timestamp)) as _agg_day,avg(opt_column) as value,count(*) as _grouped_count FROM __test__ GROUP BY _agg_year,_agg_month,_agg_day ORDER BY _agg_year,_agg_month,_agg_day`,
        [AggregationTypes.SUM]: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,extract(day from cast(date_column as timestamp)) as _agg_day,sum(opt_column) as value FROM __test__ GROUP BY _agg_year,_agg_month,_agg_day ORDER BY _agg_year,_agg_month,_agg_day`,
        [AggregationTypes.MIN]: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,extract(day from cast(date_column as timestamp)) as _agg_day,min(opt_column) as value FROM __test__ GROUP BY _agg_year,_agg_month,_agg_day ORDER BY _agg_year,_agg_month,_agg_day`,
        [AggregationTypes.MAX]: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,extract(day from cast(date_column as timestamp)) as _agg_day,max(opt_column) as value FROM __test__ GROUP BY _agg_year,_agg_month,_agg_day ORDER BY _agg_year,_agg_month,_agg_day`,
        [AggregationTypes.COUNT]: `SELECT extract(year from cast(date_column as timestamp)) as _agg_year,extract(month from cast(date_column as timestamp)) as _agg_month,extract(day from cast(date_column as timestamp)) as _agg_day,count(*) as value FROM __test__ GROUP BY _agg_year,_agg_month,_agg_day ORDER BY _agg_year,_agg_month,_agg_day`
      };

      test('should work correctly', () => {
        mockedExecuteSQL.mockImplementation(
          () => new Promise((resolve) => resolve(MOCK_API_RESULT))
        );

        const props = {
          ...DEFAULT_PROPS,
          stepSize: GroupDateTypes.WEEKS
        };

        Object.keys(RESULTS).forEach((operation) => {
          getTimeSeries({ ...props, operation }).then((data) =>
            expect(data).toEqual(RESULTS[operation])
          );

          expect(mockedExecuteSQL).toHaveBeenCalledWith({
            credentials: props.source.credentials,
            query: RESULTS_QUERIES[operation],
            connection: props.source.connection,
            opts: {
              abortController: undefined
            }
          });
        });
      });
    });
  });
});
