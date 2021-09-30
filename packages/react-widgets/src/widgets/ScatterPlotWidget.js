import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectIsViewportFeaturesReadyForSource } from '@carto/react-redux';
import { WrapperWidgetUI, ScatterPlotWidgetUI } from '@carto/react-ui';
import { _getApplicableFilters as getApplicableFilters } from '@carto/react-core';
import { getScatter } from '../models';
import useSourceFilters from '../hooks/useSourceFilters';

/**
 * Renders a <ScatterPlotWidget /> component
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.xAxisColumn - Name of the data source's column to get the x axis from.
 * @param  {string} props.yAxisColumn - Name of the data source's column to get the y axis from.
 * @param  {formatterCallback} [props.xAxisFormatter] - Function to format X axis values.
 * @param  {formatterCallback} [props.yAxisFormatter] - Function to format Y axis values.
 * @param  {formatterCallback} [props.tooltipFormatter] - Function to format Y axis values.
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function ScatterPlotWidget(props) {
  const {
    id,
    title,
    dataSource,
    xAxisColumn,
    yAxisColumn,
    yAxisFormatter,
    xAxisFormatter,
    tooltipFormatter,
    onError,
    wrapperProps
  } = props;

  const [scatterData, setScatterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSourceReady = useSelector(
    (state) => selectIsViewportFeaturesReadyForSource(state, dataSource)
  );
  const filters = useSourceFilters({ dataSource, id });

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      const _filters = getApplicableFilters(filters, id);

      getScatter({
        xAxisColumn,
        yAxisColumn,
        filters: _filters,
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
    yAxisColumn,
    dataSource,
    filters,
    setIsLoading,
    isSourceReady,
    onError
  ]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <ScatterPlotWidgetUI
        data={scatterData}
        tooltipFormatter={tooltipFormatter}
        xAxisFormatter={xAxisFormatter}
        yAxisFormatter={yAxisFormatter}
      />
    </WrapperWidgetUI>
  );
}

ScatterPlotWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  xAxisColumn: PropTypes.string.isRequired,
  yAxisColumn: PropTypes.string.isRequired,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

ScatterPlotWidget.defaultProps = {
  tooltip: true,
  wrapperProps: {},
  tooltipFormatter: (v) => `[${v.value[0]}, ${v.value[1]})`,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v
};

export default ScatterPlotWidget;
