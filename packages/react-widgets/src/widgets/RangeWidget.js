import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  _FilterTypes as FilterTypes,
  _FeatureFlags,
  _hasFeatureFlag
} from '@carto/react-core';
import { WrapperWidgetUI } from '@carto/react-ui';
import { addFilter, selectSourceById } from '@carto/react-redux/';
import { getRange } from '../models/RangeModel';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import { RangeWidgetUI } from '@carto/react-ui';
import useStats from '../hooks/useStats';

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
  wrapperProps
}) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => selectSourceById(state, dataSource) || {});
  const [[min, max], setMinMax] = useState([_min, _max]);

  const hasMinMax = Number.isFinite(min) && Number.isFinite(max);
  const { stats, warning: _warning } = useStats({
    id,
    column,
    dataSource,
    customStats: hasMinMax,
    onError
  });

  // For this widget we cannot use the useWidgetFilterValues hook because this hook
  // take into account the owner to return the selected values but if two RangeWidget use
  // the same column they share the selected value because this widget applies
  // a filter at the time you load it. It doesn't have a "no filter state"
  const selectedValues = useMemo(
    () => filters?.[column]?.[FilterTypes.BETWEEN]?.values,
    [column, filters]
  );

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
    onError,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
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

  useEffect(() => {
    if (Number.isFinite(_min) && Number.isFinite(_max)) {
      setMinMax([_min, _max]);
    }
  }, [_max, _min]);

  // The first time that you add the widget we apply the filter because this widget is a filter itself
  // We also apply the filter if you receive new min and max properties and selectedValues is out of the min-max range
  useEffect(() => {
    if (!hasMinMax) {
      return;
    }
    if (!selectedValues || selectedValues[0][0] < min || selectedValues[0][1] > max) {
      dispatch(
        addFilter({
          id: dataSource,
          column,
          type: FilterTypes.BETWEEN,
          values: [[min, max]],
          owner: id
        })
      );
    }
  }, [column, dataSource, dispatch, hasMinMax, id, max, min, selectedValues]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} {...wrapperProps}>
      <WidgetWithAlert
        dataSource={dataSource}
        warning={warning}
        global={global}
        showDroppingFeaturesAlert={false}
      >
        {min !== undefined && max !== undefined && (
          <RangeWidgetUI
            min={min}
            max={max}
            {...(selectedValues && selectedValues.length && { data: selectedValues[0] })}
            {...(Number.isFinite(data.min) &&
              Number.isFinite(data.max) && { limits: [data.min, data.max] })}
            onSelectedRangeChange={handleSelectedRangeChange}
            isLoading={isLoading}
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
  wrapperProps: PropTypes.object
};

RangeWidget.defaultProps = {
  global: false,
  wrapperProps: {}
};

export default RangeWidget;
