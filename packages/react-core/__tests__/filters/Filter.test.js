import { buildBinaryFeatureFilter, buildFeatureFilter } from '../../src/filters/Filter';
import { POINTS_BINARY_DATA, POLYGONS_BINARY_DATA } from './constants';

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
  },
  column3: {
    time: {
      owner: 'widgetId3',
      values: [[0, 1]]
    }
  },
  column4: {
    stringSearch: {
      owner: 'widgetId4',
      values: ['Álcàlâ dë Guadaíra']
    }
  },
  column5: {
    stringSearch: {
      owner: 'widgetId5',
      values: [12345]
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
        expect(() => filter(feature)).toThrow('"pow" filter is not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const obj = makeObjectWithValueInColumn();
        expect(() => filter(obj)).toThrow('"pow" filter is not implemented');
      });
    });

    describe('should return true if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5,
          column3: 1,
          column4: 'Alcalá de Guadaíra',
          column5: 123456
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(true);
    });

    describe('should return false if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3,
          column3: '1999',
          column4: 'test',
          column5: 0
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(false);
    });
  });

  describe('feature passes filter - number type', () => {
    const params = { filters, type: 'number' };

    describe('should return 0 if feature column value is null or undefined', () => {
      const nullOrUndefinedAreNotValid = {
        filters: {
          column1: { between: { owner: 'widgetId1', values: [[-1, 1]] } }
        },
        type: 'number'
      };

      const notIncludedFeatures = [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
          properties: { column1: null }
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
          properties: { column1: undefined }
        }
      ];

      for (const feature of notIncludedFeatures) {
        test(`${feature.column1} - with geojson feature`, () => {
          const isFeatureIncluded = buildFeatureFilter(nullOrUndefinedAreNotValid)(
            feature
          );
          expect(isFeatureIncluded).toBe(0);
        });
      }

      const notIncludedObjects = [{ column1: null }, { column1: undefined }];
      for (const obj of notIncludedObjects) {
        test(`${obj.column1} - with geojson feature properties`, () => {
          const isFeatureIncluded = buildFeatureFilter(nullOrUndefinedAreNotValid)(obj);
          expect(isFeatureIncluded).toBe(0);
        });
      }
    });

    describe('should return 1 if feature column value has a legit 0', () => {
      const zeroIsValidForThisFilter = {
        filters: {
          column1: { between: { owner: 'widgetId1', values: [[-1, 1]] } }
        },
        type: 'number'
      };

      test(`ZERO - with geojson feature`, () => {
        const feature = makeFeatureWithValueInColumn(0);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(feature);
        expect(isFeatureIncluded).toBe(1);
      });

      test(`ZERO - with geojson feature properties`, () => {
        const obj = makeObjectWithValueInColumn(0);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(obj);
        expect(isFeatureIncluded).toBe(1);
      });
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
        expect(() => filter(feature)).toThrow('"pow" filter is not implemented');
      });

      test('with geojson feature properties', () => {
        const filter = buildFeatureFilter(paramsWithFilterFunctionNotImplemented);
        const obj = makeObjectWithValueInColumn();
        expect(() => filter(obj)).toThrow('"pow" filter is not implemented');
      });
    });

    describe('should return 1 if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5,
          column3: '1970',
          column4: 'Alcalá de Guadaíra',
          column5: 123456
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(1);
    });

    describe('should return 0 if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3,
          column3: -1,
          column4: 'test',
          column5: 0
        }
      };
      const featureIsIncluded = buildFeatureFilter(params)(feature);
      expect(featureIsIncluded).toBe(0);
    });

    describe('should manage number filters using ClosedOpen interval checks', () => {
      const zeroIsValidForThisFilter = {
        filters: {
          column1: { closed_open: { owner: 'widgetId1', values: [[10, 20]] } }
        },
        type: 'number'
      };

      test(`left endpoint is ALWAYS included - with geojson feature`, () => {
        const feature = makeFeatureWithValueInColumn(10);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(feature);
        expect(isFeatureIncluded).toBe(1);
      });

      test(`rigth endpoint is NEVER included - with geojson feature`, () => {
        const feature = makeFeatureWithValueInColumn(20);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(feature);
        expect(isFeatureIncluded).toBe(0);
      });

      test(`left endpoint is ALWAYS included - with geojson feature properties`, () => {
        const obj = makeObjectWithValueInColumn(10);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(obj);
        expect(isFeatureIncluded).toBe(1);
      });

      test(`rigth endpoint is NEVER included - with geojson feature properties`, () => {
        const obj = makeObjectWithValueInColumn(20);
        const isFeatureIncluded = buildFeatureFilter(zeroIsValidForThisFilter)(obj);
        expect(isFeatureIncluded).toBe(0);
      });
    });
  });

  describe('using binary data', () => {
    test('should filter points binary data', () => {
      const filterForBinaryData = {
        state: {
          in: {
            values: ['AK']
          }
        }
      };
      const filterFn = buildBinaryFeatureFilter({ filters: filterForBinaryData });

      const filterRes = POINTS_BINARY_DATA.featureIds.value.map((_, idx) =>
        filterFn(idx, POINTS_BINARY_DATA)
      );

      expect(filterRes[0]).toBe(1);
      expect(filterRes[filterRes.length - 1]).toBe(0);
    });

    test('should filter polygons/lines binary data', () => {
      const filterForBinaryData = {
        cartodb_id: {
          in: {
            values: [78]
          }
        }
      };

      const filterFn = buildBinaryFeatureFilter({ filters: filterForBinaryData });

      const filterRes = POLYGONS_BINARY_DATA.featureIds.value.map((_, idx) =>
        filterFn(idx, POLYGONS_BINARY_DATA)
      );

      expect(filterRes[0]).toBe(1);
      expect(filterRes[filterRes.length - 1]).toBe(0);
    });

    test('should throw error when filter is unknown', () => {
      const filterForBinaryData = {
        cartodb_id: {
          pow: {
            values: [1]
          }
        }
      };

      const filterFn = buildBinaryFeatureFilter({ filters: filterForBinaryData });

      expect(() => filterFn(0, POLYGONS_BINARY_DATA)).toThrow(
        '"pow" filter is not implemented'
      );
    });

    test('should returns always 0 when values is nullish', () => {
      const filterForBinaryData = {
        cartodb_id: {
          in: {
            values: null
          }
        }
      };

      const filterFn = buildBinaryFeatureFilter({ filters: filterForBinaryData });

      const filterRes = POLYGONS_BINARY_DATA.featureIds.value.map((_, idx) =>
        filterFn(idx, POLYGONS_BINARY_DATA)
      );

      expect(filterRes.every((el) => el === 0)).toBe(true);
    });
  });
});
