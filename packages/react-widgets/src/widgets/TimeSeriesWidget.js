import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTimeSeries } from '../models';
import { addFilter, removeFilter } from '@carto/react-redux';
import {
  TimeSeriesWidgetUI,
  WrapperWidgetUI,
  TIME_SERIES_CHART_TYPES,
  Typography
} from '@carto/react-ui';
import {
  GroupDateTypes,
  AggregationTypes,
  _FilterTypes as FilterTypes,
  _hasFeatureFlag,
  _FeatureFlags
} from '@carto/react-core';
import { capitalize, Menu, MenuItem, SvgIcon } from '@mui/material';
import { PropTypes } from 'prop-types';
import { columnAggregationOn } from './utils/propTypesFns';
import useWidgetFetch from '../hooks/useWidgetFetch';
import WidgetWithAlert from './utils/WidgetWithAlert';
import { useWidgetFilterValues } from '../hooks/useWidgetFilterValues';

// Due to the widget groups the data by a certain stepSize, when filtering
// the filter applied must be a range that represent the grouping range.
// For example, if you group the data by day, the range must
// start with a day and ends 24 hours later.
const STEP_SIZE_RANGE_MAPPING = {
  [GroupDateTypes.WEEKS]: 60 * 60 * 24 * 7 * 1000,
  [GroupDateTypes.DAYS]: 60 * 60 * 24 * 1000,
  [GroupDateTypes.HOURS]: 60 * 60 * 1000,
  [GroupDateTypes.MINUTES]: 60 * 1000,
  [GroupDateTypes.SECONDS]: 1 * 1000
};

function calculateNextStep(time, stepType) {
  const currentDate = new Date(time);
  switch (stepType) {
    case GroupDateTypes.YEARS:
      return currentDate.setFullYear(currentDate.getFullYear() + 1);
    case GroupDateTypes.MONTHS:
      return currentDate.setMonth(currentDate.getMonth() + 1);
    default:
      return time + STEP_SIZE_RANGE_MAPPING[stepType];
  }
}

const EMPTY_ARRAY = [];

/**
 * Renders a <TimeSeriesWidget /> component
 * @param  {object} props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's date column for grouping the data.
 * @param  {string | string[]} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`. If multiples are provided, they will be merged into a single one using joinOperation property.
 * @param  {AggregationTypes} [props.joinOperation] - Operation applied to aggregate multiple operation columns into a single one.
 * @param  {string} [props.operation] - Operation to apply to the operationColumn. Operation used by default is COUNT. Must be one of those defined in `AggregationTypes` object.
 * @param  {object[]=} [props.series] - Array of {operation, operationColumn} objects that specify multiple aggregations
 * @param  {string} props.stepSize - Step applied to group the data. Must be one of those defined in `GroupDateTypes` object.
 * @param  {number=} [props.stepMultiplier] - Multiplier applied to `stepSize`. Use to aggregate by 2 hours, 5 seconds, etc.
 * @param  {string=} props.splitByCategory
 * @param  {string=} props.splitByCategoryLimit
 * @param  {string=} props.splitByCategoryValues
 * @param  {string[]} [props.stepSizeOptions] - Different steps that can be applied to group the data. If filled, an icon with a menu appears to change between steps. Every value must be one of those defined in `AggregationTypes` object.
 * @param  {string} [props.chartType] - Chart used to represent the time serie. Must be one of those defined in `TIME_SERIES_CHART_TYPES` object.
 * @param  {boolean} [props.tooltip] - Enable/disable tooltip.
 * @param  {function} [props.tooltipFormatter] - Function that returns the HTML for the chart tooltip.
 * @param  {function} [props.formatter] - Function for formatting the value that is represented in the tooltip.
 * @param  {string=} [props.height] - Height of the chart, default 22*theme.spacingValue
 * @param  {string=} [props.fitHeight] - Widget should occupy all vertical space available.
 * @param  {boolean} [props.showControls] - Enable/disable animation controls (play, pause, stop, speed). True by default.
 * @param  {boolean} [props.animation] - Enable/disable widget animations on data updates. Enabled by default.
 * @param  {boolean} [props.global] - Enable/disable the viewport filtering in the data fetching.
 * @param  {function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Function} [props.onStateChange] - Callback to handle state updates of widgets
 * @param  {string[]=} [props.palette] - Optional palette
 * @param  {object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default).
 * @param  {object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]().
 * Internal state
 * @param  {boolean} [props.isPlaying] - If true, the animation starts.
 * @param  {boolean} [props.isPaused] - If true and isPlaying false, the animation is paused.
 * @param  {any[]} [props.timeWindow] - Array of two elements that represent a date range. The values can be anything that Date constructor can receive.
 * Events
 * @param  {function} [props.onPlay] - Event raised when the animation starts.
 * @param  {function} [props.onPause] - Event raised when the animation is paused.
 * @param  {function} [props.onStop] - Event raised when the animation is stopped.
 * @param  {function} [props.onTimelineUpdate] - Event raised when the timeline is updated. It happens when the animation is playing. The function receive as param the date that is being shown.
 * @param  {function} [props.onTimeWindowUpdate] - Event raised when the timeWindow is updated. It happens when the animation is playing with a timeWindow enabled. The function receive as param an array of two date objects.
 * @param  {object} [props.droppingFeaturesAlertProps] - Extra props to pass to [NoDataAlert]() when dropping feature.
 * @param  {boolean=} [props.showLegend] - Show/hide the legend. True by default only splitByCategory/multiple series mode.
 */
function TimeSeriesWidget({
  // Widget
  id,
  title,
  dataSource,

  column,
  operationColumn,
  joinOperation,
  operation,
  series,
  stepSizeOptions,
  global,
  onError,
  wrapperProps,
  noDataAlertProps,
  droppingFeaturesAlertProps,
  // UI
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  fitHeight,
  showControls,
  animation,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop,
  onTimelineUpdate,
  timeWindow,
  onTimeWindowUpdate,
  onStateChange,
  palette,
  showLegend,
  // Both
  stepSize,
  stepMultiplier,
  splitByCategory,
  splitByCategoryLimit,
  splitByCategoryValues
}) {
  const dispatch = useDispatch();

  const [selectedStepSize, setSelectedStepSize] = useState(stepSize);

  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      id,
      column: splitByCategory,
      type: FilterTypes.IN
    }) || EMPTY_ARRAY;

  if (showControls && global) {
    console.warn(
      'TimeSeriesWidget cannot show controls while using global mode. Controls will be hidden.'
    );
    showControls = false;
  }

  useEffect(() => {
    if (stepSize !== selectedStepSize) {
      setSelectedStepSize(stepSize);
    }
    // Only on stepSize update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSize]);

  const {
    data: result = [],
    isLoading,
    warning,
    remoteCalculation
  } = useWidgetFetch(getTimeSeries, {
    id,
    dataSource,
    params: {
      series,
      column,
      joinOperation,
      stepSize: selectedStepSize,
      stepMultiplier,
      operation,
      operationColumn,
      splitByCategory,
      splitByCategoryLimit,
      splitByCategoryValues
    },
    global,
    onError,
    onStateChange,
    attemptRemoteCalculation: _hasFeatureFlag(_FeatureFlags.REMOTE_WIDGETS)
  });

  const { data: unsafeData, categories } = Array.isArray(result)
    ? { data: result, categories: undefined }
    : { data: result.rows, categories: result.categories };

  // filter nulls, TODO remove when backend already fixes this
  const data = useMemo(() => unsafeData.filter((row) => row.name !== null), [unsafeData]);

  const minTime = useMemo(
    () => data.reduce((acc, { name }) => (name < acc ? name : acc), Number.MAX_VALUE),
    [data]
  );

  const handleTimeWindowUpdate = useCallback(
    (timeWindow) => {
      if (!isLoading) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.TIME,
            values: [timeWindow.map((date) => date.getTime?.() || date)],
            params: { offsetBy: minTime },
            owner: id
          })
        );

        if (onTimeWindowUpdate) onTimeWindowUpdate(timeWindow);
      }
    },
    [isLoading, dispatch, dataSource, column, minTime, id, onTimeWindowUpdate]
  );

  const handleTimelineUpdate = useCallback(
    (timelinePosition) => {
      if (!isLoading) {
        // TODO: new data model ?
        const { name: moment } = data[timelinePosition];
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.TIME,
            values: [[moment, calculateNextStep(moment, selectedStepSize) - 1]],
            params: { offsetBy: minTime },
            owner: id
          })
        );

        if (onTimelineUpdate) onTimelineUpdate(new Date(moment));
      }
    },
    [
      isLoading,
      data,
      dispatch,
      dataSource,
      column,
      selectedStepSize,
      minTime,
      id,
      onTimelineUpdate
    ]
  );

  const handleSelectedCategoriesChange = useCallback(
    (newSelectedCategories) => {
      if (!splitByCategory || !newSelectedCategories) return;

      if (newSelectedCategories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column: splitByCategory,
            type: FilterTypes.IN,
            values: newSelectedCategories,
            owner: id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column: splitByCategory,
            owner: id
          })
        );
      }
    },
    [splitByCategory, dispatch, dataSource, id]
  );

  const handleStop = useCallback(() => {
    dispatch(
      removeFilter({
        id: dataSource,
        column,
        owner: id
      })
    );

    if (onStop) onStop();
  }, [column, dataSource, id, dispatch, onStop]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenStepSizeMenu = (e) => {
    if (e?.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleCloseStepSizeMenu = () => {
    setAnchorEl(null);
  };

  const handleStepSizeUpdate = (stepSize) => {
    setSelectedStepSize(stepSize);
    handleCloseStepSizeMenu();
  };

  return (
    <>
      <WrapperWidgetUI
        title={title}
        isLoading={isLoading}
        {...wrapperProps}
        actions={[
          ...(wrapperProps?.actions || []),
          ...(stepSizeOptions?.length
            ? [
                {
                  id: 'a0',
                  name: 'Bucket size',
                  icon: <StepSizeIcon />,
                  action: handleOpenStepSizeMenu
                }
              ]
            : [])
        ]}
      >
        <WidgetWithAlert
          dataSource={dataSource}
          warning={warning}
          global={global}
          droppingFeaturesAlertProps={droppingFeaturesAlertProps}
          noDataAlertProps={noDataAlertProps}
          showDroppingFeaturesAlert={!remoteCalculation}
        >
          {(!!data.length || isLoading) && (
            <TimeSeriesWidgetUI
              data={data}
              categories={categories}
              stepSize={selectedStepSize}
              chartType={chartType}
              tooltip={tooltip}
              tooltipFormatter={tooltipFormatter}
              formatter={formatter}
              height={height}
              fitHeight={fitHeight}
              showControls={showControls}
              animation={animation}
              isPlaying={isPlaying}
              onPlay={onPlay}
              isPaused={isPaused}
              onPause={onPause}
              onStop={handleStop}
              onTimelineUpdate={handleTimelineUpdate}
              timeWindow={timeWindow}
              onTimeWindowUpdate={handleTimeWindowUpdate}
              selectedCategories={selectedCategories}
              onSelectedCategoriesChange={
                splitByCategory ? handleSelectedCategoriesChange : undefined
              }
              isLoading={isLoading}
              palette={palette}
              showLegend={showLegend}
            />
          )}
        </WidgetWithAlert>
      </WrapperWidgetUI>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseStepSizeMenu}
      >
        <MenuItem disabled>
          <Typography variant='caption' color='textSecondary'>
            Step size
          </Typography>
        </MenuItem>
        {stepSizeOptions.map((stepSize) => (
          <MenuItem
            key={stepSize}
            selected={selectedStepSize === stepSize}
            onClick={() => handleStepSizeUpdate(stepSize)}
          >
            {capitalize(stepSize)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

TimeSeriesWidget.propTypes = {
  // Widget
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  operationColumn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  joinOperation: columnAggregationOn('operationColumn'),
  series: PropTypes.arrayOf({
    operation: Object.values(AggregationTypes),
    operationColumn: PropTypes.string
  }),
  operation: PropTypes.oneOf(Object.values(AggregationTypes)),
  stepSizeOptions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(GroupDateTypes))),
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  droppingFeaturesAlertProps: PropTypes.object,
  // UI
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  formatter: PropTypes.func,
  height: PropTypes.string,
  fitHeight: PropTypes.bool,
  animation: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  isPaused: PropTypes.bool,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
  onTimelineUpdate: PropTypes.func,
  timeWindow: PropTypes.arrayOf(PropTypes.any),
  onTimeWindowUpdate: PropTypes.func,
  showControls: PropTypes.bool,
  chartType: PropTypes.oneOf(Object.values(TIME_SERIES_CHART_TYPES)),
  // Both
  stepSize: PropTypes.oneOf(Object.values(GroupDateTypes)).isRequired
};

TimeSeriesWidget.defaultProps = {
  // Widget
  operation: AggregationTypes.COUNT,
  stepSizeOptions: [],
  wrapperProps: {},
  noDataAlertProps: {},
  // UI
  tooltip: true,
  formatter: (value) => value,
  animation: true,
  isPlaying: false,
  isPaused: false,
  // timelinePosition: 0,
  timeWindow: [],
  showControls: true,
  chartType: TIME_SERIES_CHART_TYPES.LINE
};

export default TimeSeriesWidget;

// Aux
function StepSizeIcon() {
  return (
    <SvgIcon>
      <path
        d='M19 14l.3 1.5c.32.12.614.278.883.475l.197.155 1.45-.49 1 1.73-1.14 1c.069.429.078.68.03 1.065l-.03.205 1.14 1-1 1.73-1.45-.49c-.256.216-.538.394-.845.533l-.235.097L19 24h-2l-.3-1.51c-.32-.12-.614-.278-.883-.475l-.197-.155-1.45.49-1-1.73 1.14-1c-.067-.417-.078-.667-.033-1.028l.033-.232-1.14-1 1-1.73 1.45.49c.256-.216.538-.394.845-.533l.235-.097L17 14h2zM8 2v2h8V2h2v2h1c1.05 0 1.918.82 1.994 1.851L21 6v6h-2v-2H5v10h6v2H5c-1.06 0-1.919-.82-1.995-1.851L3 20l.01-14c0-1.05.802-1.918 1.84-1.994L5 4h1V2h2zm10 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1-11H5v2h14V6z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}
