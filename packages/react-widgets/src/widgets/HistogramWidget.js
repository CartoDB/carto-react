import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { WrapperWidgetUI, HistogramWidgetUI, NoDataAlert } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getHistogram } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';
import { selectAreFeaturesReadyForSource } from '@carto/react-redux/';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';

const EMPTY_ARRAY = [];

/**
 * Renders a <HistogramWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]} props.ticks - Array of thresholds for the X axis.
 * @param  {Function} [props.xAxisformatter] - Function to format X axis values.
 * @param  {Function} [props.formatter] - Function to format Y axis values.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 */
function HistogramWidget(props) {
  const {
    id,
    title,
    dataSource,
    column,
    operation,
    ticks,
    xAxisFormatter,
    dataAxis,
    formatter,
    tooltip,
    animation,
    filterable,
    onError,
    wrapperProps,
    noDataAlertProps
  } = props;
  const dispatch = useDispatch();

  const [histogramData, setHistogramData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = useSourceFilters({ dataSource, id });
  const isSourceReady = useSelector((state) =>
    selectAreFeaturesReadyForSource(state, dataSource)
  );

  const thresholdsFromFilters = useWidgetFilterValues({
    dataSource,
    id,
    column,
    type: FilterTypes.CLOSED_OPEN
  });

  const selectedBars = useMemo(() => {
    return (thresholdsFromFilters || EMPTY_ARRAY)
      .map(([from, to]) => {
        if (typeof from === 'undefined' || from === null) {
          return 0;
        } else if (typeof to === 'undefined' || to === null) {
          return ticks.length;
        } else {
          const idx = ticks.indexOf(from);
          return idx !== -1 ? idx + 1 : null;
        }
      })
      .filter((v) => v !== null);
  }, [thresholdsFromFilters, ticks]);

  const tooltipFormatter = useCallback(
    ([serie]) => {
      const formattedValue = formatter
        ? formatter(serie.value, serie.dataIndex, ticks)
        : { prefix: '', value: serie.value };

      return typeof formattedValue === 'object'
        ? `${formattedValue.prefix}${formattedValue.value}`
        : formattedValue;
    },
    [formatter, ticks]
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
    ({ bars }) => {
      if (bars && bars.length) {
        const thresholds = bars.map((i) => {
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
    [column, dataSource, id, dispatch, ticks]
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

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      {histogramData.length || isLoading ? (
        <HistogramWidgetUI
          data={histogramData}
          dataAxis={dataAxis || ticksForDataAxis}
          selectedBars={selectedBars}
          onSelectedBarsChange={handleSelectedBarsChange}
          tooltip={tooltip}
          tooltipFormatter={tooltipFormatter}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={formatter}
          animation={animation}
          filterable={filterable}
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
  xAxisFormatter: PropTypes.func,
  formatter: PropTypes.func,
  tooltip: PropTypes.bool,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  ticks: PropTypes.array.isRequired,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object
};

HistogramWidget.defaultProps = {
  tooltip: true,
  animation: true,
  filterable: true,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default HistogramWidget;
