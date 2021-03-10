import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, PieWidgetUI } from '@carto/react-ui';
import { 
  _FilterTypes as FilterTypes, 
  _getApplicableFilters as getApplicableFilters,
  AggregationTypes
} from '@carto/react-core';
import { getCategories } from '../models';
import useWidgetLoadingState from './useWidgetLoadingState';

/**
 * Renders a <PieWidget /> component
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {formatterCallback} [props.formatter] - Function to format the value that appears in the tooltip.
 * @param  {formatterCallback} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {boolean} [props.viewportFilter=false] - Defines whether filter by the viewport or not.
 * @param  {string} props.height - Height of the chart
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function PieWidget({
  id,
  title,
  height,
  dataSource,
  column,
  operationColumn,
  operation,
  formatter,
  tooltipFormatter,
  viewportFilter = false,
  onError,
  wrapperProps
}) {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});
  const viewportFeatures = useSelector((state) => state.carto.viewportFeatures);

  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(id, viewportFilter);
  const { data, credentials, type } = source;

  useEffect(() => {
    const abortController = new AbortController();
    if (data && credentials && hasLoadingState) {
      const filters = getApplicableFilters(source.filters, id);
      !viewportFilter && setIsLoading(true);
      getCategories({
        column,
        operation,
        operationColumn,
        data,
        filters,
        credentials,
        viewportFilter,
        viewportFeatures: viewportFeatures[dataSource] || [],
        type,
        opts: { abortController }
      })
        .then((data) => setCategoryData(data))
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (onError) onError(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setCategoryData([]);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    credentials,
    dataSource,
    data,
    setIsLoading,
    source.filters,
    type,
    viewportFeatures,
    column,
    operation,
    operationColumn,
    dispatch,
    id,
    onError,
    hasLoadingState,
    viewportFilter
  ]);

  const handleSelectedCategoriesChange = useCallback((categories) => {
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
  }, [column, dataSource, id, setSelectedCategories, dispatch]);

  return (
    <WrapperWidgetUI
      title={title}
      isLoading={widgetsLoadingState[id]}
      {...wrapperProps}
    >
      <PieWidgetUI
        data={categoryData}
        formatter={formatter}
        height={height}
        tooltipFormatter={tooltipFormatter}
        isLoading={widgetsLoadingState[id]}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}

PieWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.string,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func
};

PieWidget.defaultProps = {
  viewportFilter: false,
  wrapperProps: {}
};

export default PieWidget;
