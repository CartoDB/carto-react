import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { areChartPropsEqual } from '../utils/chartUtils';
import ReactEcharts from '../../custom-components/echarts-for-react';
import ScatterPlotSkeleton from './ScatterPlotSkeleton';
import useSkeleton from '../useSkeleton';

function __generateDefaultConfig(
  { tooltipFormatter, xAxisFormatter = (v) => v, yAxisFormatter = (v) => v },
  theme
) {
  return {
    grid: {
      top: 10,
      left: 5,
      bottom: 10,
      right: 15,
      containLabel: true
    },
    tooltip: {
      padding: [theme.spacingValue * 0.5, theme.spacingValue],
      textStyle: {
        ...theme.typography.caption,
        fontSize: 11,
        color: theme.palette.common.white
      },
      backgroundColor: theme.palette.black[90],
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {})
    },
    color: [theme.palette.secondary.main],
    xAxis: {
      axisLabel: {
        ...theme.typography.overlineDelicate,
        padding: [theme.spacingValue * 0.5, 0, 0, 0],
        formatter: (v) => {
          const formatted = xAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.prefix || ''}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        }
      }
    },
    yAxis: {
      axisLabel: {
        ...theme.typography.overlineDelicate,
        formatter: (v) => {
          const formatted = yAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.prefix}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        }
      }
    }
  };
}

function __generateSerie({ name, data, animation }) {
  return [
    {
      type: 'scatter',
      name,
      data: data,
      animation
    }
  ];
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) =>
    areChartPropsEqual(optionPrev, optionNext)
);

const EMPTY_ARRAY = [];
const IDENTITY_FN = (v) => v;
const DEFAULT_TOOLTIP_FORMATTER = (v) => `[${v.value[0]}, ${v.value[1]})`;

function ScatterPlotWidgetUI({
  name = null,
  data = EMPTY_ARRAY,
  animation = true,
  xAxisFormatter = IDENTITY_FN,
  yAxisFormatter = IDENTITY_FN,
  tooltipFormatter = DEFAULT_TOOLTIP_FORMATTER,
  isLoading
}) {
  const theme = useTheme();
  const chartInstance = useRef();
  const [options, setOptions] = useState({
    series: []
  });

  const { showSkeleton } = useSkeleton(isLoading);

  useEffect(() => {
    const config = __generateDefaultConfig(
      { xAxisFormatter, yAxisFormatter, tooltipFormatter },
      theme
    );
    const series = __generateSerie({
      name,
      data: data || [],
      animation
    });
    setOptions({
      ...config,
      series
    });
  }, [data, name, animation, theme, xAxisFormatter, yAxisFormatter, tooltipFormatter]);

  const HEIGHT = 225;

  if (showSkeleton) return <ScatterPlotSkeleton height={HEIGHT} />;

  return (
    <EchartsWrapper
      ref={chartInstance}
      option={options}
      lazyUpdate={true}
      style={{ height: HEIGHT }}
    />
  );
}

ScatterPlotWidgetUI.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  animation: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func
};

export default ScatterPlotWidgetUI;
