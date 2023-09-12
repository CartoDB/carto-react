import React, { useMemo, useCallback } from 'react';
import { Box, capitalize, Link, useTheme } from '@mui/material';

import TimeSeriesChart from './components/TimeSeriesChart';
import TimeSeriesLegend from './components/TimeSeriesLegend';
import { TimeSeriesProvider, useTimeSeriesContext } from './hooks/TimeSeriesContext';
import { CHART_TYPES } from './utils/constants';
import PropTypes from 'prop-types';
import { GroupDateTypes, getMonday } from '@carto/react-core';
import Typography from '../../components/atoms/Typography';
import TimeSeriesSkeleton from './components/TimeSeriesSkeleton';
import { getColorByCategory } from '../utils/colorUtils';
import { commonPalette } from '../../theme/sections/palette';
import { TimeSeriesControls } from './components/TimeSeriesControls';
import TimeSeriesLayout from './components/TimeSeriesLayout';

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

function TimeSeriesWidgetUI({
  data,
  categories,
  stepSize,
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
  if (isLoading)
    return (
      <TimeSeriesSkeleton
        height={height}
        showControls={showControls}
        showLegend={showLegend}
      />
    );

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
        categories={categories}
        stepSize={stepSize}
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
  categories: PropTypes.arrayOf(PropTypes.string),
  stepSize: PropTypes.oneOf(Object.values(GroupDateTypes)).isRequired,
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
  categories,
  stepSize,
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

  const { isPlaying, isPaused, timeWindow, timelinePosition, stop } =
    useTimeSeriesContext();

  const series = useMemo(() => {
    const colorMapping = {};
    const series = categories
      ? categories.map((category) => ({
          category,
          data: [],
          color: getColorByCategory(category, {
            palette,
            fallbackColor,
            colorMapping
          })
        }))
      : [{ data: [], color: theme.palette.secondary.main }];

    for (const { name, value, category } of data) {
      const categoryIndex = categories && category ? categories.indexOf(category) : 0;
      if (categoryIndex === -1) continue;

      series[categoryIndex].data.push([name, value]);
    }

    return series;
  }, [categories, data, palette, fallbackColor, theme.palette.secondary.main]);

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

  const handleStop = () => {
    stop();
    onSelectedCategoriesChange?.([]);
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

  const header = (
    <>
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
    </>
  );

  const controls = showControls && <TimeSeriesControls data={data} stepSize={stepSize} />;

  const chart = (
    <TimeSeriesChart
      chartType={chartType}
      data={data}
      series={series}
      categories={categories}
      tooltip={tooltip}
      formatter={formatter}
      tooltipFormatter={(params) =>
        tooltipFormatter(params, stepSize, formatter, isLegendVisible)
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
      onCategoryClick={onSelectedCategoriesChange && handleCategoryClick}
    />
  );

  return (
    <TimeSeriesLayout header={header} controls={controls} chart={chart} legend={legend} />
  );
}

// Auxiliary fns
function secondsCurrentDateRange(date) {
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      second: '2-digit'
    })
  );
}

function minutesCurrentDateRange(date) {
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  );
}

function hoursCurrentDateRange(date) {
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString(undefined, { hour: 'numeric', hour12: true })
  );
}

function daysCurrentDateRange(date) {
  return date.toLocaleDateString();
}

function weeksCurrentDateRange(date) {
  return `Week of ${new Date(getMonday(date)).toLocaleDateString()}`;
}

function yearCurrentDateRange(date) {
  return date.getFullYear();
}

function monthsCurrentDateRange(date) {
  return formatMonth(date) + '/' + date.getFullYear();
}

function formatMonth(date) {
  return ('0' + (date.getMonth() + 1)).slice(-2);
}

function defaultTooltipFormatter(params, stepSize, valueFormatter, showNames) {
  const formatter = FORMAT_DATE_BY_STEP_SIZE[stepSize];
  const [name] = params[0].data;
  const date = new Date(name);
  const title = formatter(date);

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
