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
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {number[]} props.ticks - Array of thresholds for the X axis.
 * @param  {formatterCallback} [props.xAxisformatter] - Function to format X axis values.
 * @param  {formatterCallback} [props.formatter] - Function to format Y axis values.
 * @param  {boolean} [props.viewportFilter=true] - Defines whether filter by the viewport or globally.
 * @param  {boolean} [props.tooltip=true] - Whether to show a tooltip or not
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function HistogramWidget(props) {
  const { column } = props;
  const [histogramData, setHistogramData] = useState([]);
  const [selectedBars, setSelectedBars] = useState([]);
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const viewportFeatures = useSelector((state) => state.carto.viewportFeatures);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(
    props.id,
    props.viewportFilter
  );
  const { title, formatter, xAxisFormatter, dataAxis, ticks, tooltip } = props;
  const { data, credentials, type } = source;

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
    const abortController = new AbortController();

    if (data && credentials && hasLoadingState) {
      const filters = getApplicableFilters(source.filters, props.id);
      !props.viewportFilter && setIsLoading(true);
      getHistogram({
        ...props,
        data,
        filters,
        credentials,
        viewportFeatures: viewportFeatures[props.dataSource] || [],
        type,
        opts: { abortController }
      })
        .then((data) => data && setHistogramData(data))
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (props.onError) props.onError(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setHistogramData([]);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    credentials,
    data,
    setIsLoading,
    source.filters,
    type,
    viewportFeatures,
    props,
    hasLoadingState
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
            id: props.dataSource,
            column,
            type: FilterTypes.BETWEEN,
            values: thresholds,
            owner: props.id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: props.dataSource,
            column
          })
        );
      }
    },
    [column, props.dataSource, props.id, setSelectedBars, dispatch, ticks]
  );

  return (
    <WrapperWidgetUI
      title={title}
      {...props.wrapperProps}
      isLoading={widgetsLoadingState[props.id]}
    >
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
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func
};

HistogramWidget.defaultProps = {
  tooltip: true,
  viewportFilter: true,
  wrapperProps: {}
};

export default HistogramWidget;
