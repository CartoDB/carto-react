import { histogram } from '../../src/operations/histogram';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 2, 3, 3, 3, 4, 4, 5];

const buildValidFeatures = (columnName) =>
  [...Array(VALUES.length)].map((_, idx) => ({
    [columnName]: VALUES[idx],
    [columnName + '_2']: VALUES[idx]
  }));

const buildInvalidFeatures = (columnName) => [
  {
    [columnName]: null
  },
  {
    [columnName]: undefined
  }
];

const COLUMN = 'test';
const COLUMN_2 = 'test_2';
const ticks = Array.from(new Set(VALUES));

describe('histogram', () => {
  test('should return an empty array due to empty features array', () => {
    expect(histogram({ data: [] })).toEqual([]);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(
        histogram({
          data: buildValidFeatures(COLUMN),
          valuesColumns: [COLUMN],
          ticks,
          // @ts-ignore
          operation: 'pow'
        })
      ).toEqual([]);
    });

    test('should return an array of bins with same length as ticks plus two, due to the addition of extreme values', () => {
      const h = histogram({
        data: buildValidFeatures(COLUMN),
        valuesColumns: [COLUMN],
        ticks,
        operation: AggregationTypes.COUNT
      });
      expect(h.length).toBe(1 + ticks.length);
    });

    const RESULTS = {
      [AggregationTypes.COUNT]: [0, 1, 2, 3, 2, 1],
      [AggregationTypes.AVG]: [0, 1, 2, 3, 4, 5],
      [AggregationTypes.MIN]: [0, 1, 2, 3, 4, 5],
      [AggregationTypes.MAX]: [0, 1, 2, 3, 4, 5],
      [AggregationTypes.SUM]: [0, 1, 4, 9, 8, 5]
    };

    describe('one valuesColumns', () => {
      Object.entries(RESULTS).forEach(([operation, result]) => {
        test(operation, () => {
          const groups = histogram({
            data: buildValidFeatures(COLUMN),
            valuesColumns: [COLUMN],
            ticks,
            // @ts-ignore
            operation
          });
          expect(groups).toEqual(result);
        });
      });
    });

    describe('multiple valuesColumns', () => {
      const RESULTS_FOR_MULTIPLE = Object.entries(RESULTS).reduce(
        (acc, [operation, result], idx) => {
          acc[operation] = result.map(
            (value) =>
              // === 0 is AggregationTypes.COUNT
              value * (idx === 0 ? 1 : 2)
          );
          return acc;
        },
        {}
      );

      Object.entries(RESULTS_FOR_MULTIPLE).forEach(([operation, result]) => {
        test(operation, () => {
          const groups = histogram({
            data: buildValidFeatures(COLUMN),
            valuesColumns: [COLUMN, COLUMN_2],
            joinOperation: AggregationTypes.SUM,
            ticks: ticks.map((tick) => tick * 2),
            // @ts-ignore
            operation
          });
          expect(groups).toEqual(result);
        });
      });
    });
  });

  describe('invalid features', () => {
    test('should return all bins values to 0 due to invalid column data', () => {
      const h = histogram({
        data: buildInvalidFeatures(COLUMN),
        valuesColumns: [COLUMN],
        ticks,
        operation: AggregationTypes.COUNT
      });
      expect(h).toEqual([0, 0, 0, 0, 0, 0]);
    });
  });
});
