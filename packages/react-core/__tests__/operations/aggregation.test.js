import { aggregationFunctions } from '../../src/operations/aggregation';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const COLUMN = 'test';
const COLUMN_2 = 'test_2';

const features = [...Array(VALUES.length)].map((_, idx) => ({
  [COLUMN]: VALUES[idx],
  [COLUMN_2]: VALUES[idx] - 1
}));

describe('aggregationFunctions', () => {
  const RESULTS = {
    [AggregationTypes.COUNT]: VALUES.length,
    [AggregationTypes.AVG]: 3,
    [AggregationTypes.MIN]: 1,
    [AggregationTypes.MAX]: 5,
    [AggregationTypes.SUM]: 15
  };

  describe('by values', () => {
    Object.entries(RESULTS).forEach(([operation, result]) => {
      test(operation, () => {
        const func = aggregationFunctions[operation];
        expect(func(VALUES)).toEqual(result);
      });
    });
  });

  describe('by features', () => {
    describe('unique key', () => {
      Object.entries(RESULTS).forEach(([operation, result], idx) => {
        test(operation, () => {
          const func = aggregationFunctions[operation];
          expect(func(features, COLUMN)).toEqual(result);
        });
      });
    });

    describe('multiple keys', () => {
      const RESULTS_FOR_MULTIPLE_KEYS = {
        [AggregationTypes.COUNT]: VALUES.length,
        [AggregationTypes.AVG]: 2.5,
        [AggregationTypes.MIN]: 0,
        [AggregationTypes.MAX]: 5,
        [AggregationTypes.SUM]: 25
      };

      Object.entries(RESULTS_FOR_MULTIPLE_KEYS).forEach(([operation, result]) => {
        test(operation, () => {
          const func = aggregationFunctions[operation];
          expect(func(features, [COLUMN, COLUMN_2], operation)).toEqual(result);
        });
      });
    });
  });
});
