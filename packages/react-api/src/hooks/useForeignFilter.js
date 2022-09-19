import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Methods, executeTask } from '@carto/react-workers';
import {
  addFilter,
  removeFilter,
  selectSourceById,
  selectAreFeaturesReadyForSource
} from '@carto/react-redux';
import { _FilterTypes as FilterTypes } from '@carto/react-core';

function isEmptyObject(value) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

export default function useForeignFilter(source) {
  const dispatch = useDispatch();

  const sourceId = source?.id;
  const { foreignSourceId, foreignColumn, column } = source?.foreignFilteringSource || {};

  const foreignSource = useSelector((state) => selectSourceById(state, foreignSourceId));
  const isForeignSourceReady = useSelector((state) =>
    selectAreFeaturesReadyForSource(state, foreignSourceId)
  );

  useEffect(() => {
    if (!sourceId || !isForeignSourceReady || !foreignSource?.filters) {
      return;
    }

    // Remove the filter in case of no condition, to avoid filtering uselessly on all values
    if (!foreignSource.filters || isEmptyObject(foreignSource)) {
      // @TODO: check if we can falsely remove a filter not added through datasource link
      dispatch(
        removeFilter({
          id: sourceId,
          column: column
        })
      );
      return;
    }

    // @TODO: debounce?
    executeTask(foreignSource.id, Methods.FILTERED_FEATURES_VALUES, {
      filters: foreignSource.filters,
      filtersLogicalOperator: foreignSource.filtersLogicalOperator,
      column: foreignColumn
    })
      .then((values = []) => {
        dispatch(
          addFilter({
            id: sourceId,
            column: column,
            type: FilterTypes.IN,
            values,
            owner: foreignSource.id
          })
        );
      })
      .catch(console.error);
  }, [dispatch, sourceId, column, foreignSource, foreignColumn, isForeignSourceReady]);
}
