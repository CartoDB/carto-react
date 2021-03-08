import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, PieWidgetUI } from '../ui';
import { FilterTypes, getApplicableFilters } from '../api/FilterQueryBuilder';
import { getCategories } from './models';
import { AggregationTypes } from './AggregationTypes';
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
 * @param  {boolean} [props.viewportFilter=true] - Defines whether filter by the viewport or globally.
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
  viewportFilter,
  onError,
  wrapperProps
}) {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});
  const viewportFeatures = useSelector((state) => state.carto.viewportFeatures);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const globalDataFetched = useRef(false);
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(id, viewportFilter);
  const { data, credentials, type } = source;

  useEffect(() => {
    if (!viewportFilter) {
      setIsLoading(true);
      globalDataFetched.current = false;
    }
  }, [viewportFilter, setIsLoading]);

  useEffect(() => {
    if (!viewportFilter && globalDataFetched.current && widgetsLoadingState[id]) {
      setIsLoading(false);
    }
  }, [viewportFilter, id, widgetsLoadingState, setIsLoading]);

  useEffect(() => {
    const abortController = new AbortController();
    if (data && credentials && hasLoadingState) {
      const filters = getApplicableFilters(source.filters, id);
      if ((!viewportFilter && !globalDataFetched.current) || viewportFilter) {
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
          .finally(() => {
            setIsLoading(false);
            if (!viewportFilter) globalDataFetched.current = true;
          });
      }
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

  const shouldDisplayLoading = useCallback(() => {
    if (viewportFilter) {
      return widgetsLoadingState[id];
    }

    return !globalDataFetched.current;
  }, [viewportFilter, id, widgetsLoadingState]);

  return (
    <WrapperWidgetUI title={title} isLoading={shouldDisplayLoading()} {...wrapperProps}>
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
  viewportFilter: true,
  wrapperProps: {}
};

export default PieWidget;
