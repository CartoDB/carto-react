import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles } from '@material-ui/core';
import {
  applyChartFilter,
  clearFilter,
  areChartPropsEqual,
  disableSerie,
  getChartSerie
} from './utils/chartUtils';
import detectTouchScreen from './utils/detectTouchScreen';

const IS_TOUCH_SCREEN = detectTouchScreen();

const useStyles = makeStyles((theme) => ({
  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary
    },

    '& .MuiButton-label': {
      ...theme.typography.caption
    }
  },

  selectAllButton: {
    ...theme.typography.caption,
    cursor: 'pointer'
  }
}));

export function __calculateTextWidth(text, fontSize = 8) {
  let span = document.getElementById('computedTextWidth');
  if (!span) {
    span = document.createElement('span');
    span.id = 'computedTextWidth';
    span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;';
    document.body.appendChild(span);
  }
  span.style.fontSize = `${fontSize}px`;
  span.innerHTML = text;
  return span.offsetWidth;
}

function __formatter(v, xAxisFormatter) {
  const formatted = xAxisFormatter(v);
  return typeof formatted === 'object'
    ? `${formatted.prefix || ''}${formatted.value}${formatted.suffix || ''}`
    : formatted;
}

function __getTextWidth(dataAxis, xAxisFormatter) {
  return dataAxis.reduce((value, current) => {
    const formattedValue = __formatter(current, xAxisFormatter);
    return value + __calculateTextWidth(formattedValue);
  }, 0);
}

function __generateDefaultConfig(
  {
    dataAxis,
    tooltip,
    tooltipFormatter,
    xAxisFormatter = (v) => v,
    yAxisFormatter = (v) => v,
    chartWidth
  },
  data,
  theme
) {
  const textWidth = __getTextWidth(dataAxis, xAxisFormatter);
  const hasLongText = textWidth > chartWidth;

  return {
    grid: {
      ...(!hasLongText ? { left: theme.spacing(1) } : {}),
      ...(!hasLongText ? { right: theme.spacing(1) } : {}),
      top: theme.spacing(2),
      bottom: theme.spacing(1),
      containLabel: true
    },
    axisPointer: {
      lineStyle: {
        color: theme.palette.charts.axisPointer
      }
    },
    tooltip: {
      show: tooltip,
      trigger: 'axis',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white
      },
      backgroundColor: theme.palette.other.tooltip,
      position: function (point, params, dom, rect, size) {
        const position = { top: 0 };

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0];
        } else {
          position.right = size.viewSize[0] - point[0];
        }
        return position;
      },
      formatter: (a) => (tooltipFormatter ? tooltipFormatter(a) : a[0].name)
    },
    color: [theme.palette.secondary.main],
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        ...theme.typography.charts,
        padding: [theme.spacing(0.5), 0, 0, 0],
        formatter: (v) => __formatter(v, xAxisFormatter)
      },
      data: dataAxis
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
          let col = 'transparent';
          const maxValue = Math.max(...data.map((d) => d || Number.MIN_SAFE_INTEGER));
          if (value >= maxValue) {
            col = theme.palette.charts.maxLabel;
          }

          return col;
        },
        ...theme.typography.charts,
        formatter: (v) => {
          const formatted = yAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.prefix}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        }
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
      }
    }
  };
}

function __generateSerie(name, data, selectedBars = [], animation, theme) {
  return [
    {
      type: 'bar',
      name,
      animation,
      data: data.map((value, index) => {
        const bar = {
          value,
          color: theme.palette.secondary.main
        };

        const disabled = selectedBars.length && !selectedBars.some((i) => i === index);
        if (disabled) {
          disableSerie(bar, theme);
        }
        return bar;
      }),
      barCategoryGap: 1,
      barMinWidth: '95%',
      ...(!IS_TOUCH_SCREEN && theme
        ? {
            emphasis: {
              itemStyle: {
                color: theme.palette.secondary.dark
              }
            }
          }
        : {})
    }
  ];
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) =>
    areChartPropsEqual(optionPrev, optionNext)
);
function HistogramWidgetUI(props) {
  const theme = useTheme();
  const {
    name,
    data = [],
    dataAxis,
    onSelectedBarsChange,
    selectedBars,
    tooltip,
    tooltipFormatter,
    xAxisFormatter,
    yAxisFormatter,
    height = theme.spacing(22),
    animation,
    filterable
  } = props;

  const classes = useStyles();
  const chartInstance = useRef();
  const [chartWidth, setChartWidth] = useState(0);
  const options = useMemo(() => {
    const config = __generateDefaultConfig(
      { dataAxis, tooltip, tooltipFormatter, xAxisFormatter, yAxisFormatter, chartWidth },
      data,
      theme
    );
    const series = __generateSerie(name, data, selectedBars, animation, theme);
    return Object.assign({}, config, { series });
  }, [
    data,
    dataAxis,
    name,
    theme,
    tooltip,
    tooltipFormatter,
    xAxisFormatter,
    yAxisFormatter,
    selectedBars,
    animation,
    chartWidth
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (chartInstance.current) {
        const echart = chartInstance.current?.getEchartsInstance();
        if (!chartWidth && echart?.getWidth()) {
          setChartWidth(echart.getWidth());
        }
        if (chartWidth) {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [chartWidth]);

  const clearBars = () => {
    const echart = chartInstance.current.getEchartsInstance();

    const { option, serie } = getChartSerie(echart, 0);
    clearFilter(serie);
    echart.setOption(option);
    onSelectedBarsChange({ bars: [], chartInstance });
  };

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedBarsChange) {
        const echart = chartInstance.current.getEchartsInstance();

        const { option, serie } = getChartSerie(echart, params.seriesIndex);
        applyChartFilter(serie, params.dataIndex, theme);
        echart.setOption(option);

        const activeBars = [];
        serie.data.forEach((d, index) => {
          if (!d.disabled) {
            activeBars.push(index);
          }
        });
        onSelectedBarsChange({
          bars: activeBars.length === serie.data.length ? [] : activeBars,
          chartInstance
        });
      }
    },
    [onSelectedBarsChange, theme]
  );

  const onEvents = useMemo(
    () => ({
      click: clickEvent
    }),
    [clickEvent]
  );

  return (
    <div>
      {filterable && onSelectedBarsChange && (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          className={classes.optionsSelectedBar}
        >
          <Typography variant='caption'>
            {selectedBars && selectedBars.length ? selectedBars.length : 'All'} selected
          </Typography>
          {selectedBars && selectedBars.length > 0 && (
            <Link className={classes.selectAllButton} onClick={() => clearBars()}>
              Clear
            </Link>
          )}
        </Grid>
      )}
      {!!options && (
        <EchartsWrapper
          ref={chartInstance}
          option={options}
          lazyUpdate={true}
          onEvents={filterable && onEvents}
          style={{ height }}
        />
      )}
    </div>
  );
}

HistogramWidgetUI.defaultProps = {
  tooltip: true,
  tooltipFormatter: (v) => v,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  dataAxis: [],
  name: null,
  onSelectedBarsChange: null,
  animation: true,
  filterable: true
};

HistogramWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  dataAxis: PropTypes.array,
  name: PropTypes.string,
  onSelectedBarsChange: PropTypes.func,
  height: PropTypes.number,
  animation: PropTypes.bool,
  filterable: PropTypes.bool
};

export default HistogramWidgetUI;
