import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from '../ui';
import { getFormula } from './models';
import { AggregationTypes } from './AggregationTypes';
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
  const viewportFeatures = useSelector((state) => state.carto.viewportFeatures);
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const globalDataFetched = useRef(false);
  const { data, credentials, type, filters } = source;
  const [hasLoadingState, setIsLoading] = useWidgetLoadingState(
    props.id,
    props.viewportFilter
  );

  // user could change 'viewportFilter' prop programatically
  useEffect(() => {
    if (!props.viewportFilter) {
      setIsLoading(true);
      globalDataFetched.current = false;
    }
  }, [props.viewportFilter, setIsLoading]);

  // 'setAllWidgetsLoadingState' dispatched by 'useViewportFeatures' causes the loading appearing even with global data
  useEffect(() => {
    if (
      !props.viewportFilter &&
      globalDataFetched.current &&
      widgetsLoadingState[props.id]
    ) {
      setIsLoading(false);
    }
  }, [props.viewportFilter, props.id, setIsLoading, widgetsLoadingState]);

  useEffect(() => {
    const abortController = new AbortController();
    if (data && credentials && hasLoadingState) {
      if ((!props.viewportFilter && !globalDataFetched.current) || props.viewportFilter) {
        getFormula({
          ...props,
          data,
          filters,
          credentials,
          viewportFeatures: viewportFeatures[props.dataSource] || [],
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
          .finally(() => {
            setIsLoading(false);
            if (!props.viewportFilter) globalDataFetched.current = true;
          });
      }
    } else {
      setFormulaData(undefined);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    credentials,
    data,
    filters,
    viewportFeatures,
    props,
    hasLoadingState,
    setIsLoading,
    type
  ]);

  const shouldDisplayLoading = useCallback(() => {
    if (props.viewportFilter) {
      return widgetsLoadingState[props.id];
    }

    return !globalDataFetched.current;
  }, [props.viewportFilter, props.id, widgetsLoadingState, globalDataFetched]);

  return (
    <WrapperWidgetUI
      title={props.title}
      isLoading={shouldDisplayLoading()}
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
  onError: PropTypes.func
};

FormulaWidget.defaultProps = {
  viewportFilter: true,
  wrapperProps: {}
};

export default FormulaWidget;
