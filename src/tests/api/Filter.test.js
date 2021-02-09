import { applyFilter } from 'src/api';
import { filters } from './data-mocks/filters';

const makePossibleFeature = (value) => [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    properties: {
      column1: value
    }
  },
  {
    column1: value
  }
];

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

    describe('should return false if feature column value is falsy', () => {
      const testCases = [0, null, undefined, false, ''];
      for (const tc of testCases) {
        test(String(tc), () => {
          const [featureWithProperties, rawFeature] = makePossibleFeature(tc);
          const withProps = applyFilter(params)(featureWithProperties);
          expect(withProps).toBe(false);
          const noProps = applyFilter(params)(rawFeature);
          expect(noProps).toBe(false);
        });
      }
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
      expect(() => func(makePossibleFeature(1)[0])).toThrow('"pow" not implemented');
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

    describe('should return 0 if feature column value is falsy', () => {
      const testCases = [0, null, undefined, false, ''];
      for (const tc of testCases) {
        test(String(tc), () => {
          const [featureWithProperties, rawFeature] = makePossibleFeature(tc);
          const withProps = applyFilter(params)(featureWithProperties);
          expect(withProps).toBe(0);
          const noProps = applyFilter(params)(rawFeature);
          expect(noProps).toBe(0);
        });
      }
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
      expect(() => func(makePossibleFeature(1)[0])).toThrow('"pow" not implemented');
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
