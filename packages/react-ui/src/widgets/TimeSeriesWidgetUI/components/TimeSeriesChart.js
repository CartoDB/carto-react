import { alpha, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import ReactEcharts from '../../../custom-components/echarts-for-react';
import useTimeSeriesInteractivity from '../hooks/useTimeSeriesInteractivity';

export default function TimeSeriesChart({
  chartType,
  formatter,
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
      backgroundColor: alpha(theme.palette.common.black, 0.9),
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
          color: alpha(theme.palette.common.black, 0.4)
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
          padding: [0, 0, theme.typography.overlineDelicate.fontSize, 0],
          show: true,
          showMaxLabel: true,
          showMinLabel: false,
          inside: true,
          color: (value) => {
            // FIXME: Workaround to show only maxlabel
            let col = 'transparent';
            if (value >= maxValue) {
              col = alpha(theme.palette.common.black, 0.6);
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
            color: alpha(theme.palette.common.black, 0.04)
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
