import { useTheme } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import ReactEcharts from '../../../custom-components/echarts-for-react';
import useTimeSeriesInteractivity from '../hooks/useTimeSeriesInteractivity';
import { theme } from '../../../theme/carto-theme';

export const CHART_HEIGHT_DEFAULT = theme.spacingValue * 22;
export const CHART_HEIGHT_FITHEIGHT = '100%';

export default function TimeSeriesChart({
  chartType,
  formatter,
  tooltip,
  tooltipFormatter,
  data,
  series,
  categories,
  height: heightProp,
  fitHeight,
  animation,
  selectedCategories,
  onCategoryClick
}) {
  const theme = useTheme();
  const [echartsInstance, setEchartInstance] = useState();

  const onChartReady = (_echartsInstance) => setEchartInstance(_echartsInstance);

  const maxValue = useMemo(
    () =>
      series.reduce(
        (accOut, { data }) =>
          data.reduce((accInt, row) => (row[1] > accInt ? row[1] : accInt), accOut),
        Number.MIN_VALUE
      ),
    [series]
  );

  const tooltipOptions = useMemo(
    () => ({
      show: tooltip,
      trigger: 'axis',
      appendToBody: true,
      padding: [theme.spacingValue * 0.5, theme.spacingValue],
      textStyle: {
        ...theme.typography.caption,
        fontSize: 11,
        color: theme.palette.common.white
      },
      borderWidth: 0,
      backgroundColor: theme.palette.black[90],
      position: (point, params, dom, rect, size) => {
        const position = { top: 0 };

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0] + theme.spacingValue * 1.5;
        } else {
          position.right = size.viewSize[0] - point[0] + theme.spacingValue * 1.5;
        }
        return position;
      },
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {})
    }),
    [theme, tooltip, tooltipFormatter]
  );

  const axisOptions = useMemo(
    () => ({
      axisPointer: {
        lineStyle: {
          color: theme.palette.black[40]
        }
      },
      xAxis: {
        type: 'time',
        axisLine: {
          show: true,
          lineStyle: {
            color: theme.palette.grey[900],
            opacity: 0.2
          }
        },
        axisTick: {
          show: false
        },
        splitNumber: 5
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          margin: 0,
          verticalAlign: 'bottom',
          padding: [0, 0, theme.spacingValue * 1.25, 0],
          show: true,
          showMaxLabel: true,
          showMinLabel: false,
          inside: true,
          color: (value) => {
            // FIXME: Workaround to show only maxlabel
            let col = 'transparent';
            if (value >= maxValue) {
              col = theme.palette.black[60];
            }

            return col;
          },
          ...(formatter ? { formatter: (v) => formatter(v) } : {}),
          ...theme.typography.overlineDelicate
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: theme.palette.black[4]
          }
        },
        max: maxValue
      }
    }),
    [theme, maxValue, formatter]
  );

  const { timelineOptions: markLine, timeWindowOptions: markArea } =
    useTimeSeriesInteractivity({
      echartsInstance,
      data,
      canSelectLines: Boolean(onCategoryClick)
    });

  const seriesOptions = useMemo(
    () =>
      series.map(({ data, color, category }, i) => {
        const somethingSelected = selectedCategories && selectedCategories.length > 0;

        const isSelected = somethingSelected && selectedCategories.includes(category);
        const actualColor =
          !somethingSelected || isSelected
            ? color
            : theme.palette.action.disabledBackground;

        return {
          name: category,
          markLine: i === 0 ? markLine : undefined,
          markArea: i === 0 ? markArea : undefined,
          animation,
          data,
          type: chartType,
          smooth: true,
          color: actualColor,
          z: somethingSelected && isSelected ? 10 : 0,
          lineStyle: {
            width: 2
          },
          showSymbol: false,
          emphasis: {
            scale: 2,
            lineStyle: {
              width: 2,
              color: actualColor
            }
          }
        };
      }),
    [series, markLine, markArea, animation, chartType, selectedCategories, theme]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacingValue * 2,
        top: theme.spacingValue * 4,
        right: theme.spacingValue * 2,
        bottom: theme.spacingValue * 3
      },
      color: [theme.palette.secondary.main],
      tooltip: tooltipOptions,
      ...axisOptions,
      series: seriesOptions
    }),
    [
      axisOptions,
      seriesOptions,
      theme.palette.secondary.main,
      theme.spacingValue,
      tooltipOptions
    ]
  );

  const handleClick = useCallback(
    (params) => {
      // known values params.componentType = markLine | series | markArea
      if (categories && onCategoryClick && params.componentType === 'series') {
        const category = categories[params.seriesIndex];
        onCategoryClick(category);
      }
    },
    [categories, onCategoryClick]
  );

  const onEvents = { click: handleClick };

  // echarts sometimes misses resizes, so we use a ResizeObserver and force resizes
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !echartsInstance) {
      return;
    }

    const element = echartsInstance.getDom().parentElement;

    if (!element) return;

    let observer;
    observer = new ResizeObserver(() => {
      echartsInstance.resize();
    });
    observer.observe(element);

    return () => {
      observer?.disconnect();
    };
  }, [echartsInstance]);

  const height = fitHeight ? CHART_HEIGHT_FITHEIGHT : heightProp || CHART_HEIGHT_DEFAULT;

  useLayoutEffect(() => {
    echartsInstance?.resize();
  }, [height, fitHeight, echartsInstance]);

  return (
    <ReactEcharts
      option={options}
      onEvents={onEvents}
      onChartReady={onChartReady}
      style={{ height }}
    />
  );
}
