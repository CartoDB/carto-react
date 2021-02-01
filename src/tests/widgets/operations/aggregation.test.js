import { aggregationFunctions } from 'src/widgets/operations/aggregation/values';
import { AggregationTypes } from 'src/widgets/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const COLUMN_NAME = 'test';
const FEATURES = [...Array(5)].map((_, idx) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  },
  properties: {
    [COLUMN_NAME]: VALUES[idx]
  }
}));

describe('Aggregation functions', () => {
  describe('By values', () => {
    test(AggregationTypes.COUNT, () => {
      const func = aggregationFunctions[AggregationTypes.COUNT];
      expect(func(VALUES)).toEqual(5);
    });

    test(AggregationTypes.SUM, () => {
      const func = aggregationFunctions[AggregationTypes.SUM];
      expect(func(VALUES)).toEqual(15);
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
  });

  describe('By features', () => {
    test(AggregationTypes.COUNT, () => {
      const func = aggregationFunctions[AggregationTypes.COUNT];
      expect(func(FEATURES)).toEqual(5);
    });

    test(AggregationTypes.SUM, () => {
      const func = aggregationFunctions[AggregationTypes.SUM];
      expect(func(FEATURES, COLUMN_NAME)).toEqual(15);
    });

    test(AggregationTypes.AVG, () => {
      const func = aggregationFunctions[AggregationTypes.AVG];
      expect(func(FEATURES, COLUMN_NAME)).toEqual(3);
    });
  });
});
