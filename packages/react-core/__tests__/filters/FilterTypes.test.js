import { FilterTypes, filterFunctions } from '../../src/filters/FilterTypes';

describe('FilterTypes', () => {
  describe(FilterTypes.IN, () => {
    test('should filter correctly', () => {
      const inFilter = filterFunctions[FilterTypes.IN];

      // String input
      expect(inFilter(['a', 'b', 'c'], 'a')).toBe(true);
      expect(inFilter(['a', 'b', 'c'], 'd')).toBe(false);

      // Number input
      expect(inFilter([0, 1, 2], 0)).toBe(true);
      expect(inFilter([0, 1, 2], 3)).toBe(false);
    });
  });

  describe(FilterTypes.BETWEEN, () => {
    test('should filter correctly', () => {
      const betweenFilter = filterFunctions[FilterTypes.BETWEEN];
      const filterValues = [[, -50], [0, 100], [200, 300], [350]];

      expect(betweenFilter(filterValues, -100000)).toBe(true);
      expect(betweenFilter(filterValues, -25)).toBe(false);
      expect(betweenFilter(filterValues, 0)).toBe(true);
      expect(betweenFilter(filterValues, 50)).toBe(true);
      expect(betweenFilter(filterValues, 100)).toBe(true);
      expect(betweenFilter(filterValues, 150)).toBe(false);
      expect(betweenFilter(filterValues, 200)).toBe(true);
      expect(betweenFilter(filterValues, 250)).toBe(true);
      expect(betweenFilter(filterValues, 300)).toBe(true);
      expect(betweenFilter(filterValues, 325)).toBe(false);
      expect(betweenFilter(filterValues, 10000)).toBe(true);
    });
  });

  describe(FilterTypes.TIME, () => {
    test('should filter correctly', () => {
      const timeFilter = filterFunctions[FilterTypes.TIME];
      const filterValues = [[new Date(0), new Date(100)]];

      expect(timeFilter(filterValues, new Date(50))).toBe(true);
      expect(timeFilter(filterValues, new Date(200))).toBe(false);
    });

    test('should raise error if featureValue is not a valid time', () => {
      const timeFilter = filterFunctions[FilterTypes.TIME];
      expect(() => timeFilter([], '__test__')).toThrowError();
    });
  });

  describe(FilterTypes.CLOSED_OPEN, () => {
    test('should filter correctly', () => {
      const closedOpenFilter = filterFunctions[FilterTypes.CLOSED_OPEN];
      const filterValues = [
        [0, 100],
        [200, 300]
      ];

      expect(closedOpenFilter(filterValues, 0)).toBe(true);
      expect(closedOpenFilter(filterValues, 50)).toBe(true);
      expect(closedOpenFilter(filterValues, 100)).toBe(false);

      expect(closedOpenFilter(filterValues, 200)).toBe(true);
      expect(closedOpenFilter(filterValues, 250)).toBe(true);
      expect(closedOpenFilter(filterValues, 300)).toBe(false);
    });
  });

  describe(FilterTypes.STRING_SEARCH, () => {
    test('should filter correctly', () => {
      const stringSearchFilter = filterFunctions[FilterTypes.STRING_SEARCH];
      const featureValue = 'CARTO';
      const filterValues = ['carto'];

      expect(stringSearchFilter(filterValues, featureValue)).toBe(true);
      expect(
        stringSearchFilter(filterValues, featureValue, { caseSensitive: true })
      ).toBe(false);
      expect(stringSearchFilter(['art'], featureValue)).toBe(true);
      expect(stringSearchFilter(['art'], featureValue, { mustStart: true })).toBe(false);
      expect(stringSearchFilter(['cart'], featureValue, { mustStart: true })).toBe(true);
      expect(stringSearchFilter(['cart'], featureValue, { mustEnd: true })).toBe(false);
      expect(stringSearchFilter(['arto'], featureValue, { mustEnd: true })).toBe(true);

      // With accents
      expect(stringSearchFilter(['Sévïllà'], 'Sevilla')).toBe(true);
      expect(
        stringSearchFilter(['Sévïllà'], 'Sevilla', { keepSpecialCharacters: true })
      ).toBe(false);

      // Multiples filter values (OR)
      expect(stringSearchFilter(['_test_', 'carto'], featureValue)).toBe(true);
    });
  });
});
