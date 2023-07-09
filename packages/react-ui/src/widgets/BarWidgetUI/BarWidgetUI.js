import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from '../../custom-components/echarts-for-react';
import { Grid, Link, useTheme, darken, styled } from '@mui/material';
import detectTouchScreen from '../utils/detectTouchScreen';
import { processFormatterRes } from '../utils/formatterUtils';
import Typography from '../../components/atoms/Typography';
import BarSkeleton from './BarSkeleton';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const IS_TOUCH_SCREEN = detectTouchScreen();

const OptionsSelectedBar = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacingValue * 2,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiTypography-caption': {
    color: theme.palette.text.secondary
  }
}));

const SelectAllButton = styled(Link)(({ theme }) => ({
  ...theme.typography.caption,
  cursor: 'pointer'
}));

function BarWidgetUI(props) {
  // Due to BarWidgetUI nature, its props admits multiple shapes.
  // With useProcessedProps we convert those multiple shapes in a common one
  // to avoid complex logic in the component.
  const {
    yAxisData,
    xAxisData,
    series,
    selectedBars,
    onSelectedBarsChange,
    tooltip,
    tooltipFormatter,
    labels,
    colors,
    xAxisFormatter,
    yAxisFormatter,
    stacked,
    height,
    filterable,
    animation,
    isLoading,
    locale
  } = useProcessedProps(props);

  const isMultiSeries = series.length > 1;

  const theme = useTheme();

  const intl = useImperativeIntl(locale);

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
      show: tooltip,
      trigger: 'axis',
      padding: [theme.spacingValue * 0.5, theme.spacingValue],
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 11,
        color: theme.palette.common.white
      },
      backgroundColor: theme.palette.black[90],
      position: function (point, _params, _dom, _rect, size) {
        const position = { top: 0 };

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0];
        } else {
          position.right = size.viewSize[0] - point[0];
        }
        return position;
      },
      formatter(params) {
        return tooltipFormatter(params, yAxisFormatter);
      }
    }),
    [theme, tooltip, tooltipFormatter, yAxisFormatter]
  );

  // xAxis
  const xAxisDataWithLabels = useMemo(
    () =>
      xAxisData.map((name) => processFormatterRes(xAxisFormatter(labels[name] || name))),
    [xAxisData, labels, xAxisFormatter]
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
        ...theme.typography.overlineDelicate,
        padding: [theme.spacingValue * 0.5, 0, 0, 0]
      },
      data: xAxisDataWithLabels
    }),
    [theme, xAxisDataWithLabels]
  );

  // yAxis
  const maxValue = useMemo(() => {
    let dataValues = [];
    if (stacked) {
      dataValues = yAxisData.reduce((acc, row) => {
        row.forEach(
          (value, idx) =>
            (acc[idx] = (acc[idx] || 0) + (value ?? Number.MIN_SAFE_INTEGER))
        );
        return acc;
      }, []);
    } else {
      dataValues = yAxisData.flat().map((value) => value ?? Number.MIN_SAFE_INTEGER);
    }
    return Math.max(...dataValues);
  }, [yAxisData, stacked]);

  const yAxisOptions = useMemo(
    () => ({
      type: 'value',
      axisLabel: {
        margin: 0,
        verticalAlign: 'bottom',
        padding: [0, 0, theme.spacingValue * 1.25, 0],
        show: true,
        showMaxLabel: true,
        showMinLabel: false,
        inside: true,
        color: (value) => (value >= maxValue ? theme.palette.black[60] : 'transparent'),
        ...theme.typography.overlineDelicate,
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
          color: theme.palette.black[4]
        }
      }
    }),
    [
      maxValue,
      theme.palette.black,
      theme.typography.overlineDelicate,
      theme.spacingValue,
      yAxisFormatter
    ]
  );

  // Serie
  const seriesOptions = useMemo(
    () =>
      yAxisData.map((row, componentIdx) => ({
        type: 'bar',
        name: series[componentIdx] || '',
        animation,
        barMaxWidth: 100,
        data: row.map((value, dataIdx) => {
          const isSelected = selectedBars.some(
            ([sDataIdx, sComponentIdx = 0]) =>
              sDataIdx === dataIdx && sComponentIdx === componentIdx
          );
          const isDisabled = !!selectedBars.length && !isSelected;
          return {
            value,
            ...(isDisabled && {
              itemStyle: { color: theme.palette.black[25] },
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
    [animation, colors, series, yAxisData, selectedBars, stacked, theme]
  );

  const options = useMemo(
    () => ({
      grid: {
        left:
          xAxisDataWithLabels.length >= 4
            ? calculateMargin(xAxisDataWithLabels[0], xAxisDataWithLabels.length)
            : 0,
        top: theme.spacingValue * 2,
        right:
          xAxisDataWithLabels.length >= 4
            ? calculateMargin(
                xAxisDataWithLabels[xAxisDataWithLabels.length - 1],
                xAxisDataWithLabels.length
              )
            : 0,
        bottom: 0,
        containLabel: true
      },
      axisPointer: {
        lineStyle: {
          color: theme.palette.black[40]
        }
      },
      color: colors,
      tooltip: tooltipOptions,
      xAxis: xAxisOptions,
      yAxis: yAxisOptions,
      series: seriesOptions
    }),
    [
      xAxisDataWithLabels,
      theme,
      colors,
      tooltipOptions,
      xAxisOptions,
      yAxisOptions,
      seriesOptions
    ]
  );

  const clearBars = () => {
    if (onSelectedBarsChange) {
      onSelectedBarsChange([], []);
    }
  };

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedBarsChange) {
        let selectedBarsCp = [...selectedBars];
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

        let selectedBarsAsObject = selectedBarsCp.map(
          ([sDataIndex, sComponentIndex = 0]) => ({
            xAxis: xAxisData[sDataIndex],
            serie: series[sComponentIndex],
            yAxis: yAxisData[sComponentIndex][sDataIndex]
          })
        );

        if (!isMultiSeries) {
          selectedBarsCp = selectedBarsCp.map(
            (selectedBarPosition) => selectedBarPosition[0]
          );
        }

        onSelectedBarsChange(selectedBarsCp, selectedBarsAsObject);
      }
    },
    [yAxisData, onSelectedBarsChange, selectedBars, xAxisData, series, isMultiSeries]
  );

  const onEvents = useMemo(
    () =>
      filterable
        ? {
            click: clickEvent
          }
        : {},
    [filterable, clickEvent]
  );

  if (isLoading) return <BarSkeleton height={height} />;

  return (
    <div>
      {onSelectedBarsChange && (
        <OptionsSelectedBar container>
          <Typography variant='caption'>
            {selectedBars.length > 0
              ? intl.formatMessage(
                  { id: 'c4r.widgets.bar.selectedItems' },
                  { items: selectedBars.length }
                )
              : intl.formatMessage({ id: 'c4r.widgets.bar.all' })}
          </Typography>
          {selectedBars && selectedBars.length > 0 && (
            <SelectAllButton onClick={() => clearBars()} underline='hover'>
              {intl.formatMessage({ id: 'c4r.widgets.bar.clear' })}
            </SelectAllButton>
          )}
        </OptionsSelectedBar>
      )}
      {!!options && (
        <ReactEcharts
          option={options}
          lazyUpdate={true}
          notMerge={true}
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
  series: [],
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  selectedBars: [],
  labels: {},
  onSelectedBarsChange: null,
  animation: true,
  filterable: true,
  stacked: true
};

const numberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

BarWidgetUI.propTypes = {
  yAxisData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.arrayOf(numberOrString)),
    PropTypes.arrayOf(numberOrString)
  ]).isRequired,
  xAxisData: PropTypes.arrayOf(numberOrString).isRequired,
  series: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  stacked: PropTypes.bool,
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
  height: numberOrString,
  filterable: PropTypes.bool,
  animation: PropTypes.bool,
  isLoading: PropTypes.bool,
  locale: PropTypes.string
};

export default BarWidgetUI;

// Aux
function calculateMargin(label = '', amountCategories = 0) {
  // For less than 8 characters and less than 15 categories, the margin isn't necessary
  if (amountCategories <= 15 && label.length <= 8) return 0;
  // Calculated manually. For each 6 characters, the margin should be 8.5px
  return (label.length * 8.5) / 6;
}

function defaultTooltipFormatter(params, yAxisFormatter) {
  if (!params || !params?.length) {
    return null;
  }

  let message = '';
  message += params[0].axisValueLabel;
  message += params
    .map(({ seriesName, value, data, marker }) => {
      const formattedSeriesName = seriesName ? seriesName + ': ' : '';
      const formattedValue = processFormatterRes(yAxisFormatter(value));
      const item = `<div style="margin-left: 8px; display: inline">
        ${formattedSeriesName}${formattedValue}${data.unit || ''}
        </div>`;
      return `<div style="margin-top: 4px">${marker}${item}</div>`;
    })
    .join(' ');
  return message;
}

function useProcessedProps({
  labels,
  height,
  selectedBars: _selectedBars,
  yAxisData: _yAxisData,
  colors: _colors,
  series: _series,
  ...props
}) {
  const theme = useTheme();

  // Format series with labels, we don't need original series labels in the widget
  const series = useMemo(
    () => _series.map((name) => labels[name] || name),
    [_series, labels]
  );

  // Use yAxisData always as a two-dimensions array
  const yAxisData = useMemo(
    () => (Array.isArray(_yAxisData[0]) ? _yAxisData : [_yAxisData]),
    [_yAxisData]
  );

  // Colors
  const colors = useMemo(() => {
    // Use colors props if exists
    if (typeof _colors === 'string') return [_colors];
    if (Array.isArray(_colors) && _colors.length) return _colors;

    // Use secondary.main, if yAxisData is flat or series has a unique element
    if (yAxisData.length <= 1 || series.length === 1)
      return [theme.palette.secondary.main];

    // Use secondary light and dark, if yAxisData is bidimensional or series has two elements
    if (yAxisData.length === 2 || series.length === 2)
      return [theme.palette.secondary.light, theme.palette.secondary.dark];

    // Use qualitate palette with mutidimensional bar chart
    return Object.values(theme.palette.qualitative.bold || {});
  }, [_colors, theme, yAxisData, series]);

  return {
    ...props,
    labels,
    height: height ?? theme.spacingValue * 22,
    selectedBars: formatSelectedBars(_selectedBars),
    yAxisData,
    colors,
    series
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
