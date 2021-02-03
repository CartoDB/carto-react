import { minify } from 'pgsql-minify';

import {
  getHistogram,
  buildSqlQueryToGetHistogram,
  filterViewportFeaturesToGetHistogram
} from 'src/widgets/models/HistogramModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';

import { POLYGONS } from '../data-mocks/models/polygonsForHistogram';

import { mockRequest, mockClear } from '../mockRequest';

describe('getHistogram', () => {
  test('should throw an error due to invalid data type', async () => {
    await expect(getHistogram({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get histogram'
    );
  });

  test('should throw an error if trying to implement client-side-logic with CartoBQTilerLayer', async () => {
    await expect(
      getHistogram({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Histogram Widget error: BigQuery layer needs "viewportFilter" prop set to true.'
    );
  });

  describe('should decide whether execute a SQL query to get global data or a viewport features filtering', () => {
    describe('should execute a SQL query - "viewportFilter" prop is false', () => {
      const fetchResponse = {
        rows: [
          { tick: 'cat_3', value: 1495728 },
          { tick: 'cat_2', value: 1471841 },
          { tick: 'cat_1', value: 1326625 },
          { tick: 'cat_0', value: 1317791 }
        ]
      };
      const requestQuery = 'SELECT revenue FROM retail_stores LIMIT 4';
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

      mockRequest({ fetchResponse, requestQuery, credentials });

      beforeEach(() => {
        mockClear();
      });

      test('should execute a SQL query', async () => {
        const args = {
          data: requestQuery,
          credentials,
          operation: 'count',
          column: 'revenue',
          operationColumn: 'revenue',
          type: LayerTypes.SQL,
          ticks: [1300000, 1400000, 1500000],
          viewportFilter: false
        };
        const func = await getHistogram(args);

        function findTicksInQueryResult(ticks, queryResult) {
          const result = [];
          for (let i = 0; i <= ticks.length; i++) {
            const tick = `cat_${i}`;
            const element = queryResult.find((d) => d.tick === tick);
            result.push(element ? element.value : null);
          }
          return result;
        }

        const makeTicks = findTicksInQueryResult(args.ticks, queryResult);
        expect(func).toEqual(makeTicks);
      });
    });

    describe('should filter viewport features - "viewportFilter" prop is true', () => {
      const viewportFeatures = POLYGONS('revenue');

      const createArguments = (operation) => ({
        operation,
        column: 'revenue',
        type: LayerTypes.SQL,
        ticks: [1, 2, 3],
        viewportFilter: true,
        viewportFeatures
      });

      test(AggregationTypes.COUNT, async () => {
        const args = createArguments(AggregationTypes.COUNT);
        const func = await getHistogram(args);
        expect(func).toEqual([0, 1, 1, 1, 0]);
      });

      test(AggregationTypes.AVG, async () => {
        const args = createArguments(AggregationTypes.AVG);
        const func = await getHistogram(args);
        expect(func).toEqual([0, 1, 2, 3, 0]);
      });

      test(AggregationTypes.SUM, async () => {
        const args = createArguments(AggregationTypes.SUM);
        const func = await getHistogram(args);
        expect(func).toEqual([0, 1, 2, 3, 0]);
      });

      test(AggregationTypes.MIN, async () => {
        const args = createArguments(AggregationTypes.MIN);
        const func = await getHistogram(args);
        expect(func).toEqual([0, 1, 2, 3, 0]);
      });

      test(AggregationTypes.MAX, async () => {
        const args = createArguments(AggregationTypes.MAX);
        const func = await getHistogram(args);
        expect(func).toEqual([0, 1, 2, 3, 0]);
      });
    });
  });

  describe('buildSqlQueryToGetHistogram - simple global operations', () => {
    const createArguments = (operation) => ({
      data: 'SELECT storetype, revenue FROM retail_stores',
      operation,
      column: 'revenue',
      operationColumn: 'revenue',
      ticks: [1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]
    });

    const buildQuery = (args) => `
      SELECT 
        tick, ${args.operation}(${args.operationColumn}) as value
      FROM 
        (
          SELECT 
            CASE WHEN revenue < 1200000 THEN 'cat_0' WHEN revenue < 1300000 THEN 'cat_1' WHEN revenue < 1400000 THEN 'cat_2' WHEN revenue < 1500000 THEN 'cat_3' WHEN revenue < 1600000 THEN 'cat_4' WHEN revenue < 1700000 THEN 'cat_5' WHEN revenue < 1800000 THEN 'cat_6' ELSE 'cat_7' END as tick, ${args.operationColumn} 
          FROM (
            SELECT 
              * 
            FROM (${args.data}) as q2
          ) as q1
        ) as q
      GROUP BY tick
    `;

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetHistogram(args)).toEqual(minify(query));
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetHistogram(args)).toEqual(minify(query));
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetHistogram(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetHistogram(args)).toEqual(minify(query));
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
      const query = buildQuery(args);
      expect(buildSqlQueryToGetHistogram(args)).toEqual(minify(query));
    });
  });

  describe('filterViewportFeaturesToGetHistogram - simple viewport features filtering', () => {
    const createArguments = (operation) => ({
      operation,
      column: 'revenue',
      viewportFeatures: POLYGONS('revenue'),
      ticks: [1, 2, 3]
    });

    test(AggregationTypes.COUNT, () => {
      const args = createArguments(AggregationTypes.COUNT);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 1, 1, 0]);
    });

    test(AggregationTypes.AVG, () => {
      const args = createArguments(AggregationTypes.AVG);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 2, 3, 0]);
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 2, 3, 0]);
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 2, 3, 0]);
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 2, 3, 0]);
    });

    test('no features', () => {
      const testCases = [null, undefined];
      for (const tc of testCases) {
        expect(filterViewportFeaturesToGetHistogram({ viewportFeatures: tc })).toEqual(
          []
        );
      }
    });
  });
});
