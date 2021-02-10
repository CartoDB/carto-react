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

const makeFeatureWithValueInColum = (value, column = 'column1') => [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    properties: {
      [column]: value
    }
  },
  {
    [column]: value
  }
];

describe('Filters', () => {
  test('should return 1 if no filters present', () => {
    const params = { filters: {}, type: 'number' };
    expect(buildFeatureFilter(params)()).toBe(1);
  });

  test('should return true if no filters present', () => {
    const params = { filters: {}, type: 'boolean' };
    expect(buildFeatureFilter(params)()).toBe(true);
  });

  describe('feature passes filter - boolean type', () => {
    const params = { filters, type: 'boolean' };

    describe('should return false if feature column value is falsy', () => {
      const columnValues = [0, null, undefined, false, ''];
      for (const tc of columnValues) {
        test(`${tc} - with geojson feature`, () => {
          const [geojsonFeature] = makeFeatureWithValueInColum(tc);
          const withProps = buildFeatureFilter(params)(geojsonFeature);
          expect(withProps).toBe(false);
        });
      }

      for (const tc of columnValues) {
        test(`${tc} - with geojson feature properties`, () => {
          const [_, propertiesObject] = makeFeatureWithValueInColum(tc);
          const noProps = buildFeatureFilter(params)(propertiesObject);
          expect(noProps).toBe(false);
        });
      }
    });

    describe('should throw if filter function is not implemented', () => {
      const [geojsonFeature, propertiesObject] = makeFeatureWithValueInColum(1);
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
        expect(() => filter(geojsonFeature)).toThrow('"pow" not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        expect(() => filter(propertiesObject)).toThrow('"pow" not implemented');
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
      for (const tc of columnValues) {
        test(`${tc} - with geojson feature`, () => {
          const [geojsonFeature] = makeFeatureWithValueInColum(tc);
          const withProps = buildFeatureFilter(params)(geojsonFeature);
          expect(withProps).toBe(0);
        });
      }

      for (const tc of columnValues) {
        test(`${tc} - with geojson feature properties`, () => {
          const [, propertiesObject] = makeFeatureWithValueInColum(tc);
          const noProps = buildFeatureFilter(params)(propertiesObject);
          expect(noProps).toBe(0);
        });
      }
    });

    describe('should throw if filter function is not implemented', () => {
      const [geojsonFeature, propertiesObject] = makeFeatureWithValueInColum(1);
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
        expect(() => filter(geojsonFeature)).toThrow('"pow" not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        expect(() => filter(propertiesObject)).toThrow('"pow" not implemented');
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
