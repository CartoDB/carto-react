import { firstBy } from 'thenby';

/**
 * Apply sort structure to a collection of features
 * @param {array} features
 * @param {object} [sortOptions]
 * @param {string | string[] | object[]} [sortOptions.sortBy] - One or more columns to sort by
 * @param {string} [sortOptions.sortByDirection] - Direction by the columns will be sorted
 */
export function applySorting(features, { sortBy, sortByDirection = 'asc' } = {}) {
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
    sortByDirection
  });

  return features.sort(sortFn);
}

// Aux
function createSortFn({ sortBy, sortByDirection }) {
  const [firstSortOption, ...othersSortOptions] = normalizeSortByOptions({
    sortBy,
    sortByDirection
  });

  let sortFn = firstBy(...firstSortOption);
  for (let sortOptions of othersSortOptions) {
    sortFn = sortFn.thenBy(...sortOptions);
  }

  return sortFn;
}

function normalizeSortByOptions({ sortBy, sortByDirection }) {
  if (!Array.isArray(sortBy)) {
    sortBy = [sortBy];
  }

  return sortBy.map((sortByEl) => {
    // sortByEl is 'column'
    if (typeof sortByEl === 'string') {
      return [sortByEl, sortByDirection];
    }

    if (Array.isArray(sortByEl)) {
      // sortBy is ['column']
      if (sortByEl[1] === undefined) {
        return [sortByEl, sortByDirection];
      }

      // sortBy is ['column', { ... }]
      if (typeof sortByEl[1] === 'object') {
        return [sortByEl[0], { direction: sortByDirection, ...sortByEl[1] }];
      }
    }
    return sortByEl;
  });
}
