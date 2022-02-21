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
  const RESULTS = [VALUES.length, 3, 1, 5, 15];

  describe('by values', () => {
    Object.values(AggregationTypes).forEach((key, idx) => {
      test(key, () => {
        const func = aggregationFunctions[key];
        expect(func(VALUES)).toEqual(RESULTS[idx]);
      });
    });
  });

  describe('by features', () => {
    describe('unique key', () => {
      Object.values(AggregationTypes).forEach((key, idx) => {
        test(key, () => {
          const func = aggregationFunctions[key];
          expect(func(features, COLUMN)).toEqual(RESULTS[idx]);
        });
      });
    });

    describe('multiple keys', () => {
      const RESULTS_FOR_MULTIPLE_KEYS = [VALUES.length, 2.5, 0, 5, 25];
      Object.values(AggregationTypes).forEach((key, idx) => {
        test(key, () => {
          const func = aggregationFunctions[key];
          expect(func(features, [COLUMN, COLUMN_2], key)).toEqual(
            RESULTS_FOR_MULTIPLE_KEYS[idx]
          );
        });
      });
    });
  });
});
