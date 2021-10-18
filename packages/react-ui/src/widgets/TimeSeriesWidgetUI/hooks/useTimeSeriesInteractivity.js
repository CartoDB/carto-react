import { useTheme } from '@material-ui/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimeSeriesContext } from './TimeSeriesContext';

const events = {};
let initialTimeWindow = null;

export default function useTimeSeriesInteractivity({ echartsInstance, data }) {
  const theme = useTheme();
  const {
    isPlaying,
    isPaused,
    setIsPaused,
    timelinePosition,
    timeWindow,
    setTimeWindow,
    setTimelinePosition,
    stop,
    animationStep
  } = useTimeSeriesContext();

  const [isMarkLineSelected, setIsMarkLineSelected] = useState(false);
  const [isMarkAreaSelected, setIsMarkAreaSelected] = useState(false);
  const [isMarkAreaMoving, setIsMarkAreaMoving] = useState(false);
  const [oldMarkAreaPosition, setOldMarkAreaPosition] = useState(0);

  const zr = useMemo(() => echartsInstance?.getZr(), [echartsInstance]);

  const updateCursor = useCallback((cursor) => zr?.setCursorStyle(cursor), [zr]);

  const updateTimelineByCoordinate = useCallback(
    (params) => {
      if (echartsInstance) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        const position = data.findIndex((item, idx) =>
          findTimelinePositionByX(item, idx, data, x)
        );
        setTimelinePosition(Math.max(0, position));
      }
    },
    [data, echartsInstance, setTimelinePosition]
  );

  // Echarts events
  useEffect(() => {
    function clickEvent(params) {
      if (!timeWindow.length && params.target?.type !== 'ec-line') {
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
    updateTimelineByCoordinate
  ]);

  useEffect(() => {
    function mouseDownEvent(params) {
      if (params.target?.type === 'ec-line') {
        setIsMarkLineSelected(true);
        updateCursor('grabbing');
        return;
      }

      // Move markArea
      if (timeWindow.length === 2) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
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
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        initialTimeWindow = x;
        return;
      }
    }

    return addEventWithCleanUp(zr, 'mousedown', mouseDownEvent);
  }, [zr, echartsInstance, timeWindow, updateCursor]);

  useEffect(() => {
    function mouseMoveEvent(params) {
      if (params?.target?.type === 'polygon') {
        updateCursor('move');
      }

      if (isMarkLineSelected && echartsInstance) {
        updateTimelineByCoordinate(params);
        updateCursor('grabbing');
      }

      if (isMarkAreaSelected) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
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
    updateTimelineByCoordinate
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

      if (isMarkAreaMoving) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
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
    updateCursor
  ]);

  // markLine in echarts
  const timelineOptions = useMemo(
    () =>
      // Cannot have markLine and markArea at the same time
      !timeWindow.length && {
        symbol: ['none', 'none'],
        animationDuration: 100,
        animationDurationUpdate: Math.min(300, animationStep / 2),
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
                  xAxis: data[Math.max(0, timelinePosition)]?.name,
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
      },
    [isPaused, isPlaying, data, theme, animationStep, timelinePosition, timeWindow]
  );

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
  if (zr) {
    events[eventKey] = event;
    zr.on(eventKey, event);

    return () => {
      if (events[eventKey] && zr?.handler) zr.off(eventKey, event);
    };
  }
}

function findTimelinePositionByX(item, idx, data, x) {
  const currentDate = item.name;
  const upperCloseDate = data[idx + 1]?.name;
  const lowerCloseDate = data[idx - 1]?.name;
  const upperDiff = Math.abs(currentDate - upperCloseDate);
  const lowerDiff = Math.abs(currentDate - lowerCloseDate);
  const lowerBound = currentDate - lowerDiff * 0.5,
    upperBound = currentDate + upperDiff * 0.5;
  if (isFinite(lowerBound) && isFinite(upperBound)) {
    return x >= lowerBound && x <= upperBound;
  } else if (isFinite(lowerBound)) {
    return x >= lowerBound;
  } else if (isFinite(upperBound)) {
    return x <= upperBound;
  }
}
