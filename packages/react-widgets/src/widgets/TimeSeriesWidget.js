import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSeries } from '../models';
import {
  addFilter,
  removeFilter,
  selectIsViewportFeaturesReadyForSource
} from '@carto/react-redux';
import {
  TimeSeriesWidgetUI,
  WrapperWidgetUI,
  TIME_SERIES_CHART_TYPES
} from '@carto/react-ui';
import {
  GroupDateTypes,
  AggregationTypes,
  _FilterTypes as FilterTypes
} from '@carto/react-core';
import { capitalize, Menu, MenuItem, SvgIcon, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useSourceFilters } from '..';
import NoDataAlert from './NoDataAlert';

// Due to the widget groups the data by a certain stepSize, when filtering
// the filter applied must be a range that represent the grouping range.
// For example, if you group the data by day, the range must
// start with a day and ends 24 hours later.
const STEP_SIZE_RANGE_MAPPING = {
  [GroupDateTypes.YEARS]: 60 * 60 * 24 * 365 * 1000,
  [GroupDateTypes.MONTHS]: 60 * 60 * 24 * 30 * 1000,
  [GroupDateTypes.WEEKS]: 60 * 60 * 24 * 7 * 1000,
  [GroupDateTypes.DAYS]: 60 * 60 * 24 * 1000
};

/**
 * Renders a <TimeSeriesWidget /> component
 * @param  props
 * @param  {string} props.id - ID for the widget instance.
 * @param  {string} props.title - Title to show in the widget header.
 * @param  {string} props.dataSource - ID of the data source to get the data from.
 * @param  {string} props.column - Name of the data source's date column for grouping the data.
 * @param  {string} [props.operationColumn] - Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.
 * @param  {string} [props.operation] - Operation to apply to the operationColumn. Operation used by default is COUNT. Must be one of those defined in `AggregationTypes` object.
 * @param  {string} props.stepSize - Step applied to group the data. Must be one of those defined in `GroupDateTypes` object.
 * @param  {string[]} [props.stepSizeOptions] - Different steps that can be applied to group the data. If filled, an icon with a menu appears to change between steps. Every value must be one of those defined in `AggregationTypes` object.
 * @param  {string} [props.chartType] - Chart used to represent the time serie. Must be one of those defined in `TIME_SERIES_CHART_TYPES` object.
 * @param  {number} [props.duration] - Duration of the animation in milliseconds. 20s by default.
 * @param  {boolean} [props.tooltip] - Enable/disable tooltip.
 * @param  {function} [props.tooltipFormatter] - Function that returns the HTML for the chart tooltip.
 * @param  {function} [props.formatter] - Function for formatting the value that is represented in the tooltip.
 * @param  {string} [props.height] - Height of the chart.
 * @param  {boolean} [props.showControls] - Enable/disable animation controls (play, pause, stop, speed). True by default.
 * @param  {string} props.operation - Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.
 * @param  {function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Object} [props.wrapperProps] - Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default)
 * @param  {Object} [props.noDataAlertProps] - Extra props to pass to [NoDataAlert]()
 * Internal state
 * @param  {boolean} [props.isPlaying] - If true, the animation starts.
 * @param  {boolean} [props.isPaused] - If true and isPlaying false, the animation is paused.
 * @param  {any[]} [props.timeWindow] - Array of two elements that represent a date range. The values can be anything that Date constructor can receive.
 * Events
 * @param  {function} [props.onPlay] - Event raised when the animation starts.
 * @param  {function} [props.onPause] - Event raised when the animation is paused.
 * @param  {function} [props.onTimelineUpdate] - Event raised when the timeline is updated. It happens when the animation is playing. The function receive as param the date that is being shown.
 * @param  {function} [props.onTimeWindowUpdate] - Event raised when the timeWindow is updated. It happens when the animation is playing with a timeWindow enabled. The function receive as param an array of two date objects.
 */
function TimeSeriesWidget({
  // Widget
  id,
  title,
  dataSource,
  column,
  operationColumn,
  operation,
  stepSizeOptions,
  onError,
  wrapperProps,
  noDataAlertProps,
  // UI
  chartType,
  duration,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop,
  // TODO: timelinePosition isn't prepared for the released.
  // Its content is too complicated for TimeSeriesWidget.
  // If you want to use timelinePosition, use TimeSeriesWidgetUI.
  // timelinePosition,
  onTimelineUpdate,
  timeWindow,
  onTimeWindowUpdate,
  // Both
  stepSize
}) {
  const dispatch = useDispatch();

  const isSourceReady = useSelector((state) =>
    selectIsViewportFeaturesReadyForSource(state, dataSource)
  );
  const filters = useSourceFilters({ dataSource, id });

  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [selectedStepSize, setSelectedStepSize] = useState(stepSize);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stepSize !== selectedStepSize) {
      setSelectedStepSize(stepSize);
    }
    // Only on bucketSize update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSize]);

  useEffect(() => {
    setIsLoading(true);

    if (isSourceReady) {
      getTimeSeries({
        filters,
        dataSource,
        column,
        stepSize: selectedStepSize,
        operationColumn,
        operation
      })
        .then((data) => {
          if (data) {
            setIsLoading(false);
            setTimeSeriesData(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (onError) onError(error);
        });
    }
  }, [
    id,
    filters,
    dataSource,
    column,
    selectedStepSize,
    isSourceReady,
    setIsLoading,
    operationColumn,
    operation,
    onError
  ]);

  const handleTimeWindowUpdate = useCallback(
    (timeWindow) => {
      dispatch(
        addFilter({
          id: dataSource,
          column,
          type: FilterTypes.BETWEEN,
          values: [timeWindow.map((date) => date.getTime?.() || date)],
          owner: id
        })
      );

      if (onTimeWindowUpdate) onTimeWindowUpdate(timeWindow);
    },
    [column, dataSource, dispatch, id, onTimeWindowUpdate]
  );

  const handleTimelineUpdate = useCallback(
    (timelinePosition) => {
      const { name: moment } = timeSeriesData[timelinePosition];
      dispatch(
        addFilter({
          id: dataSource,
          column,
          type: FilterTypes.BETWEEN,
          values: [moment, moment + STEP_SIZE_RANGE_MAPPING[selectedStepSize]],
          owner: id
        })
      );

      if (onTimelineUpdate) onTimelineUpdate(new Date(moment));
    },
    [column, dataSource, dispatch, id, onTimelineUpdate, selectedStepSize, timeSeriesData]
  );

  const handleStop = useCallback(() => {
    dispatch(
      removeFilter({
        id: dataSource,
        column
      })
    );

    if (onStop) onStop();
  }, [column, dataSource, dispatch, onStop]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenBucketSizeMenu = (e) => {
    if (e?.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleCloseBucketSizeMenu = () => {
    setAnchorEl(null);
  };

  const handleStepSizeUpdate = (stepSize) => {
    setSelectedStepSize(stepSize);
    handleCloseBucketSizeMenu();
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
                  action: handleOpenBucketSizeMenu
                }
              ]
            : [])
        ]}
      >
        {timeSeriesData.length || isLoading ? (
          <TimeSeriesWidgetUI
            data={timeSeriesData}
            stepSize={selectedStepSize}
            chartType={chartType}
            duration={duration}
            tooltip={tooltip}
            tooltipFormatter={tooltipFormatter}
            formatter={formatter}
            height={height}
            showControls={showControls}
            isPlaying={isPlaying}
            onPlay={onPlay}
            isPaused={isPaused}
            onPause={onPause}
            onStop={handleStop}
            // timelinePosition={timelinePosition}
            onTimelineUpdate={handleTimelineUpdate}
            timeWindow={timeWindow}
            onTimeWindowUpdate={handleTimeWindowUpdate}
          />
        ) : (
          <NoDataAlert {...noDataAlertProps} />
        )}
      </WrapperWidgetUI>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseBucketSizeMenu}
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
  operationColumn: PropTypes.string,
  operation: PropTypes.oneOf(Object.values(AggregationTypes)).isRequired,
  stepSizeOptions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(GroupDateTypes))),
  onError: PropTypes.func,
  wrapperProps: PropTypes.object,
  noDataAlertProps: PropTypes.object,
  // UI
  duration: PropTypes.number,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  formatter: PropTypes.func,
  height: PropTypes.number,
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  isPaused: PropTypes.bool,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
  // timelinePosition: PropTypes.number,
  onTimelineUpdate: PropTypes.func,
  timeWindow: PropTypes.arrayOf(PropTypes.number),
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
  duration: 20000,
  tooltip: true,
  formatter: (value) => value,
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
