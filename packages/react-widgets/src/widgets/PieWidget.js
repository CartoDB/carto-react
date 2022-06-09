import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { WrapperWidgetUI, PieWidgetUI } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getCategories } from '../models';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';
import { columnAggregationOn } from './utils/propTypesFns';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';

const EMPTY_ARRAY = [];

/**
 * Renders a <PieWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string | string[]} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`. If multiples are provided, they will be merged into a single one using joinOperation property.
 * @param  {AggregationTypes} [props.joinOperation] - Operation applied to aggregate multiple operation columns into a single one.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.formatter] - Function to format the value that appears in the tooltip.
 * @param  {Function} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {object} props.labels - Object that maps category name with a chosen label
 * @param  {string} props.height - Height of the chart
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature
 */
function PieWidget({
  id,
  title,
  height,
  dataSource,
  column,
  operationColumn,
  joinOperation,
  operation,
  formatter,
  tooltipFormatter,
  labels,
  animation,
  filterable,
  global,
  colors,
  onError,
  wrapperProps,
  noDataAlertProps,
  droppingFeaturesAlertProps
}) {
  const dispatch = useDispatch();

  const selectedCategories =
    useWidgetFilterValues({ dataSource, id, column, type: FilterTypes.IN }) ||
    EMPTY_ARRAY;

  const {
    data = [],
    isLoading,
    warning
  } = useWidgetFetch(getCategories, {
    id,
    dataSource,
    params: {
      column,
      operationColumn,
      joinOperation,
      operation
    },
    global,
    onError
  });

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
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
    [column, dataSource, id, dispatch]
  );

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
        noDataAlertProps={noDataAlertProps}
      >
        {(!!data.length || isLoading) && (
          <PieWidgetUI
            data={data}
            formatter={formatter}
            height={height}
            tooltipFormatter={tooltipFormatter}
            colors={colors}
            labels={labels}
            animation={animation}
            filterable={filterable}
            selectedCategories={selectedCategories}
            onSelectedCategoriesChange={handleSelectedCategoriesChange}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

PieWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  joinOperation: columnAggregationOn('operationColumn'),
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  labels: PropTypes.object,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.string),
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object
};

PieWidget.defaultProps = {
  animation: true,
  filterable: true,
  global: false,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default PieWidget;
