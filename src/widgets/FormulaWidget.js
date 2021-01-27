import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from '../ui';
import { getFormula } from './models';
import { AggregationTypes } from './AggregationTypes';

/**
 * Renders a <FormulaWidget /> component
 * @param  props
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column to get the data from.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {formatterCallback} [props.formatter] - Function to format each value returned.
 * @param  {boolean} [props.viewportFilter=false] - Defines whether filter by the viewport or not.
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 */
function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const viewportFeatures = useSelector((state) => state.carto.viewportFeatures);
  const { data, credentials, type, filters } = source;

  useEffect(() => {
    const abortController = new AbortController();
    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewportFeatures[props.dataSource]))
    ) {
      setLoading(true);
      getFormula({
        ...props,
        data,
        filters,
        credentials,
        viewportFeatures: viewportFeatures[props.dataSource],
        type,
        opts: { abortController },
      })
        .then((data) => {
          data && data[0] && setFormulaData(data[0].value);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (props.onError) props.onError(error);
        });
    } else {
      setFormulaData(undefined);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, data, filters, viewportFeatures, props]);

  return (
    <WrapperWidgetUI title={props.title} loading={loading} {...props.wrapperProps}>
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} unitBefore={true} />
    </WrapperWidgetUI>
  );
}

FormulaWidget.propTypes = {
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  viewportFilter: PropTypes.bool,
  onError: PropTypes.func,
};

FormulaWidget.defaultProps = {
  viewportFilter: false,
  wrapperProps: {},
};

export default FormulaWidget;
