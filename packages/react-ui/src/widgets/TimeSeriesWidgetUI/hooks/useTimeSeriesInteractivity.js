import { useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimeSeriesContext } from './TimeSeriesContext';
import { findItemIndexByTime } from '../utils/utilities';

const events = {};
let initialTimeWindow = null;

export default function useTimeSeriesInteractivity({
  echartsInstance,
  data,
  canSelectLines,
  filterable
}) {
  const theme = useTheme();
  const { isPlaying, isPaused, setIsPaused, timeWindow, setTimeWindow, stop } =
    useTimeSeriesContext();

  const [isMarkLineSelected, setIsMarkLineSelected] = useState(false);
  const [isMarkAreaSelected, setIsMarkAreaSelected] = useState(false);
  const [isMarkAreaMoving, setIsMarkAreaMoving] = useState(false);
  const [oldMarkAreaPosition, setOldMarkAreaPosition] = useState(0);

  const zr = useMemo(() => echartsInstance?.getZr(), [echartsInstance]);

  const updateCursor = useCallback((cursor) => zr?.setCursorStyle(cursor), [zr]);

  const firstCategory = data?.[0]?.category;
  const seriesFinder = useMemo(() => {
    if (firstCategory) {
      return { seriesId: firstCategory };
    }
    return { seriesIndex: 0 };
  }, [firstCategory]);

  const updateTimelineByCoordinate = useCallback(
    (params) => {
      if (echartsInstance) {
        const [x] = echartsInstance.convertFromPixel(seriesFinder, [
          params.offsetX,
          params.offsetY
        ]);
        const itemIndex = findItemIndexByTime(x, data);
        setTimeWindow(itemIndex !== undefined ? [data[itemIndex].name] : []);
      }
    },
    [data, echartsInstance, setTimeWindow, seriesFinder]
  );

  // Echarts events
  useEffect(() => {
    function clickEvent(params) {
      if (!filterable) return;
      // params target is specified if we hit data-line or point, not time selection is only for background hits
      if (canSelectLines && params.target) return;

      if (!timeWindow.length) {
        updateTimelineByCoordinate(params);

        // If stopped, pause to show the markline.
        if (!isPaused && !isPlaying) {
          setIsPaused(true);
        }
      }

      if (timeWindow.length === 2) {
        setTimeWindow([]);
        stop();
      }
    }

    return addEventWithCleanUp(zr, 'click', clickEvent);
  }, [
    zr,
    isPaused,
    isPlaying,
    setIsPaused,
    setTimeWindow,
    stop,
    timeWindow.length,
    updateTimelineByCoordinate,
    canSelectLines,
    filterable
  ]);

  useEffect(() => {
    function mouseDownEvent(params) {
      if (!filterable) return;

      if (params.target?.type === 'ec-line') {
        setIsMarkLineSelected(true);
        updateCursor('grabbing');
        return;
      }

      // Move markArea
      if (timeWindow.length === 2) {
        const [x] = echartsInstance.convertFromPixel(seriesFinder, [
          params.offsetX,
          params.offsetY
        ]);
        if (x >= timeWindow[0] && x <= timeWindow[1]) {
          setIsMarkAreaMoving(true);
          const newMarkAreaPosition = x - timeWindow[0];
          setOldMarkAreaPosition(newMarkAreaPosition);
          return;
        }
      }

      if (echartsInstance) {
        setIsMarkAreaSelected(true);
        const [x] = echartsInstance.convertFromPixel(seriesFinder, [
          params.offsetX,
          params.offsetY
        ]);
        initialTimeWindow = x;
        return;
      }
    }

    return addEventWithCleanUp(zr, 'mousedown', mouseDownEvent);
  }, [zr, echartsInstance, timeWindow, updateCursor, filterable, seriesFinder]);

  useEffect(() => {
    function mouseMoveEvent(params) {
      if (params?.target?.type === 'polygon') {
        updateCursor('move');
      }

      if (isMarkLineSelected && echartsInstance) {
        updateTimelineByCoordinate(params);
        updateCursor('grabbing');
      }

      if (isMarkAreaSelected && echartsInstance) {
        const [x] = echartsInstance.convertFromPixel(seriesFinder, [
          params.offsetX,
          params.offsetY
        ]);
        if (initialTimeWindow === x) {
          setTimeWindow([]);
        } else {
          setTimeWindow([initialTimeWindow, x]);
        }
      }
    }

    return addEventWithCleanUp(zr, 'mousemove', mouseMoveEvent);
  }, [
    zr,
    echartsInstance,
    isMarkAreaSelected,
    isMarkLineSelected,
    setTimeWindow,
    updateCursor,
    updateTimelineByCoordinate,
    seriesFinder
  ]);

  useEffect(() => {
    function mouseUpEvent(params) {
      if (isMarkLineSelected) {
        setIsMarkLineSelected(false);
        updateCursor('default');
      }

      if (isMarkAreaSelected) {
        setIsMarkAreaSelected(false);
        initialTimeWindow = null;
        if (timeWindow.length === 1) {
          setTimeWindow([]);
        }
      }

      if (isMarkAreaMoving && echartsInstance) {
        const [x] = echartsInstance.convertFromPixel(seriesFinder, [
          params.offsetX,
          params.offsetY
        ]);
        const newMarkAreaPosition = x - timeWindow[0];
        if (oldMarkAreaPosition) {
          const diff = newMarkAreaPosition - oldMarkAreaPosition;
          setTimeWindow([timeWindow[0] + diff, timeWindow[1] + diff]);
        }
        setIsMarkAreaMoving(false);
      }
    }

    return addEventWithCleanUp(zr, 'mouseup', mouseUpEvent);
  }, [
    zr,
    echartsInstance,
    isMarkAreaMoving,
    isMarkAreaSelected,
    isMarkLineSelected,
    oldMarkAreaPosition,
    setTimeWindow,
    timeWindow,
    updateCursor,
    seriesFinder
  ]);

  useEffect(() => {
    if (!filterable && timeWindow.length) {
      setTimeWindow([]);
    }
  }, [filterable, setTimeWindow, timeWindow.length]);

  // markLine in echarts
  const timelineOptions = useMemo(() => {
    if (timeWindow.length !== 1) return undefined;

    const timestamp = timeWindow[0];
    const itemIndex = findItemIndexByTime(timestamp, data);
    if (itemIndex === undefined) return undefined;

    const xAxis = data[itemIndex]?.name;
    return (
      // Cannot have markLine and markArea at the same time
      xAxis !== undefined && {
        symbol: ['none', 'none'],
        animationDuration: 100,
        animationDurationUpdate: 150,
        animationEasingUpdate: 'linear',
        data:
          isPaused || isPlaying
            ? [
                {
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  },
                  xAxis,
                  lineStyle: {
                    type: 'solid',
                    color: theme.palette.primary.main,
                    width: 1.5,
                    shadowColor: theme.palette.primary.light,
                    shadowBlur: 3
                  }
                }
              ]
            : []
      }
    );
  }, [data, isPaused, isPlaying, theme, timeWindow]);

  // markArea in echarts
  const timeWindowOptions = useMemo(
    () =>
      timeWindow.length === 2 && {
        data: [[{ coord: [timeWindow[0]] }, { coord: [timeWindow[1]] }]],
        itemStyle: {
          color: theme.palette.primary.main,
          opacity: 0.2
        }
      },
    [theme, timeWindow]
  );

  return { timelineOptions, timeWindowOptions };
}

// Aux
function addEventWithCleanUp(zr, eventKey, event) {
  if (zr && zr.handler) {
    events[eventKey] = event;
    zr.on(eventKey, event);

    return () => {
      if (events[eventKey] && zr?.handler) zr.off(eventKey, event);
    };
  }
}
