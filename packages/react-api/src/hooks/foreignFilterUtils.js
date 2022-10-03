import { _FilterTypes as FilterTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { selectSourceById, selectAreFeaturesReadyForSource } from '@carto/react-redux';

async function getForeignFilterValues(foreignSource, foreignColumn) {
  const foreignFilterValues = await executeTask(
    foreignSource.id,
    Methods.FILTERED_FEATURES_VALUES,
    {
      filters: foreignSource.filters,
      filtersLogicalOperator: foreignSource.filtersLogicalOperator,
      column: foreignColumn
    }
  );
  return foreignFilterValues;
}

export async function getForeignFilter(source, foreignSource) {
  if (!source?.foreignFilteringSource || !foreignSource) {
    return null;
  }

  const { column, foreignColumn } = source.foreignFilteringSource;
  const foreignFilterValues = await getForeignFilterValues(foreignSource, foreignColumn);

  if (!foreignFilterValues) {
    return null;
  }

  return {
    type: FilterTypes.FOREIGN_IN,
    values: foreignFilterValues,
    column
  };
}

export function getBackEndForeignFilter(foreignColumn, foreignSource) {
  return {
    in_foreign_key_filter: {
      values: [
        {
          foreignSource: foreignSource.data,
          foreignSourceType: foreignSource.type,
          foreignColumn,
          foreignFilter: {
            filters: foreignSource.filters
          }
        }
      ]
    }
  };
}

// For global widgets, sets proper filter expression for back-end filtering from foreign source
export function assignBackEndFilters(source, foreignSource) {
  const { column, foreignColumn } = source.foreignFilteringSource;

  // This replaces the FilterTypes.FOREIGN_IN filter by the special filter type 'in_foreign_key_filter'
  // suitable for the API, while keeping all other filters that may exist on this source.
  // TODO: Maybe use a deep clone + direct set to simplify, instead of this complex double reduce
  const backEndFilters = Object.entries(source.filters).reduce(
    (acc, [filteredColumn, columnFilters]) => {
      const _columnFilters =
        filteredColumn !== column
          ? columnFilters
          : Object.entries(columnFilters).reduce((result, [filterType, filterParams]) => {
              if (filterType !== FilterTypes.FOREIGN_IN) {
                return { ...result, [filterType]: filterParams };
              }
              return {
                ...result,
                ...getBackEndForeignFilter(foreignColumn, foreignSource)
              };
            }, {});

      return {
        ...acc,
        [filteredColumn]: _columnFilters
      };
    },
    {}
  );

  return {
    ...source,
    filters: backEndFilters
  };
}

export function selectForeignFilterParams(state, source) {
  const foreignFilteringSource = source?.foreignFilteringSource;
  let foreignSource;

  if (foreignFilteringSource) {
    foreignSource = selectSourceById(state, foreignFilteringSource.foreignSourceId);
  }

  if (!foreignSource) {
    return { hasForeignFilter: false };
  }

  return {
    hasForeignFilter: true,
    foreignSource,
    foreignColumn: foreignFilteringSource.foreignColumn,
    column: foreignFilteringSource.column,
    isForeignSourceReady: selectAreFeaturesReadyForSource(state, foreignSource.id)
  };
}
