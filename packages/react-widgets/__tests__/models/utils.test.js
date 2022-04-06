import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import {
  formatTableNameWithFilters,
  wrapModelCall,
  formatOperationColumn
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
    test('should work correctly', () => {
      const props = { source: V2_SOURCE, global: false };
      wrapModelCall(props, fromLocal, fromRemote);
      expect(fromLocal).toHaveBeenCalledWith(props);

      const props2 = { source: V3_SOURCE, global: true };
      wrapModelCall(props2, fromLocal, fromRemote);
      expect(fromRemote).toHaveBeenCalledWith(props2);
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

      expect(query).toBe(`(${source.data.replace(';', '')})`);
    });

    test('should format table sources correctly', () => {
      const query = formatTableNameWithFilters({ source: V3_SOURCE });

      expect(query).toBe(V3_SOURCE.data);
    });

    test('should format source with filters correctly', () => {
      const query = formatTableNameWithFilters({ source: SOURCE_WITH_FILTES });

      const whereClause = _filtersToSQL(SOURCE_WITH_FILTES.filters);

      expect(query).toBe(`${V3_SOURCE.data} ${whereClause}`);
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
