import { useTheme } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import useTimeSeriesInteractivity from '../hooks/useTimeSeriesInteractivity';

export default function TimeSeriesChart({
  chartType,
  tooltip,
  tooltipFormatter,
  data,
  height,
  animation
}) {
  const theme = useTheme();
  const [echartsInstance, setEchartInstance] = useState();

  const onChartReady = (_echartsInstance) => setEchartInstance(_echartsInstance);

  const { processedData, maxValue } = useMemo(() => {
    return data.reduce(
      (acc, { name, value }) => {
        let { processedData, maxValue } = acc;

        if (value > maxValue) {
          maxValue = value;
        }

        processedData.push([name, value]);

        return { processedData, maxValue };
      },
      { processedData: [], maxValue: 0 }
    );
  }, [data]);

  const tooltipOptions = useMemo(
    () => ({
      show: tooltip,
      trigger: 'axis',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white
      },
      borderWidth: 0,
      backgroundColor: theme.palette.other.tooltip,
      position: (point, params, dom, rect, size) => {
        const position = { top: 0 };

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0];
        } else {
          position.right = size.viewSize[0] - point[0];
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
          color: theme.palette.charts.axisPointer
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
          padding: [0, 0, theme.typography.charts.fontSize, 0],
          show: true,
          showMaxLabel: true,
          showMinLabel: false,
          inside: true,
          color: (value) => {
            // FIXME: Workaround to show only maxlabel
            let col = 'transparent';
            if (value >= maxValue) {
              col = theme.palette.charts.maxLabel;
            }

            return col;
          },
          ...theme.typography.charts
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
            color: theme.palette.charts.axisLine
          }
        },
        max: maxValue
      }
    }),
    [theme, maxValue]
  );

  const {
    timelineOptions: markLine,
    timeWindowOptions: markArea
  } = useTimeSeriesInteractivity({
    echartsInstance,
    data
  });

  const serieOptions = useMemo(
    () => ({
      markLine,
      markArea,
      animation,
      data: processedData,
      type: chartType,
      smooth: true,
      color: theme.palette.secondary.main,
      lineStyle: {
        width: 2.5
      },
      showSymbol: false,
      emphasis: {
        lineStyle: {
          width: 3,
          color: theme.palette.secondary.main
        }
      }
    }),
    [markLine, markArea, processedData, theme, chartType, animation]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacing(2),
        top: theme.spacing(4),
        right: theme.spacing(2),
        bottom: theme.spacing(3)
      },
      color: [theme.palette.secondary.main],
      tooltip: tooltipOptions,
      ...axisOptions,
      series: [serieOptions]
    }),
    [axisOptions, serieOptions, theme, tooltipOptions]
  );

  return (
    <ReactEcharts
      option={options}
      onChartReady={onChartReady}
      style={{ height: height || theme.spacing(22) }}
    />
  );
}
