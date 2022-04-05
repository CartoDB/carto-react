import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { WrapperWidgetUI, FormulaWidgetUI } from '@carto/react-ui';
import { getFormula } from '../models';
import { AggregationTypes } from '@carto/react-core';
import { selectAreFeaturesReadyForSource, selectSpatialFilter } from '@carto/react-redux';
import { columnAggregationOn } from './utils/propTypesFns';
import useWidgetSource from '../hooks/useWidgetSource';

/**
 * Renders a <FormulaWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string | string[]} props.column - Name of the data source's column(s) to get the data from. If multiples are provided, they will be merged into a single one using joinOperation property.
 * @param  {AggregationTypes} [props.joinOperation] - Operation applied to aggregate multiple columns into a single one.
 * @param  {AggregationTypes} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.formatter] - Function to format each value returned.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.global] - 
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function FormulaWidget({
  id,
  title,
  dataSource,
  column,
  operation,
  joinOperation,
  formatter,
  animation,
  global,
  onError,
  wrapperProps
}) {
  const isSourceReady = useSelector((state) =>
    selectAreFeaturesReadyForSource(state, dataSource)
  );
  const source = useWidgetSource({ dataSource, id });

  const [formulaData, setFormulaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const spatialFilter = useSelector((state) =>
    global ? selectSpatialFilter(state, source?.id) : null
  );

  const isReady = global ? true : isSourceReady;

  useEffect(() => {
    setIsLoading(true);

    if (source && isReady) {
      getFormula({
        source,
        operation,
        column,
        joinOperation,
        spatialFilter,
        global
      })
        .then((data) => {
          if (data && data[0]) {
            setIsLoading(false);
            setFormulaData(data[0].value);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (onError) onError(error);
        });
    }
  }, [
    operation,
    column,
    joinOperation,
    source,
    setIsLoading,
    onError,
    spatialFilter,
    isReady,
    global
  ]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <FormulaWidgetUI
        data={formulaData}
        formatter={formatter}
        unitBefore={true}
        animation={animation}
      />
    </WrapperWidgetUI>
  );
}

FormulaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
    .isRequired,
  joinOperation: columnAggregationOn('column'),
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  animation: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

FormulaWidget.defaultProps = {
  animation: true,
  global: false,
  wrapperProps: {}
};

export default FormulaWidget;
