import { filtersToSQL, getApplicableFilters } from '../../src/filters/FilterQueryBuilder';

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
    const customFilters = {
      ...filters,
      // This third case is to test when IN operation has numeric values
      column3: {
        in: {
          owner: 'widgetId3',
          values: [1, 2, 3]
        }
      }
    };
    expect(filtersToSQL(customFilters)).toEqual(
      "WHERE (column1 in('a','b','c')) and ((column2 >= 1  and  column2 < 2)) and (column3 in(1,2,3))"
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
