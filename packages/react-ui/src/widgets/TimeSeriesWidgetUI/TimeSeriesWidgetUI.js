import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Box, Link, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import { GroupDateTypes } from '@carto/react-core';

import TimeSeriesChart from './components/TimeSeriesChart';
import { TimeSeriesProvider, useTimeSeriesContext } from './hooks/TimeSeriesContext';
import { CHART_TYPES } from './utils/constants';
import Typography from '../../components/atoms/Typography';
import TimeSeriesSkeleton from './components/TimeSeriesSkeleton';
import { formatTimeRange, formatBucketRange } from './utils/timeFormat';
import { getColorByCategory } from '../../utils/palette';
import { commonPalette } from '../../theme/sections/palette';
import { TimeSeriesControls } from './components/TimeSeriesControls';
import TimeSeriesLayout from './components/TimeSeriesLayout';
import ChartLegend from '../ChartLegend';
import { findItemIndexByTime, getDate } from './utils/utilities';
function TimeSeriesWidgetUI({
  data,
  categories,
  stepSize,
  stepMultiplier = 1,
  chartType,
  timeAxisSplitNumber,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  fitHeight,
  showControls,
  animation,
  filterable,
  onTimelineUpdate,
  timeWindow,
  timelinePosition,
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
  let prevEmittedTimeWindow = useRef();
  const intl = useIntl();
  const handleTimeWindowUpdate = useCallback(
    (timeWindow) => {
      if (timeWindow.length === 2) {
        if (prevEmittedTimeWindow.current?.length === 1) {
          onTimelineUpdate?.(undefined);
        }
        const sorted = timeWindow
          .sort((timeA, timeB) => (timeA < timeB ? -1 : 1))
          .map(getDate);
        onTimeWindowUpdate?.(sorted);
      }

      if (timeWindow.length === 1) {
        if (prevEmittedTimeWindow.current?.length === 2) {
          onTimeWindowUpdate?.([]);
        }
        const itemIndex = findItemIndexByTime(timeWindow[0], data);
        onTimelineUpdate?.(itemIndex);
      }

      prevEmittedTimeWindow.current = timeWindow;

      // Only executed when timeWindow changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [onTimeWindowUpdate, onTimelineUpdate, data]
  );

  const content = isLoading ? (
    <TimeSeriesSkeleton
      fitHeight={fitHeight}
      height={height}
      showControls={showControls}
      showLegend={showLegend}
    />
  ) : (
    <TimeSeriesWidgetUIContent
      data={data}
      categories={categories}
      stepSize={stepSize}
      stepMultiplier={stepMultiplier}
      chartType={chartType}
      timeAxisSplitNumber={timeAxisSplitNumber}
      tooltip={tooltip}
      tooltipFormatter={tooltipFormatter}
      formatter={formatter}
      height={height}
      fitHeight={fitHeight}
      showControls={showControls}
      animation={animation}
      filterable={filterable}
      palette={palette}
      showLegend={showLegend}
      selectedCategories={selectedCategories}
      timelinePosition={timelinePosition}
      onSelectedCategoriesChange={onSelectedCategoriesChange}
    />
  );

  return (
    <TimeSeriesProvider
      isPlaying={isPlaying}
      onPlay={onPlay}
      isPaused={isPaused}
      onPause={onPause}
      onStop={onStop}
      timeWindow={timeWindow}
      onTimeWindowUpdate={handleTimeWindowUpdate}
      intl={intl}
    >
      {content}
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
  stepMultiplier: PropTypes.number,
  chartType: PropTypes.oneOf(Object.values(CHART_TYPES)),
  timeAxisSplitNumber: PropTypes.number,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  formatter: PropTypes.func,
  height: PropTypes.string,
  fitHeight: PropTypes.bool,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
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
  showLegend: PropTypes.bool,
  intl: PropTypes.object
};

TimeSeriesWidgetUI.defaultProps = {
  data: [],
  chartType: CHART_TYPES.LINE,
  tooltip: true,
  tooltipFormatter: defaultTooltipFormatter,
  formatter: (value) => value,
  animation: true,
  filterable: true,
  isPlaying: false,
  isPaused: false,
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
  stepMultiplier,
  chartType,
  timeAxisSplitNumber,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  fitHeight,
  showControls,
  animation,
  filterable,
  palette,
  selectedCategories,
  onSelectedCategoriesChange,
  showLegend,
  timelinePosition
}) {
  const theme = useTheme();
  const fallbackColor = theme.palette.secondary.main;

  const { isPlaying, isPaused, timeWindow, stop, setTimeWindow, intl } =
    useTimeSeriesContext();

  useEffect(() => {
    if (timelinePosition !== undefined) {
      if (timelinePosition < 0 || timelinePosition >= data.length) return;

      const timeAtSelectedPosition = data[timelinePosition].name;
      setTimeWindow([timeAtSelectedPosition]);
    }
    // ignore timeWindow, as we're only expecting to change when external data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelinePosition, data]);

  useEffect(() => {
    const start = data[0].name;
    const end = data[data.length - 1].name;
    if (
      timeWindow[0] < start ||
      timeWindow[1] > end ||
      timeWindow[1] < start ||
      timeWindow[1] > end
    ) {
      setTimeWindow([]);
    }
    // only run on data updates to cross-check that time-window isn't out-of bounds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const series = useMemo(() => {
    const colorMapping = {};
    const series = categories
      ? categories.map((category) => ({
          name: category,
          data: [],
          color: getColorByCategory(category, {
            palette,
            fallbackColor,
            colorMapping
          })
        }))
      : [{ data: [], color: theme.palette.secondary.main }];

    for (const { name, value, category, categoryIndex: _categoryIndex } of data) {
      const categoryIndex =
        _categoryIndex ?? (categories && category ? categories.indexOf(category) : 0);
      if (
        categoryIndex === -1 ||
        (categories && categoryIndex >= categories.length) ||
        !Number.isFinite(categoryIndex)
      ) {
        continue;
      }

      series[categoryIndex].data.push([name, value]);
    }

    return series;
  }, [categories, data, palette, fallbackColor, theme.palette.secondary.main]);

  const currentDate = useMemo(() => {
    if (!data.length) {
      return '';
    }

    // If timeWindow is activated
    if (timeWindow.length === 2) {
      const [start, end] = timeWindow.map((time) => new Date(time));
      return formatTimeRange({ start, end, stepSize });
    }

    // If widget is reset, then first and last date
    if (!isPlaying && !isPaused) {
      const start = new Date(data[0].name);
      const end = new Date(data[data.length - 1].name);

      return formatTimeRange({ start, end, stepSize });
    }

    if (timeWindow.length === 1) {
      const date = new Date(timeWindow[0]);
      return formatBucketRange({ date, stepSize, stepMultiplier });
    }
  }, [data, timeWindow, isPlaying, isPaused, stepSize, stepMultiplier]);

  const showClearButton = useMemo(() => {
    return (
      isPlaying || isPaused || timeWindow.length > 0 || selectedCategories?.length > 0
    );
  }, [isPaused, isPlaying, selectedCategories?.length, timeWindow.length]);

  const handleClear = () => {
    stop();
    setTimeWindow([]);
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
      <Box>
        <Typography color='textSecondary' variant='caption'>
          {currentDate || '-'}
        </Typography>
      </Box>

      {filterable && showClearButton && (
        <Link
          variant='caption'
          style={{ cursor: 'pointer' }}
          onClick={handleClear}
          underline='hover'
        >
          {intl.formatMessage({ id: 'c4r.widgets.timeSeries.clear' })}
        </Link>
      )}
    </>
  );

  const controls = filterable && showControls && (
    <TimeSeriesControls data={data} stepSize={stepSize} />
  );

  const chart = (
    <TimeSeriesChart
      chartType={chartType}
      timeAxisSplitNumber={timeAxisSplitNumber}
      data={data}
      series={series}
      categories={categories}
      tooltip={tooltip}
      formatter={formatter}
      tooltipFormatter={(params) =>
        tooltipFormatter(params, stepSize, formatter, stepMultiplier, isLegendVisible)
      }
      height={height}
      fitHeight={fitHeight}
      animation={animation}
      filterable={filterable}
      selectedCategories={selectedCategories}
      onCategoryClick={onSelectedCategoriesChange && handleCategoryClick}
    />
  );

  const legend = isLegendVisible && (
    <ChartLegend
      series={series}
      selectedCategories={selectedCategories}
      onCategoryClick={onSelectedCategoriesChange && handleCategoryClick}
    />
  );

  return (
    <TimeSeriesLayout
      fitHeight={fitHeight}
      header={header}
      controls={controls}
      chart={chart}
      legend={legend}
    />
  );
}

function defaultTooltipFormatter(
  params,
  stepSize,
  valueFormatter,
  stepMultiplier,
  showNames
) {
  const [name] = params[0].data;
  const date = new Date(name);
  const title = formatBucketRange({ date, stepMultiplier, stepSize });

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
