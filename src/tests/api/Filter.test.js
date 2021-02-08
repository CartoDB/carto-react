import { applyFilter } from 'src/api';
import { filters } from './data-mocks/filters';

const makeFeature = (value) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  },
  properties: {
    column1: value
  }
});

describe('Filters', () => {
  test('should return 1 if no filters present', () => {
    const params = { filters: {}, type: 'number' };
    expect(applyFilter(params)()).toBe(1);
  });

  test('should return true if no filters present', () => {
    const params = { filters: {}, type: 'boolean' };
    expect(applyFilter(params)()).toBe(true);
  });

  describe('feature passes filter - boolean type', () => {
    const params = { filters, type: 'boolean' };

    test('should return false if feature is not present', () => {
      expect(applyFilter(params)()).toBe(false);
    });

    describe('should return false if feature column value is falsy', () => {
      test('0', () => {
        const func = applyFilter(params)(makeFeature(0));
        expect(func).toBe(false);
      });

      test('null', () => {
        const func = applyFilter(params)(makeFeature(null));
        expect(func).toBe(false);
      });

      test('undefined', () => {
        const func = applyFilter(params)(makeFeature(undefined));
        expect(func).toBe(false);
      });

      test('false', () => {
        const func = applyFilter(params)(makeFeature(false));
        expect(func).toBe(false);
      });

      test('empty string', () => {
        const func = applyFilter(params)(makeFeature(''));
        expect(func).toBe(false);
      });
    });

    test('should throw if filter function is not implemented', () => {
      const paramsWithFilterFunctionNotImplemented = {
        filters: {
          ...filters,
          column1: {
            pow: {}
          }
        },
        type: 'boolean'
      };
      const func = applyFilter(paramsWithFilterFunctionNotImplemented);
      expect(() => func(makeFeature(1))).toThrow('"pow" not implemented');
    });

    describe('should return true if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5
        }
      };
      const func = applyFilter(params)(feature);
      expect(func).toBe(true);
    });

    describe('should return false if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3
        }
      };
      const func = applyFilter(params)(feature);
      expect(func).toBe(false);
    });
  });

  describe('feature passes filter - number type', () => {
    const params = { filters, type: 'number' };

    test('should return 0 if feature is not present', () => {
      expect(applyFilter(params)()).toBe(0);
    });

    describe('should return 0 if feature column value is falsy', () => {
      test('0', () => {
        const func = applyFilter(params)(makeFeature(0));
        expect(func).toBe(0);
      });

      test('null', () => {
        const func = applyFilter(params)(makeFeature(null));
        expect(func).toBe(0);
      });

      test('undefined', () => {
        const func = applyFilter(params)(makeFeature(undefined));
        expect(func).toBe(0);
      });

      test('false', () => {
        const func = applyFilter(params)(makeFeature(false));
        expect(func).toBe(0);
      });

      test('empty string', () => {
        const func = applyFilter(params)(makeFeature(''));
        expect(func).toBe(0);
      });
    });

    test('should throw if filter function is not implemented', () => {
      const paramsWithFilterFunctionNotImplemented = {
        filters: {
          ...filters,
          column1: {
            pow: {}
          }
        },
        type: 'number'
      };
      const func = applyFilter(paramsWithFilterFunctionNotImplemented);
      expect(() => func(makeFeature(1))).toThrow('"pow" not implemented');
    });

    describe('should return 1 if feature passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 1.5
        }
      };
      const func = applyFilter(params)(feature);
      expect(func).toBe(1);
    });

    describe('should return 0 if feature not passes filter', () => {
      const feature = {
        properties: {
          column1: 'a',
          column2: 3
        }
      };
      const func = applyFilter(params)(feature);
      expect(func).toBe(0);
    });
  });
});
