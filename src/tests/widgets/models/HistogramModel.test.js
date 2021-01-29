import { minify } from 'pgsql-minify';

import {
  getHistogram,
  buildSqlQueryToGetHistogram,
  filterViewportFeaturesToGetHistogram
} from 'src/widgets/models/HistogramModel';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import { LayerTypes } from 'src/widgets/LayerTypes';
import { POLYGONS } from '../data-mocks/polygonsForHistogram';

describe('getHistogram', () => {
  test('should thrown an error due to invalid data type', async () => {
    await expect(getHistogram({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get histogram'
    );
  });

  test('should thrown an error if trying to implement client-side-logic with CartoBQTilerLayer', async () => {
    await expect(
      getHistogram({ type: LayerTypes.BQ, viewportFilter: false })
    ).rejects.toThrow(
      'Histogram Widget error: BigQuery layer needs "viewportFilter" prop set to true.'
    );
  });

  describe('buildSqlQueryToGetHistogram - simple global operations', () => {
    const createArguments = (operation) => ({
      data: 'SELECT storetype, revenue FROM retail_stores',
      operation,
      column: 'revenue',
      operationColumn: 'revenue',
      viewportFeatures: POLYGONS('revenue'),
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
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([NaN, 1, 2, 3, NaN]);
    });

    test(AggregationTypes.SUM, () => {
      const args = createArguments(AggregationTypes.SUM);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([0, 1, 2, 3, 0]);
    });

    test(AggregationTypes.MIN, () => {
      const args = createArguments(AggregationTypes.MIN);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([
        Infinity,
        1,
        2,
        3,
        Infinity
      ]);
    });

    test(AggregationTypes.MAX, () => {
      const args = createArguments(AggregationTypes.MAX);
      expect(filterViewportFeaturesToGetHistogram(args)).toEqual([
        -Infinity,
        1,
        2,
        3,
        -Infinity
      ]);
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
