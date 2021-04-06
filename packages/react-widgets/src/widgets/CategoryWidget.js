import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, CategoryWidgetUI } from '@carto/react-ui';
import {
  _FilterTypes as FilterTypes,
  _getApplicableFilters as getApplicableFilters,
  AggregationTypes
} from '@carto/react-core';
import { getCategories } from '../models';
import useWidgetLoadingState from './useWidgetLoadingState';

/**
 * Renders a <CategoryWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {formatterCallback} [props.formatter] - Function to format each value returned.
 * @param  {Object} [props.labels] - Overwrite category labels
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function CategoryWidget(props) {
  const {
    id,
    title,
    dataSource,
    column,
    operationColumn,
    operation,
    formatter,
    labels,
    onError,
    wrapperProps
  } = props;
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});
  const viewportFeaturesReady = useSelector((state) => state.carto.viewportFeaturesReady);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(id);
  const { data, filters } = source;

  useEffect(() => {
    if (data && hasLoadingState) {
      const _filters = getApplicableFilters(filters, id);
      getCategories({
        data,
        column,
        operationColumn,
        operation,
        filters: _filters,
        dataSource
      })
        .then((data) => setCategoryData(data))
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (onError) onError(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setCategoryData(null);
    }
  }, [
    id,
    data,
    column,
    operationColumn,
    operation,
    filters,
    dataSource,
    viewportFeaturesReady,
    setIsLoading,
    hasLoadingState,
    onError
  ]);

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      setSelectedCategories(categories);

      if (categories && categories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.IN,
            values: categories,
            owner: id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column
          })
        );
      }
    },
    [column, dataSource, id, setSelectedCategories, dispatch]
  );

  return (
    <WrapperWidgetUI title={title} isLoading={widgetsLoadingState[id]} {...wrapperProps}>
      <CategoryWidgetUI
        data={categoryData}
        formatter={formatter}
        labels={labels}
        isLoading={widgetsLoadingState[id]}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}

CategoryWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.string,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  labels: PropTypes.object,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

CategoryWidget.defaultProps = {
  labels: {},
  wrapperProps: {}
};

export default CategoryWidget;
