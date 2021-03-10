import { histogram } from '../../src/operations/histogram';
import { AggregationTypes } from '../../src/operations/aggregation/AggregationTypes';

const VALUES = [1, 2, 2, 3, 3, 3, 4, 4, 5];

const buildValidFeatures = (columnName) =>
  [...Array(VALUES.length)].map((_, idx) => ({
    [columnName]: VALUES[idx]
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
const ticks = Array.from(new Set(VALUES));

describe('histogram', () => {
  test('should return an empty array due to empty features array', () => {
    expect(histogram([])).toEqual([]);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(histogram(buildValidFeatures(COLUMN), COLUMN, ticks, 'pow')).toEqual([]);
    });

    test('should return an array of bins with same length as ticks plus two, due to the addition of extreme values', () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(h.length).toBe(1 + ticks.length + 1);
    });

    test(AggregationTypes.COUNT, () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(h).toEqual([0, 1, 2, 3, 2, 1, 0]);
    });

    test(AggregationTypes.AVG, () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.AVG
      );
      expect(h).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.MIN, () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.MIN
      );
      expect(h).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.MAX, () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.MAX
      );
      expect(h).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.SUM, () => {
      const h = histogram(
        buildValidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.SUM
      );
      expect(h).toEqual([0, 1, 4, 9, 8, 5, 0]);
    });
  });

  describe('invalid features', () => {
    test('should return all bins values to 0 due to invalid column data', () => {
      const h = histogram(
        buildInvalidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(h).toEqual([0, 0, 0, 0, 0, 0, 0]);
    });
  });
});
