import React from 'react';
import PropTypes from 'prop-types';
import { WrapperWidgetUI, FormulaWidgetUI } from '@carto/react-ui';
import { getFormula } from '../models';
import { AggregationTypes, _FeatureFlags, _hasFeatureFlag } from '@carto/react-core';
import { checkFormulaColumn, columnAggregationOn } from './utils/propTypesFns';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';

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
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature
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
  wrapperProps,
  droppingFeaturesAlertProps
}) {
  const {
    data = { value: undefined },
    isLoading,
    warning,
    remoteCalculation
  } = useWidgetFetch(getFormula, {
    id,
    dataSource,
    params: {
      operation,
      column,
      joinOperation
    },
    global,
    onError,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
  });

  const value = Number.isFinite(data?.value) ? data.value : undefined;

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
        showDroppingFeaturesAlert={!remoteCalculation}
      >
        {value !== undefined && (
          <FormulaWidgetUI
            data={value}
            formatter={formatter}
            animation={animation}
            isLoading={isLoading}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

FormulaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: checkFormulaColumn,
  joinOperation: columnAggregationOn('column'),
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  formatter: PropTypes.func,
  animation: PropTypes.bool,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object
};

FormulaWidget.defaultProps = {
  animation: true,
  global: false,
  wrapperProps: {}
};

export default FormulaWidget;
