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

export async function getForeignFilter(column, foreignColumn, foreignSource) {
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

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function isNilOrEmpty(obj) {
  return (
    !obj ||
    (Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)
  );
}

// For global widgets, sets proper filter expression for back-end filtering from foreign source
export function assignBackEndFilters(source, foreignSource) {
  const { column, foreignColumn } = source.foreignFilteringSource;

  const backEndFilters = deepClone(source.filters);
  if (backEndFilters?.[column]?.[FilterTypes.FOREIGN_IN]) {
    delete backEndFilters[column][FilterTypes.FOREIGN_IN];

    if (!isNilOrEmpty(foreignSource.filters)) {
      backEndFilters[column]['in_foreign_key_filter'] = {
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
      };
    } else if (isNilOrEmpty(backEndFilters[column])) {
      // if there is no more filters on the column, we have to completely remove the entry in the filter object
      // otherwise it's considered invalid by the API
      delete backEndFilters[column];
    }
  }

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
    return {};
  }

  return {
    foreignSource,
    foreignColumn: foreignFilteringSource.foreignColumn,
    foreignFilterSelfColumn: foreignFilteringSource.column,
    isForeignSourceReady: selectAreFeaturesReadyForSource(state, foreignSource.id)
  };
}
