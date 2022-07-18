import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { _FilterTypes as FilterTypes } from '@carto/react-core';
import { WrapperWidgetUI } from '@carto/react-ui';
import { addFilter } from '@carto/react-redux/';
import { getRange } from '../models/RangeModel';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import { RangeWidgetUI } from '@carto/react-ui';
import useStats from '../hooks/useStats';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';

/**
 * Renders a <RangeWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's column(s) to get the data from. If multiples are provided, they will be merged into a single one using joinOperation property.
 * @param  {number} [props.min] - Min value of the indicated column
 * @param  {number} [props.max] - Max value of the indicated column
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature
 */
function RangeWidget({
  id,
  title,
  dataSource,
  column,
  min: _min,
  max: _max,
  global,
  onError,
  wrapperProps,
  droppingFeaturesAlertProps
}) {
  const dispatch = useDispatch();
  const [[min, max], setMinMax] = useState([_min, _max]);

  const hasMinMax = Number.isFinite(min) && Number.isFinite(max);
  const { stats, warning: _warning } = useStats({
    id,
    column,
    dataSource,
    customStats: hasMinMax,
    onError
  });

  const selectedValues = useWidgetFilterValues({
    dataSource,
    id,
    column,
    type: FilterTypes.BETWEEN
  });

  const {
    data = { min: undefined, max: undefined },
    isLoading,
    warning = _warning
  } = useWidgetFetch(getRange, {
    id,
    dataSource,
    params: {
      column
    },
    global,
    onError
  });

  const handleSelectedRangeChange = useCallback(
    (range) => {
      if (
        range &&
        range.length === 2 &&
        Number.isFinite(range[0]) &&
        Number.isFinite(range[1])
      ) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.BETWEEN,
            values: [range],
            owner: id
          })
        );
      }
    },
    [column, dataSource, dispatch, id]
  );

  useEffect(() => {
    if (stats) {
      const { min, max } = stats;
      setMinMax([min, max]);
    }
  }, [stats]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        droppingFeaturesAlertProps={droppingFeaturesAlertProps}
      >
        {min !== undefined && max !== undefined && (
          <RangeWidgetUI
            min={min}
            max={max}
            {...(selectedValues &&
              selectedValues.length && { values: selectedValues[0] })}
            {...(Number.isFinite(data.min) &&
              Number.isFinite(data.max) && { limits: [data.min, data.max] })}
            onSelectedRangeChange={handleSelectedRangeChange}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}

RangeWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  global: PropTypes.bool,
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object
};

RangeWidget.defaultProps = {
  global: false,
  wrapperProps: {}
};

export default RangeWidget;
