import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter } from '@carto/react-redux';
import { WrapperWidgetUI, HistogramWidgetUI } from '@carto/react-ui';
import {
  _FilterTypes as FilterTypes,
  AggregationTypes,
  _hasFeatureFlag,
  _FeatureFlags
} from '@carto/react-core';
import { getHistogram } from '../models';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import useStats from '../hooks/useStats';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

/**
 * Renders a <HistogramWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {number=} props.min - Min value of the indicated column.
 * @param  {number=} props.max - Max value of the indicated column.
 * @param  {string} [props.operation] - Operation to apply to the column. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]=} [props.ticks] - Array of thresholds for the X axis.
 * @param  {number} [props.bins] - Number of bins to calculate the ticks.
 * @param  {Function} [props.xAxisFormatter] - Function to format X axis values.
 * @param  {Function} [props.formatter] - Function to format Y axis values.
 * @param  {'dense' | 'full'} [props.yAxisType='dense'] - Type of Y axis. A dense axis will show only the top value and a full axis will show them all.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not.
 * @param  {Function} [props.tooltipFormatter] - Function to return the HTML of the tooltip.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default).
 * @param  {Function=} [props.onStateChange] - Callback to handle state updates of widgets
 * @param  {object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]().
 */
function HistogramWidget({
  id,
  title,
  dataSource,
  column,
  operation = AggregationTypes.COUNT,
  ticks: _ticks = EMPTY_ARRAY,
  min: externalMin = Number.MIN_SAFE_INTEGER,
  max: externalMax = Number.MAX_SAFE_INTEGER,
  xAxisFormatter,
  bins = 15,
  formatter,
  yAxisType = 'dense',
  tooltip = true,
  tooltipFormatter,
  animation = true,
  filterable = true,
  global = false,
  onError,
  onStateChange,
  wrapperProps = EMPTY_OBJECT,
  noDataAlertProps = EMPTY_OBJECT
}) {
  const dispatch = useDispatch();

  const hasExternalMinMax =
    Number.isFinite(externalMin) &&
    externalMin !== Number.MIN_SAFE_INTEGER &&
    Number.isFinite(externalMax) &&
    externalMax !== Number.MAX_SAFE_INTEGER;

  const { stats, warning: _warning } = useStats({
    id,
    column,
    dataSource,
    customStats: hasExternalMinMax,
    onError
  });

  const [min, max] = useMemo(() => {
    if (hasExternalMinMax) {
      return [externalMin, externalMax];
    }
    if (stats) {
      return [stats.min, stats.max];
    }
    return [undefined, undefined];
  }, [hasExternalMinMax, stats, externalMin, externalMax]);

  const ticks = useMemo(() => {
    if (_ticks?.length) return _ticks;

    if (bins && hasExternalMinMax) {
      const result = [];
      for (let i = 1; i < bins; i += 1) {
        result.push(min + (max - min) * (i / bins));
      }
      return result;
    }

    return [];
  }, [min, max, _ticks, bins, hasExternalMinMax]);

  const customOnStateChange = ({ state, data }) => {
    if (!onStateChange) return;
    if (!data) return onStateChange({ state });
    return onStateChange({
      state,
      data: {
        values: data,
        ticks,
        min,
        max
      }
    });
  };

  let {
    data = EMPTY_ARRAY,
    isLoading,
    warning = _warning
  } = useWidgetFetch(getHistogram, {
    id,
    dataSource,
    params: {
      column,
      operation,
      ticks
    },
    global,
    onError,
    onStateChange: customOnStateChange,
    enabled: !!ticks.length,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
  });

  const thresholdsFromFilters = useWidgetFilterValues({
    dataSource,
    id,
    column,
    type: FilterTypes.BETWEEN
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
          return idx !== -1 ? idx + 1 : 0;
        }
      })
      .filter((v) => v !== null);
  }, [thresholdsFromFilters, ticks]);

  const handleSelectedBarsChange = useCallback(
    (selectedBars) => {
      if (selectedBars?.length) {
        const thresholds = selectedBars.map((i) => {
          let left = ticks[i - 1] || min;
          let right = ticks.length !== i ? ticks[i] : max;

          return [left, right];
        });
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.BETWEEN,
            values: thresholds,
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
    [column, dataSource, id, dispatch, ticks, min, max]
  );

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      <WidgetWithAlert warning={warning} noDataAlertProps={noDataAlertProps}>
        {(!!data.length || isLoading) && (
          <HistogramWidgetUI
            data={data}
            min={min}
            max={max}
            ticks={ticks}
            selectedBars={selectedBars}
            onSelectedBarsChange={handleSelectedBarsChange}
            tooltip={tooltip}
            tooltipFormatter={tooltipFormatter}
            xAxisFormatter={xAxisFormatter}
            yAxisFormatter={formatter}
            yAxisType={yAxisType}
            animation={animation}
            filterable={filterable}
            isLoading={isLoading}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

HistogramWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  ticks: PropTypes.arrayOf(PropTypes.number),
  bins: PropTypes.number,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)),
  xAxisFormatter: PropTypes.func,
  formatter: PropTypes.func,
  yAxisType: PropTypes.oneOf(['dense', 'full']),
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object
};

export default HistogramWidget;
