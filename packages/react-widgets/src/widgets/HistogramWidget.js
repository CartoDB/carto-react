import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  addFilter,
  removeFilter,
  checkIfSourceIsDroppingFeature
} from '@carto/react-redux';
import { WrapperWidgetUI, HistogramWidgetUI, NoDataAlert } from '@carto/react-ui';
import { _FilterTypes as FilterTypes, AggregationTypes } from '@carto/react-core';
import { getHistogram } from '../models';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';
import useWidgetFetch from '../hooks/useWidgetFetch';
import { defaultDroppingFeaturesAlertProps } from './utils/defaultDroppingFeaturesAlertProps';

const EMPTY_ARRAY = [];

/**
 * Renders a <HistogramWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {number} props.min - Min value of the indicated column
 * @param  {number} props.max - Max value of the indicated column
 * @param  {string} [props.operation] - Operation to apply to the column. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]} [props.ticks] - Array of thresholds for the X axis.
 * @param  {number} [props.bins] - Number of bins to calculate the ticks.
 * @param  {Function} [props.xAxisformatter] - Function to format X axis values.
 * @param  {Function} [props.formatter] - Function to format Y axis values.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.filterable] - Enable/disable widget filtering capabilities. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature
 */
function HistogramWidget({
  id,
  title,
  dataSource,
  column,
  operation,
  ticks: _ticks = [],
  min,
  max,
  xAxisFormatter,
  bins,
  formatter,
  tooltip,
  tooltipFormatter,
  animation,
  filterable,
  global,
  onError,
  wrapperProps,
  noDataAlertProps,
  droppingFeaturesAlertProps = defaultDroppingFeaturesAlertProps
}) {
  const dispatch = useDispatch();
  const isDroppingFeatures = useSelector((state) =>
    checkIfSourceIsDroppingFeature(state, dataSource)
  );

  const ticks = useMemo(() => {
    if (_ticks?.length) return _ticks;

    if (bins) {
      if (!isFinite(min) || !isFinite(max)) {
        throw new Error('Cannot calculate histogram without valid data');
      }

      const result = [];
      for (let i = 1; i < bins; i += 1) {
        ticks.push(min + (max - min) * (i / bins));
      }
      return result;
    }

    throw new Error('You must specify either ticks or bins.');
  }, [min, max, _ticks, bins]);

  let { data = EMPTY_ARRAY, isLoading } = useWidgetFetch(getHistogram, {
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

  const handleSelectedBarsChange = useCallback(
    (selectedBars) => {
      if (selectedBars?.length) {
        const thresholds = selectedBars.map((i) => {
          let left = ticks[i - 1];
          let right = ticks.length !== i ? ticks[i] : undefined;

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

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={isLoading}>
      {(data.length && !isDroppingFeatures) || isLoading ? (
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
          animation={animation}
          filterable={filterable}
        />
      ) : (
        <NoDataAlert
          {...(isDroppingFeatures ? droppingFeaturesAlertProps : noDataAlertProps)}
        />
      )}
    </WrapperWidgetUI>
  );
}

HistogramWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number),
  bins: PropTypes.number,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)),
  xAxisFormatter: PropTypes.func,
  formatter: PropTypes.func,
  tooltip: PropTypes.bool,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object
};

HistogramWidget.defaultProps = {
  bins: 15,
  ticks: [],
  operation: AggregationTypes.COUNT,
  tooltip: true,
  animation: true,
  filterable: true,
  global: false,
  wrapperProps: {},
  noDataAlertProps: {}
};

export default HistogramWidget;
