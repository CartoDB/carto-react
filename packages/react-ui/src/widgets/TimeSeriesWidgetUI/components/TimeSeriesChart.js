import { useTheme } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import ReactEcharts from '../../../custom-components/echarts-for-react';
import useTimeSeriesInteractivity from '../hooks/useTimeSeriesInteractivity';
import { theme } from '../../../theme/carto-theme';

export const CHART_HEIGHT_DEFAULT = theme.spacingValue * 22;
export const CHART_HEIGHT_FITHEIGHT = '100%';

const DEFAULT_SPLIT_NUMBER = 5;
const MIN_ADAPTIVE_SPLIT_NUMBER = 3;
const ADAPTIVE_SPLIT_NUMBER_SPACING = theme.spacingValue * 20;

export default function TimeSeriesChart({
  chartType,
  formatter,
  timeAxisSplitNumber,
  tooltip,
  tooltipFormatter,
  data,
  series,
  categories,
  height: heightProp,
  fitHeight,
  animation,
  filterable,
  selectedCategories,
  onCategoryClick,
  yAxisType = 'dense'
}) {
  const theme = useTheme();
  const [echartsInstance, setEchartInstance] = useState();

  const onChartReady = (_echartsInstance) => setEchartInstance(_echartsInstance);

  const [width, setWidth] = useState();
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

  const axisOptions = useMemo(() => {
    const denseAxisConfig = {
      margin: 0,
      verticalAlign: 'bottom',
      padding: [0, 0, theme.spacingValue * 1.25, 0],
      inside: true,
      color: (value) => {
        // FIXME: Workaround to show only maxlabel
        let col = 'transparent';
        if (value >= maxValue) {
          col = theme.palette.black[60];
        }
        return col;
      }
    };
    const fullAxisConfig = {
      margin: 0,
      verticalAlign: 'middle',
      padding: [0, theme.spacingValue * 0.75, 0, 0],
      color: theme.palette.black[60]
    };
    const yAxisLabelConfig = yAxisType === 'dense' ? denseAxisConfig : fullAxisConfig;

    return {
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
        axisLabel: {
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: theme.typography.caption.fontFamily,
          // echarts doesn't intepret lineHeight properly, so hack it around
          lineHeight: theme.typography.caption.lineHeight * 8,
          letterSpacing: theme.typography.caption.letterSpacing,

          // https://echarts.apache.org/en/option.html#xAxis.axisLabel.formatter
          formatter: {
            year: '{yearStyle|{yyyy}}'
          },
          rich: {
            yearStyle: {
              fontWeight: theme.typography.fontWeightMedium,
              fontSize: theme.typography.caption.fontSize,
              fontFamily: theme.typography.caption.fontFamily,
              letterSpacing: theme.typography.caption.letterSpacing,
              lineHeight: theme.typography.caption.lineHeight * 8
            }
          }
        },
        axisTick: {
          show: false
        },
        splitNumber:
          timeAxisSplitNumber ??
          (width !== undefined
            ? Math.min(
                MIN_ADAPTIVE_SPLIT_NUMBER,
                Math.ceil(width / ADAPTIVE_SPLIT_NUMBER_SPACING)
              )
            : DEFAULT_SPLIT_NUMBER)
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          showMaxLabel: true,
          showMinLabel: false,
          ...yAxisLabelConfig,
          ...(formatter ? { formatter: (v) => formatter(v) } : {}),
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.overlineDelicate.fontSize,
          fontFamily: theme.typography.overlineDelicate.fontFamily,
          // echarts doesn't intepret lineHeight properly, so hack it around
          lineHeight: theme.typography.overlineDelicate.lineHeight * 8,
          letterSpacing: theme.typography.overlineDelicate.letterSpacing
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
    };
  }, [theme, maxValue, formatter, width, timeAxisSplitNumber, yAxisType]);

  const { timelineOptions: markLine, timeWindowOptions: markArea } =
    useTimeSeriesInteractivity({
      echartsInstance,
      data,
      canSelectLines: Boolean(onCategoryClick),
      filterable
    });

  const seriesOptions = useMemo(
    () =>
      series.map(({ data, color, name }, i) => {
        const somethingSelected = selectedCategories && selectedCategories.length > 0;

        const isSelected = somethingSelected && selectedCategories.includes(name);
        const actualColor =
          !somethingSelected || isSelected
            ? color
            : theme.palette.action.disabledBackground;

        return {
          id: name,
          name,
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
        left: theme.spacingValue * (yAxisType === 'dense' ? 2 : 3.5),
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
      yAxisType,
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

    const element = echartsInstance?.getDom()?.parentElement;

    if (!element) return;

    let observer;
    observer = new ResizeObserver(() => {
      setWidth(element.clientWidth);
      echartsInstance.resize();
    });
    observer.observe(element);

    return () => {
      observer?.disconnect();
    };
  }, [echartsInstance]);

  const height = fitHeight ? CHART_HEIGHT_FITHEIGHT : heightProp || CHART_HEIGHT_DEFAULT;

  useLayoutEffect(() => {
    const element = echartsInstance?.getDom()?.parentElement;
    if (element) {
      setWidth(element.clientWidth);
    }
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
