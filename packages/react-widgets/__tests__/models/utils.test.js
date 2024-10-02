import {
  sourceAndFiltersToSQL,
  wrapModelCall,
  formatOperationColumn,
  normalizeObjectKeys,
  isRemoteCalculationSupported
} from '../../src/models/utils';
import { AggregationTypes, Provider, _filtersToSQL } from '@carto/react-core';
import { MAP_TYPES, API_VERSIONS } from '@carto/react-api';

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
  },
  provider: Provider.BigQuery
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
  describe('isRemoteCalculationSupported', () => {
    test.each([
      ['v2', V2_SOURCE, false],
      ['v3', V3_SOURCE, true],
      ['v3', { ...V3_SOURCE, type: 'tileset' }, false],
      ['v3/databricks', { ...V3_SOURCE, provider: 'databricks' }, false],
      ['v3/databricksRest', { ...V3_SOURCE, provider: 'databricksRest' }, true],
      ['v3/h3/no dataResolution', { ...V3_SOURCE, geoColumn: 'h3' }, false],
      [
        'v3/h3/with dataResolution',
        { ...V3_SOURCE, geoColumn: 'h3', dataResolution: 5 },
        true
      ],
      [
        'v3/h3-frompoint/without dataResolution',
        { ...V3_SOURCE, geoColumn: 'h3:geom', spatialDataType: 'geo' },
        true
      ],
      [
        'v3/quadbin-frompoint/without dataResolution',
        { ...V3_SOURCE, geoColumn: 'quadbin:geom', spatialDataType: 'geo' },
        true
      ],
      [
        'v3/quadbin/with dataResolution',
        { ...V3_SOURCE, geoColumn: 'quadbin:abc', spatialFiltersResolution: 5 },
        true
      ]
    ])('works correctly for %s', (_, source, expected) => {
      expect(isRemoteCalculationSupported({ source })).toEqual(expected);
    });
  });
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

  describe('sourceAndFiltersToSQL', () => {
    test('should format query sources correctly', () => {
      const source = {
        ...V3_SOURCE,
        type: MAP_TYPES.QUERY,
        data: 'SELECT * FROM test;'
      };
      const query = sourceAndFiltersToSQL(source);

      expect(query).toBe(`SELECT * FROM (SELECT * FROM test) __source_query `);
    });

    test('should format table sources correctly', () => {
      const query = sourceAndFiltersToSQL(V3_SOURCE);

      expect(query).toBe(`SELECT * FROM \`${V3_SOURCE.data}\` `);
    });

    test('should format source with filters correctly', () => {
      const query = sourceAndFiltersToSQL(SOURCE_WITH_FILTERS);

      expect(query).toBe(
        `SELECT * FROM \`${SOURCE_WITH_FILTERS.data}\` WHERE (column_1 in('value_1','value_2'))`
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
