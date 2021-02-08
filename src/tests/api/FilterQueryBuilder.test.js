import { getApplicableFilters, filtersToSQL } from 'src/api/FilterQueryBuilder';
import { filters } from './data-mocks/filters';

describe('Get applicable filters', () => {
  test('should return an empty object if no filters present', () => {
    expect(getApplicableFilters({ filters: {} })).toEqual({});
  });

  test('should return an applicable filter', () => {
    const owner1 = 'widgetId1';
    const owner2 = 'widgetId2';
    expect(getApplicableFilters(filters, owner1)).toEqual({
      column2: { ...filters['column2'] }
    });
    expect(getApplicableFilters(filters, owner2)).toEqual({
      column1: { ...filters['column1'] }
    });
  });
});

describe('Filters to SQL', () => {
  test('should return an empty string if no operator is present', () => {
    expect(filtersToSQL({})).toEqual('');
  });

  test('should return a SQL WHERE clause', () => {
    expect(filtersToSQL(filters)).toEqual(
      "WHERE (column1 in('a','b','c')) AND ((column2 >= 1  and  column2 < 2))"
    );
  });

  test('should throw if a non-valid operator was provided', () => {
    const param = {
      ...filters,
      column3: {
        pow: {}
      }
    };
    expect(() => filtersToSQL(param)).toThrow(`Not valid operator has provided: pow`);
  });
});
