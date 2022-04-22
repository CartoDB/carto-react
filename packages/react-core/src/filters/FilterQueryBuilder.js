import { FiltersLogicalOperators } from '../operations/constants/FiltersLogicalOperators';
import { FilterTypes } from './FilterTypes';

export const getApplicableFilters = (filters = {}, owner) => {
  const filtersCopy = {};
  Object.entries(filters).forEach(([column, filter]) => {
    const filterCopy = {};
    Object.keys(filter)
      .filter((operator) => filter[operator].owner !== owner)
      .forEach((operator) => (filterCopy[operator] = { ...filter[operator] }));

    if (Object.keys(filterCopy).length) {
      filtersCopy[column] = filterCopy;
    }
  });

  return filtersCopy;
};

// Filters to SQL

const filterFunctions = {
  [FilterTypes.IN](column, filterValues) {
    const formattedValues = filterValues.map((v) => (isFinite(v) ? v : `'${v}'`));
    return `${column} in(${formattedValues})`;
  },
  [FilterTypes.BETWEEN](column, filterValues) {
    const queryFilters = filterValues.map(
      ([left, right]) =>
        `${left ? `${column} >= ${left}` : ``} ${left && right ? ' and ' : ''} ${
          right ? `${column} <= ${right}` : ``
        }`
    );

    return joinFilters(queryFilters);
  },
  [FilterTypes.TIME](column, filterValues) {
    const formattedValues = filterValues.map((values) => [
      `cast('${new Date(values[0]).toISOString()}' as timestamp)`,
      `cast('${new Date(values[1]).toISOString()}' as timestamp)`
    ]);
    const tsColumn = `cast(${column} as timestamp)`;
    const queryFilters = formattedValues.map(
      ([left, right]) =>
        `${left ? `${tsColumn} >= ${left}` : ``} ${left && right ? ' and ' : ''} ${
          right ? `${tsColumn} <= ${right}` : ``
        }`
    );

    return joinFilters(queryFilters);
  },
  [FilterTypes.CLOSED_OPEN](column, filterValues) {
    const queryFilters = filterValues.map(
      ([left, right]) =>
        `${left ? `${column} >= ${left}` : ``} ${left && right ? ' and ' : ''} ${
          right ? `${column} < ${right}` : ``
        }`
    );

    return joinFilters(queryFilters);
  }
};

export const filtersToSQL = (
  filters = {},
  filtersLogicalOperator = FiltersLogicalOperators.AND
) => {
  const result = [];

  Object.entries(filters).forEach(([column, filters]) => {
    Object.entries(filters).forEach(([operator, filter]) => {
      const filterFn = filterFunctions[operator];
      if (!filterFn) throw new Error(`Filter ${operator} is not defined.`);
      result.push(filterFn(column, filter.values, filter.params));
    });
  });

  return result.length ? `WHERE ${joinFilters(result, filtersLogicalOperator)}` : '';
};

// Aux
function joinFilters(queryFilters, operator = FiltersLogicalOperators.OR) {
  return queryFilters.map((queryFilter) => `(${queryFilter})`).join(` ${operator} `);
}
