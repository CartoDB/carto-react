import { buildFeatureFilter } from 'src/api/Filter';

const filters = {
  column1: {
    in: {
      owner: 'widgetId1',
      values: ['a', 'b', 'c']
    }
  },
  column2: {
    between: {
      owner: 'widgetId2',
      values: [[1, 2, 3]]
    }
  }
};

const makeFeatureWithValueInColumn = (value = 1, column = 'column1') => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  },
  properties: {
    [column]: value
  }
});

const makeObjectWithValueInColumn = (value = 1, column = 'column1') => ({
  [column]: value
});

describe('Filters', () => {
  test('should return 1 if no filters present', () => {
    const params = { filters: {}, type: 'number' };
    const feature = makeFeatureWithValueInColumn();
    expect(buildFeatureFilter(params)(feature)).toBe(1);
  });

  test('should return true if no filters present', () => {
    const params = { filters: {}, type: 'boolean' };
    const feature = makeFeatureWithValueInColumn();
    expect(buildFeatureFilter(params)(feature)).toBe(true);
  });

  describe('feature passes filter - boolean type', () => {
    const params = { filters, type: 'boolean' };

    describe('should return false if feature column value is falsy', () => {
      const columnValues = [0, null, undefined, false, ''];
      for (const value of columnValues) {
        test(`${value} - with geojson feature`, () => {
          const feature = makeFeatureWithValueInColumn(value);
          const withProps = buildFeatureFilter(params)(feature);
          expect(withProps).toBe(false);
        });
      }

      for (const value of columnValues) {
        test(`${value} - with geojson feature properties`, () => {
          const obj = makeObjectWithValueInColumn(value);
          const noProps = buildFeatureFilter(params)(obj);
          expect(noProps).toBe(false);
        });
      }
    });

    describe('should throw if filter function is not implemented', () => {
      const paramsWithFilterFunctionNotImplemented = {
        filters: {
          ...filters,
          column1: {
            pow: {}
          }
        },
        type: 'boolean'
      };

      test('with geojson feature', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const feature = makeFeatureWithValueInColumn();
        expect(() => filter(feature)).toThrow('"pow" not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const obj = makeObjectWithValueInColumn();
        expect(() => filter(obj)).toThrow('"pow" not implemented');
      });
    });

    describe('should return true if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(true);
    });

    describe('should return false if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(false);
    });
  });

  describe('feature passes filter - number type', () => {
    const params = { filters, type: 'number' };

    describe('should return 0 if feature column value is falsy', () => {
      const columnValues = [0, null, undefined, false, ''];
      for (const value of columnValues) {
        test(`${value} - with geojson feature`, () => {
          const feature = makeFeatureWithValueInColumn(value);
          const isFeatureIncluded = buildFeatureFilter(params)(feature);
          expect(isFeatureIncluded).toBe(0);
        });
      }

      for (const value of columnValues) {
        test(`${value} - with geojson feature properties`, () => {
          const obj = makeObjectWithValueInColumn(value);
          const isFeatureIncluded = buildFeatureFilter(params)(obj);
          expect(isFeatureIncluded).toBe(0);
        });
      }
    });

    describe('should throw if filter function is not implemented', () => {
      const paramsWithFilterFunctionNotImplemented = {
        filters: {
          ...filters,
          column1: {
            pow: {}
          }
        },
        type: 'number'
      };

      test('with geojson feature', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const feature = makeFeatureWithValueInColumn();
        expect(() => filter(feature)).toThrow('"pow" not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const obj = makeObjectWithValueInColumn();
        expect(() => filter(obj)).toThrow('"pow" not implemented');
      });
    });

    describe('should return 1 if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(1);
    });

    describe('should return 0 if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(0);
    });
  });
});
