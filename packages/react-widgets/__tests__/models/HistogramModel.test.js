import { minify } from 'pgsql-minify';
import { getHistogram } from '../../src/models/HistogramModel';
import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_HISTOGRAM: 'viewportFeaturesHistogram'
  }
}));

describe('getHistogram', () => {
  test('should throw with array data', async () => {
    await expect(getHistogram({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get histogram'
    );
  });

  test.skip('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getHistogram({ type: SourceTypes.BIGQUERY, viewportFilter: false })
    ).rejects.toThrow(
      'Histogram Widget error: BigQuery layer needs "viewportFilter" prop set to true.'
    );
  });

  describe('should correctly handle viewport features', () => {
    const histogramParams = {
      column: 'revenue',
      operation: AggregationTypes.COUNT,
      ticks: [0, 1, 2],
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      executeTask.mockImplementation(() => Promise.resolve([0, 1, 2, 1]));
      const histogram = await getHistogram(histogramParams);
      expect(histogram).toEqual([0, 1, 2, 1]);
    });

    test('correctly called', async () => {
      const { column, operation, ticks, filters, dataSource } = histogramParams;
      await getHistogram(histogramParams);
      expect(executeTask).toHaveBeenCalledWith(
        dataSource,
        Methods.VIEWPORT_FEATURES_HISTOGRAM,
        { column, filters, operation, ticks }
      );
    });
  });

  describe.skip('SQL Layer', () => {
    describe('should execute a SqlApi request when using "viewportFilter": false', () => {
      const response = {
        rows: [
          { tick: 'cat_3', value: 1495728 },
          { tick: 'cat_2', value: 1471841 },
          { tick: 'cat_1', value: 1326625 },
          { tick: 'cat_0', value: 1317791 }
        ]
      };
      const sql = 'SELECT revenue FROM retail_stores LIMIT 4';
      const credentials = {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com'
      };
      const queryResult = [
        { tick: 'cat_3', value: 1495728 },
        { tick: 'cat_2', value: 1471841 },
        { tick: 'cat_1', value: 1326625 },
        { tick: 'cat_0', value: 1317791 }
      ];

      mockSqlApiRequest({ response, sql, credentials });

      beforeEach(() => {
        mockClear();
      });

      test('should call SqlApi', async () => {
        const params = {
          data: sql,
          credentials,
          operation: 'count',
          column: 'revenue',
          operationColumn: 'revenue',
          type: SourceTypes.SQL,
          ticks: [1300000, 1400000, 1500000],
          viewportFilter: false
        };
        const histogram = await getHistogram(params);

        function findTicksInQueryResult(ticks, queryResult) {
          const result = [];
          for (let i = 0; i <= ticks.length; i++) {
            const tick = `cat_${i}`;
            const element = queryResult.find((d) => d.tick === tick);
            result.push(element ? element.value : null);
          }
          return result;
        }

        const makeTicks = findTicksInQueryResult(params.ticks, queryResult);
        expect(histogram).toEqual(makeTicks);
      });
    });
  });
});
