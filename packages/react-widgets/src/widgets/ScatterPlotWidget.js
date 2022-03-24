import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { WrapperWidgetUI, ScatterPlotWidgetUI, NoDataAlert } from '@carto/react-ui';
import { getScatter } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';
import { columnAggregationOn } from './utils/propTypesFns';

/**
 * Renders a <ScatterPlotWidget /> component
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string | string[]} props.xAxisColumn - Name of the data source's column to get the x axis from. If multiples are provided, they will be merged into a single one using xAxisJoinOperation property.
 * @param  {AggregationTypes} [props.xAxisJoinOperation] - Operation applied to aggregate multiple xAxis columns into a single one.
 * @param  {string | string[]} props.yAxisColumn - Name of the data source's column to get the y axis from. If multiples are provided, they will be merged into a single one using yAxisJoinOperation property.
 * @param  {AggregationTypes} [props.yAxisJoinOperation] - Operation applied to aggregate multiple yAxis columns into a single one.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {formatterCallback} [props.xAxisFormatter] - Function to format X axis values.
 * @param  {formatterCallback} [props.yAxisFormatter] - Function to format Y axis values.
 * @param  {formatterCallback} [props.tooltipFormatter] - Function to format Y axis values.
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 */
function ScatterPlotWidget(props) {
  const {
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
    onError,
    wrapperProps,
    noDataAlertProps
  } = props;

  const [scatterData, setScatterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSourceReady = useSelector((state) =>
    selectAreFeaturesReadyForSource(state, dataSource)
  );
  const { filters, filtersLogicalOperator } = useSourceFilters({ dataSource, id });

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      getScatter({
        xAxisColumn,
        xAxisJoinOperation,
        yAxisColumn,
        yAxisJoinOperation,
        filters,
        filtersLogicalOperator,
        dataSource
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setScatterData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (onError) onError(error);
        });
    }
  }, [
    id,
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation,
    dataSource,
    filters,
    filtersLogicalOperator,
    setIsLoading,
    isSourceReady,
    onError
  ]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      {scatterData.length || isLoading ? (
        <ScatterPlotWidgetUI
          data={scatterData}
          tooltipFormatter={tooltipFormatter}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={yAxisFormatter}
          animation={animation}
        />
      ) : (
        <NoDataAlert {...noDataAlertProps} />
      )}
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
  noDataAlertProps: PropTypes.object
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
