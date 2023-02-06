import { firstBy } from 'thenby';

/**
 * Apply sort structure to a collection of features
 * @param {array} features
 * @param {object} [sortOptions]
 * @param {string | string[] | object[]} [sortOptions.sortBy] - One or more columns to sort by
 * @param {string} [sortOptions.sortByDirection] - Direction by the columns will be sorted
 * @param {('number'|'string'|'date')} [sortOptions.sortByColumnType] - Column type
 */
export function applySorting(
  features,
  { sortBy, sortByDirection = 'asc', sortByColumnType = 'string' } = {}
) {
  // If sortBy is undefined, pass all features
  if (sortBy === undefined) {
    return features;
  }

  // sortOptions exists, but are bad formatted
  const isValidSortBy =
    (Array.isArray(sortBy) && sortBy.length) || // sortBy can be an array of columns
    typeof sortBy === 'string'; // or just one column

  if (!isValidSortBy) {
    throw new Error('Sorting options are bad formatted');
  }
  const sortFn = createSortFn({
    sortBy,
    sortByDirection,
    columnDataType: sortByColumnType
  });
  return features.sort(sortFn);
}

// Aux
function createSortFn({ sortBy, sortByDirection, columnDataType = 'string' }) {
  const [firstSortOption, ...othersSortOptions] = normalizeSortByOptions({
    sortBy,
    sortByDirection,
    columnDataType
  });

  let sortFn = firstBy(...firstSortOption);
  for (let sortOptions of othersSortOptions) {
    sortFn = sortFn.thenBy(...sortOptions);
  }

  return sortFn;
}

function normalizeSortByOptions({ sortBy, sortByDirection, columnDataType }) {
  const numberFormat = columnDataType === 'number' && { cmp: (a, b) => a - b };
  if (!Array.isArray(sortBy)) {
    sortBy = [sortBy];
  }
  return sortBy.map((sortByEl) => {
    // sortByEl is 'column'
    if (typeof sortByEl === 'string') {
      return [sortByEl, { direction: sortByDirection, ...numberFormat }];
    }

    if (Array.isArray(sortByEl)) {
      // sortBy is ['column']
      if (sortByEl[1] === undefined) {
        return [sortByEl, { direction: sortByDirection, ...numberFormat }];
      }

      // sortBy is ['column', { ... }]
      if (typeof sortByEl[1] === 'object') {
        const othersSortOptions = numberFormat
          ? { ...numberFormat, ...sortByEl[1] }
          : sortByEl[1];
        return [sortByEl[0], { direction: sortByDirection, ...othersSortOptions }];
      }
    }
    return sortByEl;
  });
}
