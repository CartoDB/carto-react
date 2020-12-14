import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addFilter, removeFilter, selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, HistogramWidgetUI } from '../ui';
import { FilterTypes, getApplicableFilters } from '../api/FilterQueryBuilder';
import { getHistogram } from './models';
import { AggregationTypes } from './AggregationTypes';

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
  * @param  {boolean} [props.viewportFilter=false] - Defines whether filter by the viewport or not. 
  * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
  */
function HistogramWidget(props) {
  const { column } = props;
  const [histogramData, setHistogramData] = useState([]);
  const [selectedBars, setSelectedBars] = useState([]);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { title, formatter, xAxisFormatter, dataAxis, ticks, tooltip } = props;
  const { data, credentials } = source;

  const tooltipFormatter = ([serie]) => {
    const formattedValue = formatter
      ? formatter(serie.value)
      : { prefix: '', value: serie.value };

    return `${
      typeof formattedValue === 'object'
        ? `${formattedValue.prefix}${formattedValue.value}`
        : formattedValue
    }`;
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
    ) {
      const filters = getApplicableFilters(source.filters, props.id);
      getHistogram({
        ...props,
        data,
        filters,
        credentials,
        viewport,
        opts: { abortController },
      })
        .then((data) => data && setHistogramData(data))
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (props.onError) props.onError(error);
        });
    } else {
      setHistogramData([]);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, data, source.filters, viewport, props, dispatch]);

  const handleSelectedBarsChange = ({ bars }) => {
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
          owner: props.id,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: props.dataSource,
          column,
        })
      );
    }
  };

  return (
    <WrapperWidgetUI title={title} expandable={true}>
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
};

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
  viewportFilter: false
};

export default HistogramWidget;