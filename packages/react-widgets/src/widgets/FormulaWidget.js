import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectSourceById } from '@carto/react-redux';
import { WrapperWidgetUI, FormulaWidgetUI } from '@carto/react-ui';
import { getFormula } from '../models';
import { AggregationTypes } from '@carto/react-core';
import useWidgetLoadingState from './useWidgetLoadingState';

/**
 * Renders a <FormulaWidget /> component
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {formatterCallback} [props.formatter] - Function to format each value returned.
 * @param  {boolean} [props.viewportFilter=true] - Defines whether filter by the viewport or globally.
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState(null);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const viewportFeaturesReady = useSelector((state) => state.carto.viewportFeaturesReady);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const { data, credentials, type, filters } = source;
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(
    props.id,
    props.viewportFilter
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (data && credentials && hasLoadingState) {
      !props.viewportFilter && setIsLoading(true);
      getFormula({
        ...props,
        data,
        filters,
        credentials,
        viewportFeatures: viewportFeaturesReady[props.dataSource] || false,
        dataSource: props.dataSource,
        type,
        opts: { abortController }
      })
        .then((data) => {
          data && data[0] && setFormulaData(data[0].value);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (props.onError) props.onError(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setFormulaData(null);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    credentials,
    data,
    filters,
    viewportFeaturesReady,
    props,
    hasLoadingState,
    setIsLoading,
    type
  ]);

  return (
    <WrapperWidgetUI
      title={props.title}
      isLoading={widgetsLoadingState[props.id]}
      {...props.wrapperProps}
    >
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} unitBefore={true} />
    </WrapperWidgetUI>
  );
}

FormulaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

FormulaWidget.defaultProps = {
  viewportFilter: true,
  wrapperProps: {}
};

export default FormulaWidget;
