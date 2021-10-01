import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSeries } from '../models';
import {
  addFilter,
  removeFilter,
  selectIsViewportFeaturesReadyForSource
} from '@carto/react-redux';
import {
  NoDataAlert,
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

const BUCKET_SIZE_RANGE_MAPPING = {
  [GroupDateTypes.WEEKS]: 60 * 60 * 24 * 7,
  [GroupDateTypes.DAYS]: 60 * 60 * 24
};

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
  timelinePosition,
  onTimelineUpdate,
  timeframe,
  onTimeframeUpdate,
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

  const handleTimeframeUpdate = useCallback(
    (timeframe) => {
      dispatch(
        addFilter({
          id: dataSource,
          column,
          type: FilterTypes.BETWEEN,
          values: [timeframe],
          owner: id
        })
      );

      if (onTimeframeUpdate) onTimeframeUpdate();
    },
    [column, dataSource, dispatch, id, onTimeframeUpdate]
  );

  const handleTimelineUpdate = useCallback(
    (timelinePosition) => {
      const { name: moment } = timeSeriesData[timelinePosition];
      handleTimeframeUpdate([
        moment,
        moment + BUCKET_SIZE_RANGE_MAPPING[selectedStepSize] * 1000
      ]);

      if (onTimelineUpdate) onTimelineUpdate();
    },
    [handleTimeframeUpdate, onTimelineUpdate, selectedStepSize, timeSeriesData]
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
        {!timeSeriesData.length ? (
          <NoDataAlert {...noDataAlertProps} />
        ) : (
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
            timelinePosition={timelinePosition}
            onTimelineUpdate={handleTimelineUpdate}
            timeframe={timeframe}
            onTimeframeUpdate={handleTimeframeUpdate}
          />
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
  timelinePosition: PropTypes.number,
  onTimelineUpdate: PropTypes.func,
  timeframe: PropTypes.arrayOf(PropTypes.number),
  onTimeframeUpdate: PropTypes.func,
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
  timelinePosition: 0,
  timeframe: [],
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
