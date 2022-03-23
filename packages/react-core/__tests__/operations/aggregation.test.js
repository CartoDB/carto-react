import { aggregate, aggregationFunctions } from '../../src/operations/aggregation';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const COLUMN = 'test';
const COLUMN_2 = 'test_2';

const features = [...Array(VALUES.length)].map((_, idx) => ({
  [COLUMN]: VALUES[idx],
  [COLUMN_2]: VALUES[idx] - 1
}));

describe('aggregation', () => {
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

  describe("aggregate feature's properties", () => {
    // It should only access the feature's property
    test('should work correctly with one column', () => {
      features.forEach((feature) => {
        const aggregatedValue = aggregate(feature, [COLUMN]);
        expect(aggregatedValue).toEqual(feature[COLUMN]);
      });
    });

    test('should aggregate two columns correctly', () => {
      features.forEach((feature) => {
        const aggregatedValue = aggregate(
          feature,
          [COLUMN, COLUMN_2],
          AggregationTypes.SUM
        );
        expect(aggregatedValue).toEqual(feature[COLUMN] + feature[COLUMN_2]);
      });
    });

    test("throws an error if joinOperation isn't valid", () => {
      const feature = features[0];
      // @ts-ignore
      expect(() => aggregate(feature, [COLUMN, COLUMN_2], '__unknown__')).toThrowError();
    });

    test("throws an error if passed keys aren't valid", () => {
      const feature = features[0];
      // @ts-ignore
      expect(() => aggregate(feature, [], '__unknown__')).toThrowError();
      // @ts-ignore
      expect(() => aggregate(feature, null, '__unknown__')).toThrowError();
    });
  });
});
