import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { WrapperWidgetUI, BarWidgetUI, NoDataAlert } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getHistogram } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';
import { selectIsViewportFeaturesReadyForSource } from '@carto/react-redux/';
import deprecate from 'util-deprecate';
import { defaultTooltipFormatter } from '@carto/react-ui/';

/**
 * Renders a <HistogramWidget /> component
 *
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]} props.ticks - Array of thresholds for the X axis.
 * @param  {Function} [props.xAxisformatter] - Function to format X axis values.
 * @param  {string[] | number[]} [props.xAxisData] - Array of values for X axis.
 * @param  {Function} [props.yAxisformatter] - Function to format Y axis values.
 * @param  {string[] | number[]} [props.yAxisData] - Array of values for Y axis.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not.
 * @param  {Function} [props.tooltipFormatter] - Function that returns HTML to format tooltip.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 */ function HistogramWidget(props) {
  const {
    id,
    title,
    dataSource,
    column,
    operation,
    ticks,
    xAxisFormatter,
    xAxisData,
    dataAxis, // deprecated: use xAxisData instead
    formatter, // deprecated: use yAxisFormatter instead
    yAxisFormatter,
    yAxisData,
    tooltip,
    tooltipFormatter,
    animation,
    onError,
    wrapperProps,
    noDataAlertProps
  } = props;

  const dispatch = useDispatch();

  const [histogramData, setHistogramData] = useState([]);
  const [selectedBars, setSelectedBars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = useSourceFilters({ dataSource, id });
  const isSourceReady = useSelector((state) =>
    selectIsViewportFeaturesReadyForSource(state, dataSource)
  );

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      getHistogram({
        column,
        operation,
        ticks,
        filters,
        dataSource
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setHistogramData(data);
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
    operation,
    ticks,
    dataSource,
    filters,
    setIsLoading,
    onError,
    isSourceReady
  ]);

  const handleSelectedBarsChange = useCallback(
    (selectedBars) => {
      setSelectedBars(selectedBars);

      if (selectedBars?.length) {
        const thresholds = selectedBars.map(([i]) => {
          let left = ticks[i - 1];
          let right = ticks.length !== i + 1 ? ticks[i] : undefined;

          return [left, right];
        });
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.CLOSED_OPEN,
            values: thresholds,
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
    [column, dataSource, id, setSelectedBars, dispatch, ticks]
  );

  const ticksForDataAxis = ticks.reduce((acc, tick, i) => {
    if (acc.length === 0) {
      return [`< ${tick}`];
    }
    if (i === ticks.length - 1) {
      return [...acc, `< ${tick}`, `>= ${tick}`];
    }
    return [...acc, `< ${tick}`];
  }, []);

  // Deprecations
  useEffect(() => {
    if (dataAxis)
      console.warn('[HistogramWidget] dataAxis is deprecated, use xAxisData instead.');
    if (formatter)
      console.warn(
        '[HistogramWidget] formatter is deprecated, use yAxisFormatter instead.'
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      {histogramData.length || isLoading ? (
        <BarWidgetUI
          data={histogramData}
          xAxisFormatter={xAxisFormatter}
          xAxisData={xAxisData || dataAxis || ticksForDataAxis}
          yAxisFormatter={yAxisFormatter || formatter}
          yAxisData={yAxisData}
          selectedBars={selectedBars}
          onSelectedBarsChange={handleSelectedBarsChange}
          tooltip={tooltip}
          tooltipFormatter={tooltipFormatter}
          animation={animation}
        />
      ) : (
        <NoDataAlert {...noDataAlertProps} />
      )}
    </WrapperWidgetUI>
  );
}

HistogramWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  // xAxis
  xAxisFormatter: PropTypes.func,
  dataAxis: PropTypes.arrayOf(PropTypes.string), // deprecated: use dataAxis instead
  xAxisData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  // yAxis
  formatter: PropTypes.func, // deprecated: use yAxisFormatter instead
  yAxisFormatter: PropTypes.func,
  yAxisData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  // Tooltip
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  // Others
  animation: PropTypes.bool,
  ticks: PropTypes.array.isRequired,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object
};

HistogramWidget.defaultProps = {
  tooltip: true,
  animation: true,
  wrapperProps: {},
  noDataAlertProps: {},
  // tooltipFormatter
};

export default HistogramWidget;

// Aux
// function tooltipFormatter(xAxisFormatter, yAxisFormatter, ...props) {
//   const xAxisFormatterWrapper = (value, dataIndex, ticks) => {
//     return intervalsFormatter(value, dataIndex, ticks, xAxisFormatter)
//   }
//   return defaultTooltipFormatter(xAxisFormatterWrapper, yAxisFormatter, ...props);
// }

// function intervalsFormatter(value, dataIndex, ticks, xAxisFormatter) {
//   const _value = xAxisFormatter(value);
//   if (!ticks || dataIndex === undefined) return _value;
//   const intervals = moneyInterval(dataIndex, ticks);
//   return `${intervals} <br/> ${CIRCLE_SVG} ${_value}`;
// }
