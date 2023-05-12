import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import {
  formatTableNameWithFilters,
  wrapModelCall,
  formatOperationColumn,
  normalizeObjectKeys
} from '../../src/models/utils';
import { AggregationTypes, _filtersToSQL } from '@carto/react-core';

const V2_SOURCE = {
  id: '__test__',
  type: MAP_TYPES.QUERY,
  data: 'SELECT * FROM test',
  credentials: {
    apiVersion: API_VERSIONS.V2
  }
};

const V3_SOURCE = {
  id: '__test__',
  type: MAP_TYPES.TABLE,
  data: '__test__',
  credentials: {
    apiVersion: API_VERSIONS.V3
  }
};

const SOURCE_WITH_FILTERS = {
  ...V3_SOURCE,
  filters: {
    column_1: {
      in: {
        values: ['value_1', 'value_2']
      }
    }
  }
};

const fromLocal = jest.fn();
const fromRemote = jest.fn();

describe('utils', () => {
  describe('wrapModelCall', () => {
    const cases = [
      // source, global, remoteCalculation, expectedFn
      [V2_SOURCE, false, false, fromLocal],
      [V3_SOURCE, false, false, fromLocal],
      [V3_SOURCE, true, false, fromRemote],
      [V2_SOURCE, false, true, fromLocal],
      [V3_SOURCE, false, true, fromRemote],
      [V3_SOURCE, true, true, fromRemote]
    ];

    test.each(cases)(
      'should work correctly',
      (source, global, remoteCalculation, expectedFn) => {
        const props = { source, global, remoteCalculation };
        wrapModelCall(props, fromLocal, fromRemote);
        expect(expectedFn).toHaveBeenCalledWith(props);
      }
    );

    test('should throw error if global is true but fromRemote is missing', () => {
      expect(() =>
        wrapModelCall({ source: V3_SOURCE, global: true }, fromLocal)
      ).toThrowError();
    });

    test('should throw error if remoteCalculation is true but fromRemote is missing', () => {
      expect(() =>
        wrapModelCall({ source: V3_SOURCE, remoteCalculation: true }, fromLocal)
      ).toThrowError();
    });

    test('should throw error if source v2 is provided for global mode', () => {
      expect(() =>
        wrapModelCall({ source: V2_SOURCE, global: true }, fromLocal, fromRemote)
      ).toThrowError();
    });

    test('should throw error if source type is tileset for global mode', () => {
      expect(() =>
        wrapModelCall(
          { source: { ...V3_SOURCE, type: MAP_TYPES.TILESET }, global: true },
          fromLocal,
          fromRemote
        )
      ).toThrowError();
    });
  });

  describe('formatTableNameWithFilters', () => {
    test('should format query sources correctly', () => {
      const source = {
        ...V3_SOURCE,
        type: MAP_TYPES.QUERY,
        data: 'SELECT * FROM test;'
      };
      const query = formatTableNameWithFilters({ source });

      expect(query).toBe(`(SELECT * FROM test) foo`);
    });

    test('should format table sources correctly', () => {
      const query = formatTableNameWithFilters({ source: V3_SOURCE });

      expect(query).toBe(V3_SOURCE.data);
    });

    test('should format source with filters correctly', () => {
      const query = formatTableNameWithFilters({ source: SOURCE_WITH_FILTERS });

      expect(query).toBe(
        `${SOURCE_WITH_FILTERS.data} WHERE (column_1 in('value_1','value_2'))`
      );
    });
  });

  describe('normalizeObjectKeys', () => {
    const tests = [
      // single objects
      { VALUE: 1 },
      { A: null, B: undefined, C: 'hello' },
      { A: { X: null }, B: { X: undefined }, C: 'hello' },
      // array of objects
      [{ TICK: 0, VALUE: 1 }],
      [{ TICK: [{ VALUE: 0 }], VALUE: 1 }],
      [{ A: null, B: undefined, C: 'hello' }],
      [{ A: { X: null }, B: { X: undefined }, C: 'hello' }]
    ];
    test.each(tests)('should work correctly for %p', (test) => {
      const normalized = normalizeObjectKeys(test);
      expect(JSON.stringify(normalized)).toEqual(JSON.stringify(test).toLowerCase());
    });
  });

  describe('formatOperationColumn', () => {
    test('should return the column is only one is provided', () => {
      const column = '__test__';

      expect(formatOperationColumn(column)).toBe(column);
      expect(formatOperationColumn([column])).toBe(column);
    });

    // My goal here isn't to test every operation,
    // just to check that the fn answers with the right params
    test('should return the correct operation', () => {
      const column = '__test__';
      const columns = [column, column];

      expect(formatOperationColumn(columns, AggregationTypes.MIN)).toBe(
        `LEAST(${columns.join()})`
      );
    });

    test('should throw error if operation is unknown', () => {
      const column = '__test__';
      const columns = [column, column];

      expect(() => formatOperationColumn(columns, '__unknown__')).toThrowError();
    });
  });
});
