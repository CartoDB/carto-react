import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { WrapperWidgetUI, FormulaWidgetUI } from '@carto/react-ui';
import { getFormula } from '../models';
import { AggregationTypes } from '@carto/react-core';
import useSourceFilters from '../hooks/useSourceFilters';

/**
 * Renders a <FormulaWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {Function} [props.formatter] - Function to format each value returned.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function FormulaWidget(props) {
  const {
    id,
    title,
    dataSource,
    column,
    operation,
    formatter,
    onError,
    wrapperProps
  } = props;
  const isSourceReady = useSelector(
    (state) => state.carto.viewportFeaturesReady[dataSource]
  );
  const filters = useSourceFilters({ dataSource, id });

  const [formulaData, setFormulaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      getFormula({
        operation,
        column,
        filters,
        dataSource
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
    } else {
      setFormulaData(null);
    }
  }, [
    operation,
    column,
    filters,
    dataSource,
    setIsLoading,
    onError,
    isSourceReady
  ]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <FormulaWidgetUI data={formulaData} formatter={formatter} unitBefore={true} />
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
  onError: PropTypes.func,
  wrapperProps: PropTypes.object
};

FormulaWidget.defaultProps = {
  wrapperProps: {}
};

export default FormulaWidget;
