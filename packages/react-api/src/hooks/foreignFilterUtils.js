import { _FilterTypes as FilterTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

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
