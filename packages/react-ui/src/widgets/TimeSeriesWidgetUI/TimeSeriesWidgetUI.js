import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  Box,
  Menu,
  Grid,
  IconButton,
  MenuItem,
  SvgIcon,
  capitalize,
  Link,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';

import { GroupDateTypes } from '@carto/react-core';

import TimeSeriesChart from './components/TimeSeriesChart';
import TimeSeriesLegend from './components/TimeSeriesLegend';
import { TimeSeriesProvider, useTimeSeriesContext } from './hooks/TimeSeriesContext';
import { CHART_TYPES } from './utils/constants';
import Typography from '../../components/atoms/Typography';
import TimeSeriesSkeleton from './components/TimeSeriesSkeleton';
import {
  yearCurrentDateRange,
  monthsCurrentDateRange,
  weeksCurrentDateRange,
  daysCurrentDateRange,
  hoursCurrentDateRange,
  minutesCurrentDateRange,
  secondsCurrentDateRange
} from './utils/timeFormat';
import { getColorByCategory } from '../utils/colorUtils';
import { commonPalette } from '../../theme/sections/palette';

const FORMAT_DATE_BY_STEP_SIZE = {
  [GroupDateTypes.YEARS]: yearCurrentDateRange,
  [GroupDateTypes.MONTHS]: monthsCurrentDateRange,
  [GroupDateTypes.WEEKS]: weeksCurrentDateRange,
  [GroupDateTypes.DAYS]: daysCurrentDateRange,
  [GroupDateTypes.HOURS]: hoursCurrentDateRange,
  [GroupDateTypes.MINUTES]: minutesCurrentDateRange,
  [GroupDateTypes.SECONDS]: secondsCurrentDateRange
};

const FORMAT_DATE_BY_STEP_SIZE_FOR_TIME_WINDOW = {
  [GroupDateTypes.YEARS]: daysCurrentDateRange,
  [GroupDateTypes.MONTHS]: daysCurrentDateRange,
  [GroupDateTypes.WEEKS]: daysCurrentDateRange,
  [GroupDateTypes.DAYS]: daysCurrentDateRange,
  [GroupDateTypes.HOURS]: hoursCurrentDateRange,
  [GroupDateTypes.MINUTES]: minutesCurrentDateRange,
  [GroupDateTypes.SECONDS]: secondsCurrentDateRange
};

// TimeWindow step is the amount of time (in seconds) that pass in every iteration during the animation.
// It depends on step size for a better animation speed adjustment.
const TIME_WINDOW_STEP_BY_STEP_SIZE = {
  [GroupDateTypes.YEARS]: 60 * 60 * 24 * 7, // Week
  [GroupDateTypes.MONTHS]: 60 * 60 * 24, // Day
  [GroupDateTypes.WEEKS]: 60 * 60 * 24, // Day
  [GroupDateTypes.DAYS]: 60 * 60 * 12, // Half day
  [GroupDateTypes.HOURS]: 60 * 60, // Hour
  [GroupDateTypes.MINUTES]: 60 * 15, // Quarter hour,
  [GroupDateTypes.SECONDS]: 1 // Second,
};

const SPEED_FACTORS = [0.5, 1, 2, 3];

function TimeSeriesWidgetUI({
  data,
  stepSize,
  stepMultiplier = 1,
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  animation,
  timelinePosition,
  onTimelineUpdate,
  timeWindow,
  onTimeWindowUpdate,
  selectedCategories,
  onSelectedCategoriesChange,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop,
  isLoading,
  palette,
  showLegend
}) {
  if (isLoading) return <TimeSeriesSkeleton height={height} />;

  return (
    <TimeSeriesProvider
      isPlaying={isPlaying}
      onPlay={onPlay}
      isPaused={isPaused}
      onPause={onPause}
      onStop={onStop}
      timelinePosition={timelinePosition}
      onTimelineUpdate={onTimelineUpdate}
      timeWindow={timeWindow}
      onTimeWindowUpdate={onTimeWindowUpdate}
    >
      <TimeSeriesWidgetUIContent
        data={data}
        stepSize={stepSize}
        stepMultiplier={stepMultiplier}
        chartType={chartType}
        tooltip={tooltip}
        tooltipFormatter={tooltipFormatter}
        formatter={formatter}
        height={height}
        showControls={showControls}
        animation={animation}
        palette={palette}
        showLegend={showLegend}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={onSelectedCategoriesChange}
      />
    </TimeSeriesProvider>
  );
}

TimeSeriesWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.number,
      value: PropTypes.number,
      category: PropTypes.string
    })
  ).isRequired,
  stepSize: PropTypes.oneOf(Object.values(GroupDateTypes)).isRequired,
  stepMultiplier: PropTypes.number,
  chartType: PropTypes.oneOf(Object.values(CHART_TYPES)),
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  formatter: PropTypes.func,
  height: PropTypes.string,
  animation: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  isPaused: PropTypes.bool,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
  timelinePosition: PropTypes.number,
  onTimelineUpdate: PropTypes.func,
  timeWindow: PropTypes.arrayOf(PropTypes.any),
  onTimeWindowUpdate: PropTypes.func,
  showControls: PropTypes.bool,
  isLoading: PropTypes.bool,
  palette: PropTypes.arrayOf(PropTypes.string),
  showLegend: PropTypes.bool
};

TimeSeriesWidgetUI.defaultProps = {
  data: [],
  chartType: CHART_TYPES.LINE,
  tooltip: true,
  tooltipFormatter: defaultTooltipFormatter,
  formatter: (value) => value,
  animation: true,
  isPlaying: false,
  isPaused: false,
  timelinePosition: 0,
  timeWindow: [],
  showControls: true,
  isLoading: false,
  palette: Object.values(commonPalette.qualitative.bold)
};

export default TimeSeriesWidgetUI;

// Content is splitted from the default
// component to be able to use context
function TimeSeriesWidgetUIContent({
  data,
  stepSize,
  stepMultiplier,
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  animation,
  palette,
  selectedCategories,
  onSelectedCategoriesChange,
  showLegend
}) {
  const theme = useTheme();
  const fallbackColor = theme.palette.secondary.main;

  const [anchorSpeedEl, setAnchorSpeedEl] = useState(null);
  const [speed, setSpeed] = useState(1);
  const {
    isPlaying,
    isPaused,
    timeWindow,
    timelinePosition,
    setTimelinePosition,
    setTimeWindow,
    stop,
    togglePlay
  } = useTimeSeriesContext();
  const animationRef = useRef({ animationFrameId: null, timeoutId: null });

  const { series, categories } = useMemo(() => {
    const series = [];

    const categories = [];
    const colorMapping = {};

    // TODO: decide if we use common model for multiple series and splitByCategory
    // as `splitByCategory` is less optimal and with common model we have "join" and then "split" data
    // why common model?
    // some other commponents are relying on old layout of data

    // const firstSerieEntry = data[0];
    // if (
    //   firstSerieEntry &&
    //   Array.isArray(firstSerieEntry.data) &&
    //   firstSerieEntry.category
    // ) {
    //   // multiple series model
    //   // array of objects {data, category}
    //   for (const { data: seriesDataRaw, category } of data) {
    //     categories.push(category);
    //     series.push({
    //       category,
    //       data: seriesDataRaw.map(({ name, value }) => [name, value])
    //     });
    //   }
    // } else {

    // splitByCategory model
    // one array, with category embedded: { name: 1009843200000, category: 'DECEPTIVE PRACTICE', value: 6 }
    for (const { name, value, category } of data) {
      let dataSeriesIndex = category ? categories.indexOf(category) : 0;
      if (dataSeriesIndex === -1) {
        dataSeriesIndex = categories.length;
        categories.push(category);
      }
      if (!series[dataSeriesIndex]) {
        series[dataSeriesIndex] = {
          category,
          data: []
        };
      }
      series[dataSeriesIndex].data.push([name, value]);
    }
    // }

    series.forEach(({ category }, i) => {
      series[i].color = getColorByCategory(category, {
        palette,
        fallbackColor,
        colorMapping
      });
    });

    return { series, categories };
  }, [data, palette, fallbackColor]);

  // If data changes, stop animation. useDidMountEffect is used to avoid
  // being executed in the initial rendering because that cause
  // resetting (stop) the state settled by the user using props.
  useDidMountEffect(
    () => (isPlaying || isPaused) && stop(),
    // Only executed when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const stopAnimation = () => {
    const { animationFrameId, timeoutId } = animationRef.current;
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleStop = useCallback(() => {
    stopAnimation();
    stop();
    onSelectedCategoriesChange?.([]);
  }, [stop, onSelectedCategoriesChange]);

  const handleTogglePlay = () => {
    stopAnimation();
    togglePlay();
  };

  // Running timeWindow
  useEffect(() => {
    if (isPlaying && timeWindow.length === 2 && data.length) {
      const timeWindowStep = TIME_WINDOW_STEP_BY_STEP_SIZE[stepSize];
      const msTimeWindowStep = timeWindowStep * 1000;

      animateTimeWindow({
        data,
        timeWindow,
        msTimeWindowStep: msTimeWindowStep * speed,
        drawFrame: (newTimeWindow) => {
          setTimeWindow(newTimeWindow);
        },
        onEnd: () => {
          // To show the last item, wait a moment
          setTimeout(handleStop, 250);
        },
        animationRef
      });

      return () => stopAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaying, stepSize, setTimeWindow, handleStop, speed]);

  // Running timeline
  useEffect(() => {
    if (isPlaying && !timeWindow.length && data.length) {
      animateTimeline({
        speed,
        timelinePosition,
        data,
        drawFrame: (newTimelinePosition) => {
          setTimelinePosition(newTimelinePosition);
        },
        onEnd: () => {
          setTimeout(handleStop, 250);
        },
        animationRef
      });

      return () => stopAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPlaying, speed, timeWindow.length, handleStop, setTimelinePosition]);

  const currentDate = useMemo(() => {
    if (!data.length) {
      return '';
    }

    // If timeWindow is activated
    if (timeWindow.length) {
      const timeWindowformatter = FORMAT_DATE_BY_STEP_SIZE_FOR_TIME_WINDOW[stepSize];
      return timeWindow.map((time) => timeWindowformatter(new Date(time))).join(' - ');
    }

    const formatter = FORMAT_DATE_BY_STEP_SIZE[stepSize];

    // If widget is reset, then first and last date
    if (!isPlaying && !isPaused) {
      const firstDate = new Date(data[0].name);
      const lastDate = new Date(data[data.length - 1].name);

      return `${formatter(firstDate)} - ${formatter(lastDate)}`;
    }

    // If animation is active
    if (timelinePosition >= 0 && data[timelinePosition]) {
      const currentDate = new Date(data[timelinePosition].name);
      return formatter(currentDate);
    }
  }, [data, stepSize, isPlaying, isPaused, timeWindow, timelinePosition]);

  const showClearButton = useMemo(() => {
    return (
      isPlaying || isPaused || timeWindow.length > 0 || selectedCategories?.length > 0
    );
  }, [isPaused, isPlaying, selectedCategories?.length, timeWindow.length]);

  const handleOpenSpeedMenu = (e) => {
    if (e?.currentTarget) {
      setAnchorSpeedEl(e.currentTarget);
    }
  };

  const handleCloseSpeedMenu = () => {
    setAnchorSpeedEl(null);
  };

  const handleSpeedUpdate = (newSpeed) => {
    setSpeed(newSpeed);
    handleCloseSpeedMenu();
  };

  const handleCategoryClick = useCallback(
    (category) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];

        const selectedCategoryIdx = newSelectedCategories.indexOf(category);
        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(category);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [onSelectedCategoriesChange, selectedCategories]
  );

  const isLegendVisible = Boolean(
    showLegend !== undefined ? showLegend : series.length > 1
  );

  const chart = (
    <TimeSeriesChart
      chartType={chartType}
      data={data}
      series={series}
      categories={categories}
      tooltip={tooltip}
      formatter={formatter}
      tooltipFormatter={(params) =>
        tooltipFormatter(params, stepSize, formatter, stepMultiplier, isLegendVisible)
      }
      height={height}
      animation={animation}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
    />
  );

  const legend = isLegendVisible && (
    <TimeSeriesLegend
      series={series}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
    />
  );
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {!!currentDate && (
          <Box>
            <Typography color='textSecondary' variant='caption'>
              {currentDate}
            </Typography>
            <Typography fontSize={12} ml={1} color='textSecondary' variant='caption'>
              ({capitalize(stepSize)})
            </Typography>
          </Box>
        )}
        {showClearButton && (
          <Link
            variant='caption'
            style={{ cursor: 'pointer' }}
            onClick={handleStop}
            underline='hover'
          >
            Clear
          </Link>
        )}
      </Box>
      {showControls ? (
        <Grid container alignItems='flex-end'>
          <Grid item xs={1}>
            <IconButton
              size='small'
              color='default'
              onClick={handleOpenSpeedMenu}
              data-testid='clock'
            >
              <ClockIcon />
            </IconButton>
            <Menu
              anchorEl={anchorSpeedEl}
              keepMounted
              open={Boolean(anchorSpeedEl)}
              onClose={handleCloseSpeedMenu}
            >
              <MenuItem disabled>
                <Typography variant='caption' color='textSecondary'>
                  Speed
                </Typography>
              </MenuItem>
              {SPEED_FACTORS.map((speedItem) => (
                <MenuItem
                  key={speedItem}
                  selected={speedItem === speed}
                  onClick={() => handleSpeedUpdate(speedItem)}
                >
                  {speedItem}x
                </MenuItem>
              ))}
            </Menu>
            <Box mt={2}>
              <IconButton
                size='small'
                color='primary'
                disabled={!(isPaused || isPlaying)}
                onClick={handleStop}
                data-testid='stop'
              >
                <StopIcon />
              </IconButton>
            </Box>
            <Box mt={0.75}>
              <IconButton
                data-testid='play-pause'
                size='small'
                color='primary'
                onClick={handleTogglePlay}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={11}>
            {chart}
          </Grid>
          {legend}
        </Grid>
      ) : (
        <>
          {chart}
          {legend}
        </>
      )}
    </Box>
  );
}

function defaultTooltipFormatter(
  params,
  stepSize,
  valueFormatter,
  stepMultiplier,
  showNames
) {
  const formatter = FORMAT_DATE_BY_STEP_SIZE[stepSize];
  const [name] = params[0].data;
  const date = new Date(name);
  const title = formatter(date, stepMultiplier);

  return `<div style='minWidth: 160px;'>
    <p style='font-weight: 600; line-height: 1; margin: 4px 0;'>${title}</p>
    ${params
      .reduce((acc, serie) => {
        if (serie.value !== undefined && serie.value !== null) {
          const HTML = `<div style='display: flex; flex-direction: row; align-items: center; justify-content: spread; height: 20px; gap: 8px;'>
            <div style='display: flex; flex-direction: row; align-items: center; margin: 4px 0;'>
              <div style='width: 8px; height: 8px; margin-right: 4px; border-radius: 50%; border: 2px solid ${
                serie.color
              }'></div>
            </div>
            <p style='line-height: 1; flex: 1; margin-left: 0.5em; min-width: 20px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; align-self: left;'>
            ${showNames && serie.seriesName ? `${serie.seriesName}</p>` : ''}
            </p>
            <p style='line-height: 1; justify-self: flex-end;'>${valueFormatter(
              serie.data[1]
            )}</p>
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
    <SvgIcon data-testid='play-icon'>
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
    <SvgIcon data-testid='pause-icon'>
      <path
        d='M9,16 L11,16 L11,8 L9,8 L9,16 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M13,16 L15,16 L15,8 L13,8 L13,16 Z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

function ClockIcon() {
  return (
    <SvgIcon viewBox='0 0 20 20'>
      <path
        d='M12.5 1.254h-5v1.667h5V1.254zM9.167 12.088h1.666v-5H9.167v5zm6.691-5.517 1.184-1.183a9.207 9.207 0 0 0-1.175-1.175l-1.184 1.183A7.468 7.468 0 0 0 10 3.746a7.5 7.5 0 0 0-7.5 7.5c0 4.141 3.35 7.5 7.5 7.5s7.5-3.358 7.5-7.5a7.504 7.504 0 0 0-1.642-4.675zM10 17.088a5.83 5.83 0 0 1-5.833-5.834A5.83 5.83 0 0 1 10 5.421a5.83 5.83 0 0 1 5.833 5.833A5.83 5.83 0 0 1 10 17.087z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

// Special useEffect that only
// works after the first rendering
function useDidMountEffect(func, deps = []) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function animateTimeWindow({
  msTimeWindowStep,
  timeWindow,
  data,
  drawFrame,
  onEnd,
  animationRef
}) {
  let currentTimeWindow = timeWindow;

  const fireAnimation = () => {
    animationRef.current.animationFrameId = window.requestAnimationFrame(animate);
  };

  const animate = () => {
    currentTimeWindow = [
      currentTimeWindow[0] + msTimeWindowStep,
      currentTimeWindow[1] + msTimeWindowStep
    ];
    if (currentTimeWindow[1] > data[data.length - 1].name) {
      onEnd();
    } else {
      drawFrame(currentTimeWindow);
      fireAnimation();
    }
  };

  fireAnimation();
}

const MIN_FPS = 2;

function animateTimeline({
  speed,
  timelinePosition,
  data,
  drawFrame,
  onEnd,
  animationRef
}) {
  let currentTimeline = timelinePosition;

  const fpsToUse =
    Math.max(
      Math.round(Math.sqrt(data.length) / 2), // FPS based on data length
      MIN_FPS // Min FPS
    ) * speed;

  const fireAnimation = () => {
    animationRef.current.timeoutId = setTimeout(() => {
      animationRef.current.animationFrameId = window.requestAnimationFrame(animate);
    }, 1000 / fpsToUse);
  };

  const animate = () => {
    currentTimeline = Math.min(data.length, currentTimeline + 1);
    if (currentTimeline === data.length) {
      onEnd();
    } else {
      drawFrame(currentTimeline);
      fireAnimation();
    }
  };

  fireAnimation();
}
