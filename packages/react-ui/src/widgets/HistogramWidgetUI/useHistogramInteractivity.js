import { useTheme } from '@material-ui/core';
import { useCallback, useEffect, useMemo, useState } from 'react';

const events = {};
let initialTimeWindow = null;

export default function useHistogramInteractivity({
  data,
  filterable,
  selectedBars,
  onSelectedBarsChange,
  echartsInstance
}) {
  const theme = useTheme();
  const [markArea, setMarkArea] = useState([]);

  const zr = useMemo(() => echartsInstance?.getZr(), [echartsInstance]);

  useEffect(() => {
    function mouseDownEvent(params) {
      if (echartsInstance) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        initialTimeWindow = x;
        return;
      }
    }

    function mouseMoveEvent(params) {
      if (initialTimeWindow !== null) {
        const [x] = echartsInstance.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ]);
        if (initialTimeWindow === x) {
          setMarkArea([]);
        } else {
          setMarkArea([initialTimeWindow, x].sort((a, b) => a - b));
        }
      }
    }

    if (filterable) {
      const mouseDownCleanUp = addEventWithCleanUp(zr, 'mousedown', mouseDownEvent);
      const mouseMoveCleanUp = addEventWithCleanUp(zr, 'mousemove', mouseMoveEvent);

      return () => {
        mouseDownCleanUp?.();
        mouseMoveCleanUp?.();
      };
    }
  }, [zr, echartsInstance, filterable]);

  useEffect(() => {
    function mouseUpEvent() {
      if (markArea.length === 2 && onSelectedBarsChange) {
        const newSelectedBars = data.reduce((acc, item, idx) => {
          if (
            (markArea[0] >= item[0] && markArea[0] <= item[1]) ||
            (markArea[1] >= item[0] && markArea[1] <= item[1]) ||
            (markArea[0] <= item[0] && markArea[1] >= item[1])
          ) {
            acc.push(idx);
          }
          return acc;
        }, []);

        onSelectedBarsChange(
          data.length === newSelectedBars.length ? [] : newSelectedBars
        );
      }
      setMarkArea([]);
      initialTimeWindow = null;
    }

    if (filterable) {
      return addEventWithCleanUp(zr, 'mouseup', mouseUpEvent);
    }
  }, [zr, echartsInstance, markArea, data, onSelectedBarsChange, filterable]);

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedBarsChange) {
        const newSelectedBars = new Set(selectedBars);

        const alreadyAdded = newSelectedBars.has(params.dataIndex);
        if (alreadyAdded) {
          newSelectedBars.delete(params.dataIndex);
        } else {
          newSelectedBars.add(params.dataIndex);
        }

        onSelectedBarsChange(
          newSelectedBars.size === data.length ? [] : Array.from(newSelectedBars)
        );
      }
    },
    [onSelectedBarsChange, selectedBars, data.length]
  );

  return {
    markAreaOptions: markArea.length === 2 && {
      data: [[{ coord: [markArea[0]] }, { coord: [markArea[1]] }]],
      itemStyle: {
        color: theme.palette.primary.main,
        opacity: 0.2
      }
    },
    onEvents: filterable ? { click: clickEvent } : {}
  };
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
