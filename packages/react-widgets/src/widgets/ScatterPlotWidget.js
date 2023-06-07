import React from 'react';
import { PropTypes } from 'prop-types';
import { WrapperWidgetUI, ScatterPlotWidgetUI } from '@carto/react-ui';
import { getScatter } from '../models';
import { columnAggregationOn } from './utils/propTypesFns';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import { AggregationTypes } from '@carto/react-core';

/**
 * Renders a <ScatterPlotWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string | string[]} props.xAxisColumn - Name of the data source's column to get the x axis from. If multiples are provided, they will be merged into a single one using xAxisJoinOperation property.
 * @param  {AggregationTypes} [props.xAxisJoinOperation] - Operation applied to aggregate multiple xAxis columns into a single one.
 * @param  {string | string[]} props.yAxisColumn - Name of the data source's column to get the y axis from. If multiples are provided, they will be merged into a single one using yAxisJoinOperation property.
 * @param  {AggregationTypes} [props.yAxisJoinOperation] - Operation applied to aggregate multiple yAxis columns into a single one.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {Function} [props.xAxisFormatter] - Function to format X axis values.
 * @param  {Function} [props.yAxisFormatter] - Function to format Y axis values.
 * @param  {Function} [props.tooltipFormatter] - Function to format Y axis values.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default).
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]().
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature.
 */
function ScatterPlotWidget({
  id,
  title,
  dataSource,
  xAxisColumn,
  xAxisJoinOperation,
  yAxisColumn,
  yAxisJoinOperation,
  animation,
  yAxisFormatter,
  xAxisFormatter,
  tooltipFormatter,
  global,
  onError,
  wrapperProps,
  noDataAlertProps,
  droppingFeaturesAlertProps
}) {
  const {
    data = [],
    isLoading,
    warning
  } = useWidgetFetch(getScatter, {
    id,
    dataSource,
    params: {
      xAxisColumn,
      xAxisJoinOperation,
      yAxisColumn,
      yAxisJoinOperation
    },
    global,
    onError
  });

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
        noDataAlertProps={noDataAlertProps}
      >
        {(!!data.length || isLoading) && (
          <ScatterPlotWidgetUI
            data={data}
            tooltipFormatter={tooltipFormatter}
            xAxisFormatter={xAxisFormatter}
            yAxisFormatter={yAxisFormatter}
            animation={animation}
            isLoading={isLoading}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

ScatterPlotWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  xAxisColumn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  xAxisJoinOperation: columnAggregationOn('xAxisColumn'),
  yAxisColumn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  yAxisJoinOperation: columnAggregationOn('yAxisColumn'),
  animation: PropTypes.bool,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object
};

ScatterPlotWidget.defaultProps = {
  tooltip: true,
  animation: true,
  wrapperProps: {},
  noDataAlertProps: {},
  tooltipFormatter: (v) => `[${v.value[0]}, ${v.value[1]})`,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v
};

export default ScatterPlotWidget;
