import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { BarWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import {
  _FilterTypes as FilterTypes,
  AggregationTypes,
  _hasFeatureFlag,
  _FeatureFlags
} from '@carto/react-core';
import { getCategories } from '../models';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';
import { columnAggregationOn } from './utils/propTypesFns';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';

const EMPTY_ARRAY = [];

/**
 * Renders a <BarWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string | string[]} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`. If multiples are provided, they will be merged into a single one using joinOperation property.
 * @param  {AggregationTypes} [props.joinOperation] - Operation applied to aggregate multiple operation columns into a single one.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.xAxisFormatter] - Function to format each value in the x axis.
 * @param  {Function} [props.yAxisFormatter] - Function to format each value in the y axis.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not.
 * @param  {Function} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {string[]} [props.order] - Set a custom order for the categories. By default, they are ordered by the axis Y.
 * @param  {Object} [props.labels] - Overwrite category labels.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {string} [props.height] - Static widget height.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default).
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]().
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature.
 */
function BarWidget({
  id,
  title,
  dataSource,
  column,
  operationColumn,
  joinOperation,
  operation,
  xAxisFormatter,
  yAxisFormatter,
  order = [],
  labels,
  tooltip,
  tooltipFormatter,
  height,
  animation,
  filterable,
  global,
  onError,
  wrapperProps,
  noDataAlertProps,
  droppingFeaturesAlertProps
}) {
  const dispatch = useDispatch();

  const {
    data: _data = [],
    isLoading,
    warning,
    remoteCalculation
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
    onError,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
  });

  const sortedData = useMemo(() => {
    if (!_data.length) return _data;

    const sortedByValue = _data.sort((a, b) => b.value - a.value);

    if (order.length) {
      return sortedByValue.sort((a, b) => {
        const aIndex = order.indexOf(a.name);
        const bIndex = order.indexOf(b.name);

        return aIndex !== -1 && bIndex !== -1 ? aIndex - bIndex : bIndex - aIndex;
      });
    }

    return sortedByValue;
  }, [order, _data]);

  // For selecting bars, BarWidgetUI uses the index of the bar
  // so we need to process it before passing it to BarWidgetUI
  const _selectedBars =
    useWidgetFilterValues({ dataSource, id, column, type: FilterTypes.IN }) ||
    EMPTY_ARRAY;

  const selectedBars = useMemo(() => {
    return _selectedBars.map((category) =>
      sortedData.findIndex((d) => d.name === category)
    );
  }, [_selectedBars, sortedData]);

  const handleSelectedBarsChange = useCallback(
    (selectedBarsIdxs) => {
      if (selectedBarsIdxs?.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.IN,
            values: selectedBarsIdxs.map((idx) => sortedData[idx].name),
            owner: id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id
          })
        );
      }
    },
    [column, dataSource, id, dispatch, sortedData]
  );

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
        noDataAlertProps={noDataAlertProps}
        showDroppingFeaturesAlert={!remoteCalculation}
      >
        {(!!sortedData.length || isLoading) && (
          <BarWidgetUI
            xAxisData={sortedData.map((category) => category.name)}
            yAxisData={sortedData.map((category) => category.value)}
            xAxisFormatter={xAxisFormatter}
            yAxisFormatter={yAxisFormatter}
            labels={labels}
            tooltip={tooltip}
            tooltipFormatter={tooltipFormatter}
            selectedBars={selectedBars}
            onSelectedBarsChange={handleSelectedBarsChange}
            height={height}
            animation={animation}
            filterable={filterable}
            isLoading={isLoading}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

BarWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  joinOperation: columnAggregationOn('operationColumn'),
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  order: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.object,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

BarWidget.defaultProps = {
  order: [],
  labels: {},
  animation: true,
  filterable: true,
  tooltip: true,
  global: false,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default BarWidget;
