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
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.formatter] - Function to format the value that appears in the tooltip.
 * @param  {Function} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {string} props.height - Height of the chart
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
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
  onError,
  wrapperProps
}) {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});
  const viewportFeaturesReady = useSelector((state) => state.carto.viewportFeaturesReady);

  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const [isLoading, setIsLoading] = useWidgetLoadingState(id);
  const { data, credentials, type } = source;

  useEffect(() => {
    const abortController = new AbortController();
    if (data && credentials && isLoading) {
      const filters = getApplicableFilters(source.filters, id);
      getCategories({
        column,
        operation,
        operationColumn,
        data,
        filters,
        credentials,
        viewportFeatures: viewportFeaturesReady[dataSource] || false,
        dataSource,
        type,
        opts: { abortController }
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setCategoryData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.name === 'AbortError') return;
          if (onError) onError(error);
        });
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
    viewportFeaturesReady,
    column,
    operation,
    operationColumn,
    dispatch,
    id,
    onError,
    isLoading
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
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

PieWidget.defaultProps = {
  wrapperProps: {}
};

export default PieWidget;
