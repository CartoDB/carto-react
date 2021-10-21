import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { WrapperWidgetUI, PieWidgetUI, NoDataAlert } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getCategories } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';
import { selectIsViewportFeaturesReadyForSource } from '@carto/react-redux/';

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
 * @param  {object} props.labels - Object that maps category name with a chosen label
 * @param  {string} props.height - Height of the chart
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
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
  labels,
  animation,
  colors,
  onError,
  wrapperProps,
  noDataAlertProps
}) {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSourceReady = useSelector((state) =>
    selectIsViewportFeaturesReadyForSource(state, dataSource)
  );
  const filters = useSourceFilters({ dataSource, id });

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      getCategories({
        column,
        operation,
        operationColumn,
        filters,
        dataSource
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setCategoryData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (onError) onError(error);
        });
    }
  }, [
    id,
    column,
    operationColumn,
    operation,
    filters,
    dataSource,
    setIsLoading,
    onError,
    isSourceReady
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
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      {categoryData.length || isLoading ? (
        <PieWidgetUI
          data={categoryData}
          formatter={formatter}
          height={height}
          tooltipFormatter={tooltipFormatter}
          colors={colors}
          labels={labels}
          animation={animation}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
        />
      ) : (
        <NoDataAlert {...noDataAlertProps} />
      )}
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
  labels: PropTypes.object,
  animation: PropTypes.bool,
  onError: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.string),
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object
};

PieWidget.defaultProps = {
  animation: true,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default PieWidget;
