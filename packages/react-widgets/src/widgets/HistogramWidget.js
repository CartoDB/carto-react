import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, HistogramWidgetUI, NoDataAlert } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getHistogram } from '../models';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';
import useWidgetFetch from '../hooks/useWidgetFetch';

const EMPTY_ARRAY = [];

/**
 * Renders a <HistogramWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the column. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]} props.ticks - Array of thresholds for the X axis.
 * @param  {Function} [props.xAxisformatter] - Function to format X axis values.
 * @param  {Function} [props.formatter] - Function to format Y axis values.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
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
    global,
    onError,
    wrapperProps,
    noDataAlertProps
  } = props;
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource))
  const isDroppingFeatures = source?.isDroppingFeatures

  const { data = [], isLoading } = useWidgetFetch(getHistogram, {
    id,
    dataSource,
    params: {
      column,
      operation,
      ticks
    },
    global,
    onError
  });

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
      {(data.length && !isDroppingFeatures) || isLoading ? (
        <HistogramWidgetUI
          data={data}
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
        <NoDataAlert {...noDataAlertProps} {...(isDroppingFeatures ? { body: 'Some rows have been filtered at this zoom level. Zoom in to ensure you see all rows in the map.' } : {})}/>
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
  global: PropTypes.bool,
  ticks: PropTypes.array.isRequired,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object
};

HistogramWidget.defaultProps = {
  tooltip: true,
  animation: true,
  filterable: true,
  global: false,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default HistogramWidget;
