import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles, darken } from '@material-ui/core';
import detectTouchScreen from './utils/detectTouchScreen';

const IS_TOUCH_SCREEN = detectTouchScreen();

const tooltipFormatter = function (params, _ticket, _callback, xAxisFormatter, yAxisFormatter) {
  if (params instanceof Array) {
    if (params.length) {
      let message = '';
      message += `${xAxisFormatter(params[0].axisValueLabel)}`;
      params.forEach((param) => {
        const seriesName = params.length > 1 ? param.seriesName + ':' : '';
        const item = `<div style="margin-left: 8px; display: inline">${seriesName}${
          yAxisFormatter(param.value)
        }${param.data.unit || ''}</div>`;
        message += `<div style="margin-top: 4px">${param.marker}${item}</div>`;
      });
      return message;
    } else {
      return null;
    }
  } else {
    let message = '';
    message += `${params[0].axisValueLabel}`;
    message += `<br/>${params.marker}${params.seriesName}: ${params.value}${
      params.data.unit || ''
    }`;
    return message;
  }
};

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

function BarWidgetUI({
  data,
  xAxisData,
  yAxisData,
  onSelectedBarsChange,
  selectedBars: _selectedBars,
  tooltip,
  tooltipFormatter,
  labels,
  colors,
  xAxisFormatter,
  yAxisFormatter,
  stacked,
  vertical,
  height,
  animation
}) {
  const theme = useTheme();
  const classes = useStyles();
  // const echartsInstance = useRef();
  // const zr = useRef();

  if (!height) {
    height = theme.spacing(22);
  }

  // Manage internal state
  const [selectedBars, setSelectedBars] = useState();
  useEffect(() => {
    if (_selectedBars !== selectedBars) {
      setSelectedBars(_selectedBars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_selectedBars]);

  // const onChartReady = (_echartsInstance) => {
  //   echartsInstance.current = _echartsInstance;
  //   zr.current = _echartsInstance.getZr();
  // };

  // Use data always as a two-dimensions array
  const formattedData = useMemo(() => (Array.isArray(data[0]) ? data : [data]), [data]);

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
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
      formatter () {
        return tooltipFormatter(...arguments, xAxisFormatter, yAxisFormatter);
      }
    }),
    [theme, tooltip, tooltipFormatter]
  );

  // xAxis
  const xAxisDataWithLabels = useMemo(
    () => xAxisData.map((name) => labels[name] || name),
    [xAxisData, labels]
  );

  const xAxisOptions = useMemo(
    () => ({
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
        formatter: (v) => {
          const formatted = xAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.prefix || ''}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        }
      },
      data: xAxisDataWithLabels
    }),
    [theme, xAxisDataWithLabels, xAxisFormatter]
  );

  // yAxis
  const yAxisDataWithLabels = useMemo(
    () => yAxisData.map((name) => labels[name] || name),
    [yAxisData, labels]
  );

  const maxValue = useMemo(() => {
    let dataValues = [];
    if (stacked) {
      dataValues = formattedData.reduce((acc, row) => {
        row.forEach(
          (value, idx) =>
            (acc[idx] = (acc[idx] || 0) + (value ?? Number.MIN_SAFE_INTEGER))
        );
        return acc;
      }, []);
    } else {
      dataValues = formattedData.flat().map((value) => value ?? Number.MIN_SAFE_INTEGER);
    }
    return Math.max(...dataValues);
  }, [formattedData, stacked]);

  const yAxisOptions = useMemo(
    () => ({
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
    }),
    [
      maxValue,
      theme.palette.charts.axisLine,
      theme.palette.charts.maxLabel,
      theme.typography.charts,
      yAxisFormatter
    ]
  );

  // Colors
  const chartColors = useMemo(
    () =>
      colors ||
      (yAxisData.length <= 1
        ? [theme.palette.secondary.main]
        : yAxisData.length === 2
        ? [theme.palette.primary.main, theme.palette.secondary.main]
        : Object.values(theme.palette.qualitative.bold || {})),
    [colors, theme, yAxisData]
  );

  // Serie
  const seriesOptions = useMemo(
    () =>
      formattedData.map((row, componentIdx) => ({
        type: 'bar',
        name: yAxisDataWithLabels[componentIdx],
        animation,
        data: row.map((value, dataIdx) => {
          const isSelected = selectedBars?.some(
            ([sDataIdx, sComponentIdx = 0]) =>
              sDataIdx === dataIdx && sComponentIdx === componentIdx
          );
          const isDisabled = !!selectedBars?.length && !!!isSelected;
          return {
            value,
            ...(isDisabled && {
              itemStyle: { color: theme.palette.charts.disabled },
              disabled: true
            })
          };
        }),
        ...(stacked
          ? { barMinWidth: '95%', stack: 'total', barCategoryGap: 1 }
          : { barGap: 0.025 }),
        ...(!IS_TOUCH_SCREEN && {
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: darken(chartColors[componentIdx] || '#000', 0.25)
            }
          }
        })
      })),
    [
      animation,
      chartColors,
      yAxisDataWithLabels,
      formattedData,
      selectedBars,
      stacked,
      theme
    ]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacing(0.5),
        top: theme.spacing(2),
        right: theme.spacing(1),
        bottom: theme.spacing(0),
        containLabel: true
      },
      axisPointer: {
        lineStyle: {
          color: theme.palette.charts.axisPointer
        }
      },
      color: chartColors,
      tooltip: tooltipOptions,
      xAxis: vertical ? xAxisOptions : yAxisOptions,
      yAxis: vertical ? yAxisOptions : xAxisOptions,
      series: seriesOptions
    }),
    [
      theme,
      chartColors,
      tooltipOptions,
      xAxisOptions,
      yAxisOptions,
      seriesOptions,
      vertical
    ]
  );

  const clearBars = () => {
    if (onSelectedBarsChange) {
      setSelectedBars([]);
      onSelectedBarsChange([], []);
    }
  };

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedBarsChange) {
        const selectedBarsCp = [...(selectedBars || [])];
        const { dataIndex, componentIndex } = params;

        const selectedIdx = selectedBarsCp.findIndex(
          ([sDataIndex, sComponentIndex = 0]) =>
            dataIndex === sDataIndex && componentIndex === sComponentIndex
        );

        if (selectedIdx === -1) {
          selectedBarsCp.push([dataIndex, componentIndex]);
        } else {
          selectedBarsCp.splice(selectedIdx, 1);
        }

        setSelectedBars(selectedBarsCp);

        const selectedBarsAsObject = selectedBarsCp.map(
          ([sDataIndex, sComponentIndex = 0]) => ({
            xAxis: vertical ? xAxisData[sDataIndex] : yAxisData[sDataIndex],
            yAxis: vertical ? yAxisData[sComponentIndex] : xAxisData[sComponentIndex],
            value: formattedData[sComponentIndex][sDataIndex]
          })
        );
        onSelectedBarsChange(selectedBarsCp, selectedBarsAsObject);
      }
    },
    [formattedData, onSelectedBarsChange, selectedBars, vertical, xAxisData, yAxisData]
  );

  const onEvents = useMemo(
    () => ({
      click: clickEvent
    }),
    [clickEvent]
  );

  return (
    <div>
      {onSelectedBarsChange && (
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
        <ReactEcharts
          option={options}
          lazyUpdate={true}
          onEvents={onEvents}
          style={{ height }}
        />
      )}
    </div>
  );
}

BarWidgetUI.defaultProps = {
  tooltip: true,
  tooltipFormatter,
  yAxisData: [],
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  labels: {},
  onSelectedBarsChange: null,
  animation: true,
  vertical: true,
  stacked: true
};

BarWidgetUI.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  xAxisData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  yAxisData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  colors: PropTypes.arrayOf(PropTypes.string),
  stacked: PropTypes.bool,
  vertical: PropTypes.bool,
  labels: PropTypes.object,
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  selectedBars: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onSelectedBarsChange: PropTypes.func,
  height: PropTypes.number,
  animation: PropTypes.bool
};

export default BarWidgetUI;
