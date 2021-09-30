import { useTheme } from '@material-ui/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimeSeriesContext } from './TimeSeriesContext';

const events = {};
let initialTimeframe = null;

export default function useTimeSeriesInteractivity({ echartsInstance, data }) {
  const theme = useTheme();
  const {
    isPlaying,
    isPaused,
    setIsPaused,
    timelinePosition,
    timeframe,
    setTimeframe,
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
      if (!timeframe.length && params.target?.type !== 'ec-line') {
        updateTimelineByCoordinate(params);

        // If stopped, pause to show the markline.
        if (!isPaused && !isPlaying) {
          setIsPaused(true);
        }
      }

      if (timeframe.length === 2) {
        setTimeframe([]);
        stop();
      }
    }

    return addEventWithCleanUp(zr, 'click', clickEvent);
  }, [
    zr,
    isPaused,
    isPlaying,
    setIsPaused,
    setTimeframe,
    stop,
    timeframe.length,
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
      if (timeframe.length === 2) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        if (x >= timeframe[0] && x <= timeframe[1]) {
          setIsMarkAreaMoving(true);
          const newMarkAreaPosition = x - timeframe[0];
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
        initialTimeframe = x;
        return;
      }
    }

    return addEventWithCleanUp(zr, 'mousedown', mouseDownEvent);
  }, [zr, echartsInstance, timeframe, updateCursor]);

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
        if (initialTimeframe === x) {
          setTimeframe([]);
        } else {
          setTimeframe([initialTimeframe, x]);
        }
      }
    }

    return addEventWithCleanUp(zr, 'mousemove', mouseMoveEvent);
  }, [
    zr,
    echartsInstance,
    isMarkAreaSelected,
    isMarkLineSelected,
    setTimeframe,
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
        initialTimeframe = null;
        if (timeframe.length === 1) {
          setTimeframe([]);
        }
      }

      if (isMarkAreaMoving) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        const newMarkAreaPosition = x - timeframe[0];
        if (oldMarkAreaPosition) {
          const diff = newMarkAreaPosition - oldMarkAreaPosition;
          setTimeframe([timeframe[0] + diff, timeframe[1] + diff]);
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
    setTimeframe,
    timeframe,
    updateCursor
  ]);

  // markLine in echarts
  const timelineOptions = useMemo(
    () =>
      // Cannot have markLine and markArea at the same time
      !timeframe.length && {
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
    [isPaused, isPlaying, data, theme, animationStep, timelinePosition, timeframe]
  );

  // markArea in echarts
  const timeframeOptions = useMemo(
    () =>
      timeframe.length === 2 && {
        data: [[{ coord: [timeframe[0]] }, { coord: [timeframe[1]] }]],
        itemStyle: {
          color: theme.palette.primary.main,
          opacity: 0.2
        }
      },
    [theme, timeframe]
  );

  return { timelineOptions, timeframeOptions };
}

// Aux
function addEventWithCleanUp(zr, eventKey, event) {
  if (zr) {
    events[eventKey] = event;
    zr.on(eventKey, event);

    return () => {
      if (events[eventKey]) zr.off(eventKey, event);
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
