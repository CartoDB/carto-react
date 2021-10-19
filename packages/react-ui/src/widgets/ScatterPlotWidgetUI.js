import { useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { isDataEqual } from './utils/chartUtils';
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
      padding: [theme.spacing(0.5), theme.spacing(1)],
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white
      },
      backgroundColor: theme.palette.other.tooltip,
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {})
    },
    color: [theme.palette.secondary.main],
    xAxis: {
      axisLabel: {
        ...theme.typography.charts,
        padding: [theme.spacing(0.5), 0, 0, 0],
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
        ...theme.typography.charts,
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

function __generateSerie({ name, data, theme }) {
  return [
    {
      type: 'scatter',
      name,
      data: data
    }
  ];
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) => isDataEqual(optionPrev, optionNext)
);

function ScatterPlotWidgetUI({
  name,
  data = [],
  xAxisFormatter,
  yAxisFormatter,
  tooltipFormatter
}) {
  const theme = useTheme();
  const chartInstance = useRef();
  const [options, setOptions] = useState({
    series: []
  });

  useEffect(() => {
    const config = __generateDefaultConfig(
      { xAxisFormatter, yAxisFormatter, tooltipFormatter },
      theme
    );
    const series = __generateSerie({
      name,
      data: data || []
    });
    setOptions({
      ...config,
      series
    });
  }, [data, name, theme, xAxisFormatter, yAxisFormatter, tooltipFormatter]);
  return (
    <EchartsWrapper
      ref={chartInstance}
      option={options}
      lazyUpdate={true}
      style={{ height: 225 }}
    />
  );
}

ScatterPlotWidgetUI.defaultProps = {
  name: null,
  tooltipFormatter: (v) => `[${v.value[0]}, ${v.value[1]})`,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v
};

ScatterPlotWidgetUI.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func
};

export default ScatterPlotWidgetUI;
