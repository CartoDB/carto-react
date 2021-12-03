import { applySorting } from '../src/utils/sorting';

const features = [
  { column1: 'C', column2: 3 },
  { column1: 'A', column2: 1 },
  { column1: 'B', column2: 2 },
  { column1: 'D', column2: 4 },
  { column1: 'D', column2: 5 }
];

const commonSortedFeatures = [
  { column1: 'A', column2: 1 },
  { column1: 'B', column2: 2 },
  { column1: 'C', column2: 3 },
  { column1: 'D', column2: 4 },
  { column1: 'D', column2: 5 }
];

const commonSortedFeatures2 = [
  { column1: 'D', column2: 4 },
  { column1: 'D', column2: 5 },
  { column1: 'C', column2: 3 },
  { column1: 'B', column2: 2 },
  { column1: 'A', column2: 1 }
];

describe('Sorting', () => {
  test('should correctly throw error when sortOptions are invalid', () => {
    expect(() => applySorting(features, { sortBy: 12345 })).toThrowError(Error);
  });

  describe('should correctly understand sortOptions', () => {
    test('if undefined', () => {
      expect(applySorting(features)).toEqual(features);
    });

    test('if sortBy is string', () => {
      expect(applySorting(features, { sortBy: 'column1' })).toEqual(commonSortedFeatures);
    });

    test('if sortBy uses 2 columns', () => {
      expect(applySorting(features, { sortBy: ['column1', 'column2'] })).toEqual(
        commonSortedFeatures
      );
    });

    test('if sortBy is array of arrays', () => {
      expect(applySorting(features, { sortBy: [['column1'], ['column2']] })).toEqual(
        commonSortedFeatures
      );
    });
  });
  describe('should correctly sort', () => {
    test('if sortByDirection is used', () => {
      expect(
        applySorting(features, { sortBy: 'column1', sortByDirection: 'desc' })
      ).toEqual(commonSortedFeatures2);
    });

    test('if sort direction is applied inside sortBy', () => {
      expect(applySorting(features, { sortBy: [['column1', 'desc']] })).toEqual(
        commonSortedFeatures2
      );

      expect(
        applySorting(features, { sortBy: [['column1']], sortByDirection: 'desc' })
      ).toEqual(commonSortedFeatures2);
    });

    test('if sort direction is applied inside sortBy and sortByDirection is also used, sortBy has priority', () => {
      expect(
        applySorting(features, { sortBy: [['column1', 'desc']], sortByDirection: 'asc' })
      ).toEqual(commonSortedFeatures2);

      expect(
        applySorting(features, {
          sortBy: [['column1', { direction: 'desc' }]],
          sortByDirection: 'asc'
        })
      ).toEqual(commonSortedFeatures2);
    });
  });
});
