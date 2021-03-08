import { aggregationFunctions } from '../../../src/operations/aggregation/values';
import { AggregationTypes } from '../../../src/widgets/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const COLUMN = 'test';

const features = [...Array(VALUES.length)].map((_, idx) => ({
  [COLUMN]: VALUES[idx]
}));

describe('aggregationFunctions', () => {
  describe('by values', () => {
    test(AggregationTypes.COUNT, () => {
      const func = aggregationFunctions[AggregationTypes.COUNT];
      expect(func(VALUES)).toEqual(5);
    });

    test(AggregationTypes.AVG, () => {
      const func = aggregationFunctions[AggregationTypes.AVG];
      expect(func(VALUES)).toEqual(3);
    });

    test(AggregationTypes.MIN, () => {
      const func = aggregationFunctions[AggregationTypes.MIN];
      expect(func(VALUES)).toEqual(1);
    });

    test(AggregationTypes.MAX, () => {
      const func = aggregationFunctions[AggregationTypes.MAX];
      expect(func(VALUES)).toEqual(5);
    });

    test(AggregationTypes.SUM, () => {
      const func = aggregationFunctions[AggregationTypes.SUM];
      expect(func(VALUES)).toEqual(15);
    });
  });

  describe('by features', () => {
    test(AggregationTypes.COUNT, () => {
      const func = aggregationFunctions[AggregationTypes.COUNT];
      expect(func(features, COLUMN)).toEqual(5);
    });

    test(AggregationTypes.AVG, () => {
      const func = aggregationFunctions[AggregationTypes.AVG];
      expect(func(features, COLUMN)).toEqual(3);
    });

    test(AggregationTypes.MIN, () => {
      const func = aggregationFunctions[AggregationTypes.MIN];
      expect(func(features, COLUMN)).toEqual(1);
    });

    test(AggregationTypes.MAX, () => {
      const func = aggregationFunctions[AggregationTypes.MAX];
      expect(func(features, COLUMN)).toEqual(5);
    });

    test(AggregationTypes.SUM, () => {
      const func = aggregationFunctions[AggregationTypes.SUM];
      expect(func(features, COLUMN)).toEqual(15);
    });
  });
});
