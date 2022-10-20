import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import ReactEcharts from '../../custom-components/echarts-for-react';
import { alpha, darken, Grid, Link, Typography, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { processFormatterRes } from '../utils/formatterUtils';
import detectTouchscreen from '../utils/detectTouchScreen';
import useHistogramInteractivity from './useHistogramInteractivity';

const IS_TOUCH_SCREEN = detectTouchscreen();

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
  clearButton: {
    ...theme.typography.caption,
    cursor: 'pointer'
  }
}));

function HistogramWidgetUI({
  data,
  ticks,
  min,
  max,
  xAxisFormatter,
  yAxisFormatter,
  selectedBars,
  onSelectedBarsChange,
  tooltip,
  tooltipFormatter,
  animation,
  filterable: _filterable,
  height
}) {
  const classes = useStyles();
  const theme = useTheme();

  const filterable = _filterable && !!onSelectedBarsChange;

  const [echartsInstance, setEchartInstance] = useState();
  const onChartReady = (_echartsInstance) => setEchartInstance(_echartsInstance);

  const formattedData = useMemo(
    () => formatData(data, ticks, min, max),
    [data, ticks, min, max]
  );

  const { onEvents, markAreaOptions } = useHistogramInteractivity({
    data: formattedData,
    filterable,
    selectedBars,
    onSelectedBarsChange,
    echartsInstance
  });

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
      show: tooltip,
      trigger: 'item',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white
      },
      backgroundColor: alpha(theme.palette.common.black, 0.9),
      confine: true,
      position: 'top',
      formatter(params) {
        return tooltipFormatter(params, xAxisFormatter, yAxisFormatter);
      }
    }),
    [theme, tooltip, tooltipFormatter, xAxisFormatter, yAxisFormatter]
  );

  // xAxis
  const xAxisOptions = useMemo(
    () => ({
      min,
      max,
      interval: (max - min) / formattedData.length,
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: alpha(theme.palette.common.black, 0.04)
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        ...theme.typography.overlineDelicate,
        hideOverlap: true,
        padding: [theme.spacing(0.5), theme.spacing(0.5), 0, theme.spacing(0.5)],
        formatter: (value) => {
          const formattedValue = processFormatterRes(xAxisFormatter(value));
          return value === min
            ? formatMin(formattedValue)
            : value === max
            ? formatMax(formattedValue)
            : formattedValue;
        },
        color: alpha(theme.palette.common.black, 0.6)
      }
    }),
    [min, max, formattedData.length, theme, xAxisFormatter]
  );

  // yAxis
  const yAxisOptions = useMemo(
    () => ({
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: alpha(theme.palette.common.black, 0.04)
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 0,
        verticalAlign: 'bottom',
        padding: [0, 0, theme.typography.overlineDelicate.fontSize, 0],
        show: true,
        showMaxLabel: true,
        showMinLabel: false,
        inside: true,
        color: (value) => {
          const maxValue =
            Math.max(...data.map((d) => d ?? Number.MIN_SAFE_INTEGER)) || 1;
          let col = 'transparent';
          if (value >= maxValue) {
            col = alpha(theme.palette.common.black, 0.6);
          }

          return col;
        },
        ...theme.typography.overlineDelicate,
        formatter: (v) => processFormatterRes(yAxisFormatter(v))
      }
    }),
    [
      alpha(theme.palette.common.black, 0.04),
      alpha(theme.palette.common.black, 0.6),
      theme.typography.overlineDelicate,
      data,
      yAxisFormatter
    ]
  );

  // Series
  const seriesOptions = useMemo(() => {
    const dataWithColor = formattedData.map((item, idx) => {
      const isDisabled = selectedBars.length && selectedBars.indexOf(idx) === -1;
      const color = isDisabled
        ? alpha(theme.palette.common.black, 0.25)
        : theme.palette.secondary.main;

      return { value: item, itemStyle: { color } };
    });

    return {
      type: 'custom',
      cursor: 'pointer',
      markArea: markAreaOptions,
      renderItem: function (params, api) {
        const isLast = params.dataIndex === formattedData.length - 1;
        const isFirst = params.dataIndex === 0;

        const fill = dataWithColor[params.dataIndex].itemStyle.color;

        // Coords to build the bar
        const yValue = api.value(2);
        const [x, y] = api.coord([api.value(0), yValue]);
        const [width, height] = api.size([api.value(1) - api.value(0), yValue]);

        return {
          type: 'rect',
          shape: {
            x: x + (isFirst ? 0 : 1),
            y,
            width: width - (isLast ? 0 : 1),
            height
          },
          style: { fill },
          ...(!IS_TOUCH_SCREEN && {
            emphasis: {
              style: {
                fill: darken(fill, 0.25)
              }
            }
          })
        };
      },
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2]
      },
      data: dataWithColor,
      animation
    };
  }, [
    formattedData,
    markAreaOptions,
    alpha(theme.palette.common.black, 0.25),
    theme.palette.secondary.main,
    selectedBars,
    animation
  ]);

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacing(0.1),
        right: theme.spacing(0.1),
        top: theme.spacing(2),
        bottom: theme.spacing(0.5),
        containLabel: true
      },
      tooltip: tooltipOptions,
      xAxis: xAxisOptions,
      yAxis: yAxisOptions,
      series: [seriesOptions]
    }),
    [tooltipOptions, xAxisOptions, yAxisOptions, seriesOptions, theme]
  );

  const countSelectedElements = selectedBars.reduce(
    (acc, barIndex) => (acc += data[barIndex] || 0),
    0
  );

  return (
    <div>
      {filterable && (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          className={classes.optionsSelectedBar}
        >
          <Typography variant='caption'>
            {selectedBars.length ? yAxisFormatter(countSelectedElements) : 'All'} selected
          </Typography>
          {selectedBars.length > 0 && (
            <Link
              className={classes.clearButton}
              onClick={() => onSelectedBarsChange([])}
            >
              Clear
            </Link>
          )}
        </Grid>
      )}
      <ReactEcharts
        option={options}
        onEvents={onEvents}
        lazyUpdate={true}
        onChartReady={onChartReady}
        style={{ maxHeight: height }}
      />
    </div>
  );
}

HistogramWidgetUI.defaultProps = {
  tooltip: true,
  tooltipFormatter: defaultTooltipFormatter,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  selectedBars: [],
  animation: true,
  filterable: true,
  height: 200
};

HistogramWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  selectedBars: PropTypes.arrayOf(PropTypes.number),
  onSelectedBarsChange: PropTypes.func,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  height: PropTypes.number
};

export default HistogramWidgetUI;

// Aux
function formatMin(value) {
  const spaces = Array(String(value).length).fill('  ').join('');
  return `${spaces}${value}`;
}

function formatMax(value) {
  const spaces = Array(String(value).length).fill('  ').join('');
  return `${value}${spaces}`;
}

function formatData(data, ticks, min, max) {
  return data.map((value, idx) => [
    idx === 0 ? min : ticks[idx - 1],
    idx === data.length - 1 ? max : ticks[idx],
    value
  ]);
}

function defaultTooltipFormatter(params, xAxisFormatter, yAxisFormatter) {
  if (Array.isArray(params)) {
    params = params[0];
  }

  if (params.data.value === undefined) {
    return;
  }

  const [left, right, value] = params.data.value;
  const title = `${processFormatterRes(
    xAxisFormatter(left)
  )} <span style="vertical-align: 1px;">—</span> ${processFormatterRes(
    xAxisFormatter(right)
  )}`;
  const formattedValue = processFormatterRes(yAxisFormatter(value));
  const item = `<div style="margin-left: 8px; display: inline">
        ${formattedValue}
        </div>`;
  return `${title} <div style="margin-top: 4px">${params.marker}${item}</div>`;
}
