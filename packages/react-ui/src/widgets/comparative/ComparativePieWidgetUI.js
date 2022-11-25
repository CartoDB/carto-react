import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core';
import { lighten } from '@material-ui/core';
import EchartsWrapper from '../../custom-components/echarts-for-react';

/**
 * process incoming data to assign labels, colors and selected / unselected styles
 * @param {{ name: string; value: number; }[]} data
 * @param {string[]} [colors]
 * @param {string[]} [labels]
 * @param {Object} [theme]
 * @param {string[]} [selectedCategories]
 */
function processData(data, colors = [], labels = [], theme, selectedCategories = []) {
  return data.map((item, index) => {
    const isDisabled =
      selectedCategories.length > 0 && selectedCategories.indexOf(item.name) === -1;
    const palette = colors?.length ? colors : theme.palette.qualitative.bold;
    return {
      ...item,
      key: item.name,
      color: isDisabled ? lighten(palette[index], 0.8) : palette[index],
      name: labels[index] || item.name
    };
  });
}

function defaultTooltipFormatter(params) {
  const titleStyle = `
    font-size: 12px;
    line-height: 1.33;
    font-weight: 600;
    margin: 4px 0 4px 0;
  `;
  const valueStyle = `
    font-size: 12px;
    line-height: 1.33;
    font-weight: normal;
    margin: 0 0 4px 0;
  `;

  const singleParams = Array.isArray(params) ? params[0] : params;
  const data = singleParams.data;
  const value = params.formatter(data.value);
  const label = params.isMultiple ? singleParams.seriesName : value;

  return `
    <p style="${titleStyle}">${data.name}</p>
    <p style="${valueStyle}">${singleParams.marker} ${label} (${params.formatter(
    singleParams.percent
  )} %)</p>
  `.trim();
}

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

/**
 * Renders a `<ComparativePieWidgetUI />` widget
 *
 * <!--
 * @param {Object} props
 * @param {string[]} props.names
 * @param {{ name: string; value: number; }[][]} [props.data]
 * @param {string[][]} [props.labels]
 * @param {string[][]} [props.colors]
 * @param {string} [props.height]
 * @param {boolean} [props.animation]
 * @param {(v: number) => string} [props.formatter]
 * @param {(v: any) => string} [props.tooltipFormatter]
 * @param {string[]} [props.selectedCategories]
 * @param {(categories: string[]) => any} [props.onCategorySelected]
 * -->
 */
function ComparativePieWidgetUI({
  names = EMPTY_ARRAY,
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  height = '260px',
  animation,
  formatter = IDENTITY_FN,
  tooltipFormatter = defaultTooltipFormatter,
  selectedCategories = [],
  onCategorySelected = IDENTITY_FN
}) {
  /** @type {any} */
  const theme = useTheme();

  /** @type {any} */
  const chartRef = useRef();

  const processedData = useMemo(() => {
    return data.map((d, i) =>
      processData(d, colors[i], labels[i], theme, selectedCategories)
    );
  }, [data, colors, labels, theme, selectedCategories]);

  const options = useMemo(() => {
    const isMultiple = processedData.length > 1;
    const tooltip = {
      trigger: 'item',
      show: true,
      backgroundColor: theme.palette.other.tooltip,
      textStyle: { color: theme.palette.common.white },
      confine: true,
      borderWidth: 0,
      formatter:
        !!tooltipFormatter &&
        ((params) =>
          tooltipFormatter({
            ...params,
            formatter,
            isMultiple
          }))
    };

    const legendData = isMultiple
      ? processedData.map((d, i) => names[i])
      : (processedData[0] || []).map((d) => d.name);

    const legend = {
      data: legendData,
      selectedMode: false,
      type: 'scroll',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      itemGap: theme.spacing(3),
      icon: 'circle',
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      textStyle: {
        ...theme.typography.charts,
        color: theme.palette.text.primary,
        lineHeight: 1,
        verticalAlign: 'bottom',
        padding: [0, 0, 0, theme.spacing(0.5)]
      },
      inactiveColor: theme.palette.text.disabled,
      pageIcons: {
        horizontal: [
          'path://M15.41 7.41 14 6 8 12 14 18 15.41 16.59 10.83 12z',
          'path://M9 16.59 13.3265857 12 9 7.41 10.3319838 6 16 12 10.3319838 18z'
        ]
      },
      pageIconSize: theme.spacing(1.5),
      pageIconColor: theme.palette.text.secondary,
      pageIconInactiveColor: theme.palette.text.disabled,
      pageTextStyle: {
        fontFamily: theme.typography.charts.fontFamily,
        fontSize: theme.spacing(1.5),
        lineHeight: theme.spacing(1.75),
        fontWeight: 'normal',
        color: theme.palette.text.primary
      }
    };
    const labelOptions = {
      formatter: ({ name, percent }) => `{per|${formatter(percent)}%}\n{b|${name}}`,
      position: 'center',
      rich: {
        b: {
          fontFamily: theme.typography.charts.fontFamily,
          fontSize: theme.spacing(1.75),
          lineHeight: theme.spacing(1.75),
          fontWeight: 'normal',
          color: theme.palette.text.primary
        },
        per: {
          ...theme.typography.charts,
          fontSize: theme.spacing(3),
          lineHeight: theme.spacing(4.5),
          fontWeight: 600,
          color: theme.palette.text.primary
        }
      }
    };
    const series = processedData.map((data, i) => ({
      type: 'pie',
      name: names[i],
      itemStyle: {
        color: data[0]?.color
      },
      animation,
      data: data.map((d) => ({ ...d, itemStyle: { color: d.color } })),
      radius: i === 0 ? ['75%', '90%'] : ['56%', '72%'],
      selectedOffset: 0,
      hoverOffset: 5,
      bottom: theme.spacing(2.5),
      avoidLabelOverlap: true,
      label: { show: false, ...labelOptions },
      emphasis: {
        label: {
          show: true,
          formatter: labelOptions.formatter,
          rich: labelOptions.rich
        }
      }
    }));
    const grid = {
      left: theme.spacing(0),
      top: theme.spacing(0),
      right: theme.spacing(0),
      bottom: theme.spacing(0)
    };
    return { grid, tooltip, legend, series };
  }, [theme, names, animation, processedData, formatter, tooltipFormatter]);

  const onEvents = {
    mouseover: (selected, chart) => {
      if (processedData.length === 1) {
        if (selected.seriesIndex !== 0 || selected.dataIndex !== 0) {
          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0
          });
        }
      }
    },
    mouseout: (selected, chart) => {
      if (processedData.length === 1) {
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        });
      }
    },
    click: (ev) => {
      const item = processedData[ev.seriesIndex][ev.dataIndex];
      const category = item.key;
      const isSelected = selectedCategories.indexOf(category) !== -1;
      const set = new Set(selectedCategories);
      if (isSelected) {
        set.delete(category);
      } else {
        set.add(category);
      }

      const dataLength = processedData[0].length;
      let newCategories = Array.from(set);
      if (newCategories.length === dataLength) {
        newCategories = [];
      }

      onCategorySelected(newCategories);
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.dispatchAction({
        type: processedData.length === 1 ? 'highlight' : 'downplay',
        seriesIndex: 0,
        dataIndex: 0
      });
    }
  }, [processedData]);

  function onChartReady(chart) {
    chartRef.current = chart;
  }

  if (!processedData.length) {
    return null;
  }

  return (
    <EchartsWrapper
      onChartReady={onChartReady}
      notMerge
      option={options}
      onEvents={onEvents}
      style={{ maxHeight: height, width: '100%' }}
    />
  );
}

ComparativePieWidgetUI.displayName = 'ComparativePieWidgetUI';
ComparativePieWidgetUI.defaultProps = {
  names: EMPTY_ARRAY,
  data: EMPTY_ARRAY,
  labels: EMPTY_ARRAY,
  colors: EMPTY_ARRAY,
  height: '260px',
  animation: true,
  formatter: IDENTITY_FN,
  tooltipFormatter: defaultTooltipFormatter,
  selectedCategories: [],
  onCategorySelected: IDENTITY_FN
};
ComparativePieWidgetUI.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })
    )
  ),
  labels: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  height: PropTypes.string,
  animation: PropTypes.bool,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onCategorySelected: PropTypes.func
};

export default ComparativePieWidgetUI;
