import { Box, Button, Grid, SvgIcon, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TimeSeriesChart from './components/TimeSeriesChart';
import { TimeSeriesProvider, useTimeSeriesContext } from './hooks/TimeSeriesContext';
import { CHART_TYPES } from './utils/constants';
import { PropTypes } from 'prop-types';
import { GroupDateTypes } from '@carto/react-core';

const FORMAT_DATE_BY_STEP_SIZE = {
  [GroupDateTypes.DAYS]: daysCurrentDateRange,
  [GroupDateTypes.WEEKS]: weeksCurrentDateRange
};

const FORMAT_TIMEFRAME_BY_STEP_SIZE = {
  [GroupDateTypes.DAYS]: daysCurrentDateRange,
  [GroupDateTypes.WEEKS]: daysCurrentDateRange
};

const TIMEFRAME_STEP_BY_STEP_SIZE = {
  [GroupDateTypes.DAYS]: 60 * 60 * 24,
  [GroupDateTypes.WEEKS]: 60 * 60 * 24
};

function TimeSeriesWidgetUI({
  data,
  stepSize,
  chartType,
  duration,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  timelinePosition,
  onTimelineUpdate,
  timeframe,
  onTimeframeUpdate,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop
}) {
  const [animationStep, setAnimationStep] = useState(0);

  // Calculate animation step by duration
  useEffect(() => {
    if (duration && data.length) {
      setAnimationStep(duration / data.length);
    }
  }, [duration, data, setAnimationStep]);

  return (
    <TimeSeriesProvider
      animationStep={animationStep}
      isPlaying={isPlaying}
      onPlay={onPlay}
      isPaused={isPaused}
      onPause={onPause}
      onStop={onStop}
      timelinePosition={timelinePosition}
      onTimelineUpdate={onTimelineUpdate}
      timeframe={timeframe}
      onTimeframeUpdate={onTimeframeUpdate}
    >
      <TimeSeriesWidgetUIContent
        data={data}
        stepSize={stepSize}
        chartType={chartType}
        tooltip={tooltip}
        tooltipFormatter={tooltipFormatter}
        formatter={formatter}
        height={height}
        showControls={showControls}
      />
    </TimeSeriesProvider>
  );
}

TimeSeriesWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  stepSize: PropTypes.oneOf(Object.values(GroupDateTypes)).isRequired,
  chartType: PropTypes.oneOf(Object.values(CHART_TYPES)),
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
  showControls: PropTypes.bool
};

TimeSeriesWidgetUI.defaultProps = {
  data: [],
  chartType: CHART_TYPES.LINE,
  duration: 20000,
  tooltip: true,
  tooltipFormatter: defaultTooltipFormatter,
  formatter: (value) => value,
  isPlaying: false,
  isPaused: false,
  timelinePosition: 0,
  timeframe: [],
  showControls: true
};

export default TimeSeriesWidgetUI;

// Content is splitted from the default
// component to be able to use context
function TimeSeriesWidgetUIContent({
  data,
  stepSize,
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls
}) {
  const {
    isPlaying,
    isPaused,
    timeframe,
    timelinePosition,
    onTimelineUpdate,
    setTimelinePosition,
    setTimeframe,
    stop,
    togglePlay,
    animationStep
  } = useTimeSeriesContext();

  // If data changes, stop animation.
  // useDidMountEffect is used to avoid
  // being executed in the initial rendering
  useDidMountEffect(
    () => (isPlaying || isPaused) && stop(),
    // Only executed when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  useEffect(() => {
    if (isPlaying && !timeframe.length) {
      const interval = setInterval(
        () => setTimelinePosition((oldState) => Math.min(data.length - 1, oldState + 1)),
        animationStep
      );
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaying, animationStep]);

  useEffect(() => {
    if (isPlaying && timeframe.length === 2) {
      const timeframeStep = TIMEFRAME_STEP_BY_STEP_SIZE[stepSize];
      const interval = setInterval(() => {
        const msTimeframeStep = timeframeStep * 1000;
        const newTimeframe = [
          timeframe[0] + msTimeframeStep,
          timeframe[1] + msTimeframeStep
        ];
        if (newTimeframe[1] > data[data.length - 1].name) {
          stop();
          clearInterval(interval);
        } else {
          setTimeframe(newTimeframe);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [data, isPlaying, timeframe, stepSize, setTimeframe, stop]);

  useEffect(() => {
    if ((isPlaying || isPaused) && timelinePosition < data?.length && !timeframe.length) {
      // TODO: Maybe it's neccesary to delay this until markline animation is done
      onTimelineUpdate({ position: timelinePosition, data: data[timelinePosition] });

      if (isPlaying && timelinePosition === data.length - 1) {
        setTimeout(stop, animationStep * 2);
      }
    }
    // onTimelineUpdate and stop cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, timelinePosition, isPlaying, isPaused, animationStep]);

  const currentDate = useMemo(() => {
    if (!data.length) {
      return '';
    }

    if (timeframe.length) {
      const timeframeFormatter = FORMAT_TIMEFRAME_BY_STEP_SIZE[stepSize];
      return timeframe.map((time) => timeframeFormatter(new Date(time))).join(' - ');
    }

    const formatter = FORMAT_DATE_BY_STEP_SIZE[stepSize];

    if ((isPlaying || isPaused) && timelinePosition && data[timelinePosition]) {
      const currentDate = new Date(data[timelinePosition].name);
      return formatter(currentDate);
    }

    const firstDate = new Date(data[0].name);
    const lastDate = new Date(data[data.length - 1].name);

    return `${formatter(firstDate)} - ${formatter(lastDate)}`;
  }, [data, isPlaying, isPaused, timelinePosition, timeframe, stepSize]);

  const chart = (
    <TimeSeriesChart
      chartType={chartType}
      data={data}
      tooltip={tooltip}
      tooltipFormatter={(params) => tooltipFormatter(params, stepSize, formatter)}
      height={height}
    />
  );

  return (
    <Box>
      <Typography color='textSecondary' variant='caption'>
        {currentDate}
      </Typography>
      {showControls ? (
        <Grid container spacing={1} alignItems='flex-end'>
          <Grid item xs={1}>
            <Button
              size='small'
              color='primary'
              disabled={!(isPaused || isPlaying)}
              startIcon={<StopIcon />}
              onClick={stop}
            />
            <Box mt={0.5}>
              <Button
                size='small'
                color='primary'
                startIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                onClick={togglePlay}
              />
            </Box>
          </Grid>
          <Grid item xs={11}>
            {chart}
          </Grid>
        </Grid>
      ) : (
        chart
      )}
    </Box>
  );
}

// Auxiliary fns
function daysCurrentDateRange(date) {
  return date.toLocaleDateString();
}

function getMonday(d) {
  const day = d.getDay(),
    diff = d.getDate() - day + (day ? 1 : -6); // adjust when day is sunday
  d.setDate(diff);
  // Ignore hours
  d.setHours(0, 0, 0, 0);
  return d;
}

function weeksCurrentDateRange(date) {
  return `Week of ${getMonday(date).toLocaleDateString()}`;
}

function defaultTooltipFormatter(params, stepSize, valueFormatter) {
  const formatter = FORMAT_DATE_BY_STEP_SIZE[stepSize];
  const [name] = params[0].data;
  const date = new Date(name);
  const title = formatter(date);

  return `<div style='width: 160px;'>
    <p style='font-weight: 600; line-height: 1; margin: 4px 0;'>${title}</p>
    ${params
      .reduce((acc, serie) => {
        if (serie.value !== undefined && serie.value !== null) {
          const HTML = `<div style='display: flex; flex-direction: row; align-items: center; justify-content: space-between; height: 20px;'>
            <div style='display: flex; flex-direction: row; align-items: center; margin: 4px 0;'>
              <div style='width: 8px; height: 8px; margin-right: 4px; border-radius: 50%; background-color: ${
                serie.color
              }'></div>
            </div>
            <p style='line-height: 1;'>${valueFormatter(serie.data[1])}</p>
          </div>`;
          acc.push(HTML);
        }
        return acc;
      }, [])
      .join('')}
    </div>`;
}

function PlayIcon() {
  return (
    <SvgIcon>
      <path
        d='M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function StopIcon() {
  return (
    <SvgIcon>
      <path
        d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm4 4v8H8V8h8zm-2 2h-4v4h4v-4z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function PauseIcon() {
  return (
    <SvgIcon>
      <path
        d='M9,16 L11,16 L11,8 L9,8 L9,16 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M13,16 L15,16 L15,8 L13,8 L13,16 Z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

// Special useEffect that only
// works after the first rendering
function useDidMountEffect (func, deps) {
  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
  }, deps);
}