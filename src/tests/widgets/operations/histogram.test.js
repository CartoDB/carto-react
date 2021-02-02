import { histogram } from 'src/widgets/operations/histogram';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import {
  values,
  validFeatures,
  invalidFeatures
} from '../data-mocks/operations/linesForHistogram';

const COLUMN = 'test';
const ticks = Array.from(new Set(values));

describe('Histogram', () => {
  test('should return an empty array due to empty features array', () => {
    expect(histogram([])).toEqual([]);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(histogram(validFeatures(COLUMN), COLUMN, ticks, 'pow')).toEqual([]);
    });

    test('should return an array of bins with same length as ticks plus two, due to the addition of extreme values', () => {
      const func = histogram(
        validFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(func.length).toBe(1 + ticks.length + 1);
    });

    test(AggregationTypes.COUNT, () => {
      const func = histogram(
        validFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(func).toEqual([0, 1, 2, 3, 2, 1, 0]);
    });

    test(AggregationTypes.AVG, () => {
      const func = histogram(validFeatures(COLUMN), COLUMN, ticks, AggregationTypes.AVG);
      expect(func).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.MIN, () => {
      const func = histogram(validFeatures(COLUMN), COLUMN, ticks, AggregationTypes.MIN);
      expect(func).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.MAX, () => {
      const func = histogram(validFeatures(COLUMN), COLUMN, ticks, AggregationTypes.MAX);
      expect(func).toEqual([0, 1, 2, 3, 4, 5, 0]);
    });

    test(AggregationTypes.SUM, () => {
      const func = histogram(validFeatures(COLUMN), COLUMN, ticks, AggregationTypes.SUM);
      expect(func).toEqual([0, 1, 4, 9, 8, 5, 0]);
    });
  });

  describe('invalid features', () => {
    test('should return all bins values to 0 due to invalid column data', () => {
      const func = histogram(
        invalidFeatures(COLUMN),
        COLUMN,
        ticks,
        AggregationTypes.COUNT
      );
      expect(func).toEqual([0, 0, 0, 0, 0, 0, 0]);
    });
  });
});
