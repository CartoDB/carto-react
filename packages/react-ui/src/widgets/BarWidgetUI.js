import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles, darken } from '@material-ui/core';
import detectTouchScreen from './utils/detectTouchScreen';
import { dequal } from 'dequal';
import { processFormatterRes } from './utils/formatterUtils';
import { defaultTooltipFormatter } from './utils/chartUtils';

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

function BarWidgetUI(props) {
  const theme = useTheme();
  const classes = useStyles();

  const [selectedBars, setSelectedBars] = useState([]);

  // Due to BarWidgetUI nature, it props admits multiple shapes.
  // In useProcessProps we convert those multiple shapes in a common one
  // to avoid complex logic in the component.
  const {
    data,
    xAxisData,
    yAxisData,
    onSelectedBarsChange,
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
  } = useProcessProps(props, { selectedBars, setSelectedBars });

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
      formatter() {
        return tooltipFormatter(xAxisFormatter, yAxisFormatter, ...arguments);
      }
    }),
    [theme, tooltip, tooltipFormatter, xAxisFormatter, yAxisFormatter]
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
        formatter: (v) => processFormatterRes(xAxisFormatter(v))
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
      dataValues = data.reduce((acc, row) => {
        row.forEach(
          (value, idx) =>
            (acc[idx] = (acc[idx] || 0) + (value ?? Number.MIN_SAFE_INTEGER))
        );
        return acc;
      }, []);
    } else {
      dataValues = data.flat().map((value) => value ?? Number.MIN_SAFE_INTEGER);
    }
    return Math.max(...dataValues);
  }, [data, stacked]);

  const yAxisOptions = useMemo(
    () => ({
      type: 'value',
      axisLabel: {
        margin: 0,
        verticalAlign: 'bottom',
        padding: [0, 0, theme.typography.charts.fontSize, vertical ? 0 : 35],
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
        formatter: (v) => processFormatterRes(yAxisFormatter(v))
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

  // Serie
  const seriesOptions = useMemo(
    () =>
      data.map((row, componentIdx) => ({
        type: 'bar',
        name: yAxisDataWithLabels[componentIdx] || '',
        animation,
        data: row.map((value, dataIdx) => {
          const isSelected = selectedBars.some(
            ([sDataIdx, sComponentIdx = 0]) =>
              sDataIdx === dataIdx && sComponentIdx === componentIdx
          );
          const isDisabled = !!selectedBars.length && !!!isSelected;
          return {
            value,
            ...(isDisabled && {
              itemStyle: { color: theme.palette.charts.disabled },
              disabled: true
            })
          };
        }),
        ...(stacked && { stack: 'total' }),
        ...(!IS_TOUCH_SCREEN && {
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: darken(colors[componentIdx] || '#000', 0.25)
            }
          }
        })
      })),
    [animation, colors, yAxisDataWithLabels, data, selectedBars, stacked, theme]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacing(0.5),
        top: theme.spacing(2),
        right: vertical ? theme.spacing(0.5) : theme.spacing(5),
        bottom: theme.spacing(0),
        containLabel: true
      },
      axisPointer: {
        lineStyle: {
          color: theme.palette.charts.axisPointer
        }
      },
      color: colors,
      tooltip: tooltipOptions,
      xAxis: vertical ? xAxisOptions : yAxisOptions,
      yAxis: vertical ? yAxisOptions : xAxisOptions,
      series: seriesOptions
    }),
    [theme, colors, tooltipOptions, xAxisOptions, yAxisOptions, seriesOptions, vertical]
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
        const selectedBarsCp = [...selectedBars];
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
            value: data[sComponentIndex][sDataIndex]
          })
        );
        onSelectedBarsChange(selectedBarsCp, selectedBarsAsObject);
      }
    },
    [data, onSelectedBarsChange, selectedBars, vertical, xAxisData, yAxisData]
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
  tooltipFormatter: defaultTooltipFormatter,
  yAxisData: [],
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  selectedBars: [],
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
  selectedBars: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  onSelectedBarsChange: PropTypes.func,
  height: PropTypes.number,
  animation: PropTypes.bool
};

export default BarWidgetUI;

// Aux

function useProcessProps(props, { selectedBars, setSelectedBars }) {
  const theme = useTheme();
  const {
    height,
    selectedBars: _selectedBars,
    data: _data,
    colors: _colors,
    yAxisData
  } = props;

  // Selected bars
  useEffect(() => {
    const formattedSelectedBars = formatSelectedBars(_selectedBars);
    if (!dequal(formattedSelectedBars, selectedBars)) {
      setSelectedBars(formattedSelectedBars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_selectedBars]);

  // Use data always as a two-dimensions array
  const data = useMemo(() => (Array.isArray(_data[0]) ? _data : [_data]), [_data]);

  // Colors
  const colors = useMemo(
    () =>
      _colors ||
      (data.length <= 1 || (yAxisData.length && yAxisData.length <= 1)
        ? [theme.palette.secondary.main]
        : data.length === 2 || (yAxisData.length && yAxisData.length === 2)
        ? [theme.palette.secondary.light, theme.palette.secondary.dark]
        : Object.values(theme.palette.qualitative.bold || {})),
    [_colors, theme, data, yAxisData]
  );

  return {
    ...props,
    height: height ?? theme.spacing(22),
    selectedBars,
    setSelectedBars,
    data,
    colors
  };
}

function formatSelectedBars(selectedBars) {
  if (!selectedBars.length) {
    return [];
  }

  // Correct formatter is: [[0, 0], [0, 1]] where first element is X and second element is Y
  return selectedBars.map((barCoords) => {
    const isWellFormatted = Array.isArray(barCoords) && barCoords.length === 2;
    if (isWellFormatted) {
      return barCoords;
      // It means selectedBars is [0, 1]
    } else if (!Array.isArray(barCoords)) {
      return [barCoords, 0];
      // It means selectedBars is [[0], [1]]
    } else {
      return [...Array(2)].map((_, idx) => barCoords[idx] || 0);
    }
  });
}
