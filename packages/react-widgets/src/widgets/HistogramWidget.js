import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, HistogramWidgetUI } from '@carto/react-ui';
import {
  _FilterTypes as FilterTypes,
  _getApplicableFilters as getApplicableFilters,
  AggregationTypes
} from '@carto/react-core';
import { getHistogram } from '../models';
import useWidgetLoadingState from './useWidgetLoadingState';

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
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
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
    onError,
    wrapperProps
  } = props;
  const [histogramData, setHistogramData] = useState([]);
  const [selectedBars, setSelectedBars] = useState([]);
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, dataSource) || {});
  const viewportFeaturesReady = useSelector((state) => state.carto.viewportFeaturesReady);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const [isLoading, setIsLoading] = useWidgetLoadingState(id);
  const { data, filters } = source;

  const tooltipFormatter = useCallback(
    ([serie]) => {
      const formattedValue = formatter
        ? formatter(serie.value)
        : { prefix: '', value: serie.value };

      return `${
        typeof formattedValue === 'object'
          ? `${formattedValue.prefix}${formattedValue.value}`
          : formattedValue
      }`;
    },
    [formatter]
  );

  useEffect(() => {
    if (data && isLoading) {
      const _filters = getApplicableFilters(filters, id);

      getHistogram({
        data,
        column,
        operation,
        ticks,
        filters: _filters,
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
    } else {
      setHistogramData([]);
    }
  }, [
    id,
    data,
    column,
    operation,
    ticks,
    filters,
    dataSource,
    viewportFeaturesReady,
    setIsLoading,
    isLoading,
    onError
  ]);

  const handleSelectedBarsChange = useCallback(
    ({ bars }) => {
      setSelectedBars(bars);

      if (bars && bars.length) {
        const thresholds = bars.map((i) => {
          return [ticks[i - 1], ticks.length !== i + 1 ? ticks[i] : undefined];
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
            column
          })
        );
      }
    },
    [column, dataSource, id, setSelectedBars, dispatch, ticks]
  );

  return (
    <WrapperWidgetUI title={title} {...wrapperProps} isLoading={widgetsLoadingState[id]}>
      <HistogramWidgetUI
        data={histogramData}
        dataAxis={dataAxis || [...ticks, `> ${ticks[ticks.length - 1]}`]}
        selectedBars={selectedBars}
        onSelectedBarsChange={handleSelectedBarsChange}
        tooltip={tooltip}
        tooltipFormatter={tooltipFormatter}
        xAxisFormatter={xAxisFormatter}
        yAxisFormatter={formatter}
      />
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
  ticks: PropTypes.array.isRequired,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

HistogramWidget.defaultProps = {
  tooltip: true,
  wrapperProps: {}
};

export default HistogramWidget;
