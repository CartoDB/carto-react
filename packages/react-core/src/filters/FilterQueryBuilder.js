export const FilterTypes = Object.freeze({
  IN: 'in',
  BETWEEN: 'between', // [a, b] both are included
  CLOSED_OPEN: 'closed_open', // [a, b) a is included, b is not
  TIME: 'time'
});

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

export const filtersToSQL = (filters = {}) => {
  const result = [];

  Object.entries(filters).forEach(([column, filter]) => {
    Object.entries(filter).forEach(([operator, params]) => {
      switch (operator) {
        case FilterTypes.IN:
          result.push(
            `${column} ${operator}(${params.values.map((v) => `'${v}'`).join(',')})`
          );
          break;
        case FilterTypes.BETWEEN:
          result.push(
            `(${params.values
              .map(
                ([left, right]) =>
                  `${left ? `${column} >= ${left}` : ``} ${
                    left && right ? ' and ' : ''
                  } ${right ? `${column} < ${right}` : ``}`
              )
              .join(') OR (')})`
          );
          break;
        default:
          throw new Error(`Not valid operator has provided: ${operator}`);
      }
    });
  });

  return result.length ? `WHERE (${result.join(') AND (')})` : '';
};
