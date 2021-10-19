import React, { useMemo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';
import {
  getChartSerie,
  applyChartFilter,
  isDataEqual,
  disableSerie,
  setColor
} from './utils/chartUtils';

function __generateDefaultConfig({ tooltipFormatter, formatter }, theme) {
  return {
    grid: {
      left: theme.spacing(0),
      top: theme.spacing(0),
      right: theme.spacing(0),
      bottom: theme.spacing(0)
    },
    tooltip: {
      trigger: 'item',
      showDelay: 1000,
      transitionDuration: 0,
      backgroundColor: theme.palette.other.tooltip,
      confine: true,
      textStyle: {
        color: theme.palette.common.white
      },
      ...(tooltipFormatter
        ? { formatter: (params) => tooltipFormatter({ ...params, formatter }) }
        : {})
    },
    legend: {
      selectedMode: true,
      type: 'scroll',
      orient: 'horizontal',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      align: 'left',
      itemGap: theme.spacing(3),
      icon: 'circle',
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      // TODO: as prop?
      formatter: function (name) {
        return name.toUpperCase();
      },
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
    }
  };
}

function __generateSerie({ name, data, theme, color, selectedCategories }) {
  return [
    {
      type: 'pie',
      name,
      data: data.map((item) => {
        const disabled =
          selectedCategories?.length && !selectedCategories.includes(item.name);

        if (disabled) {
          disableSerie(item, theme);
          return item;
        }

        setColor(item);

        return item;
      }),
      radius: ['74%', '90%'],
      selectedOffset: 0,
      hoverOffset: 5,
      bottom: theme.spacing(2.5),
      label: {
        formatter: '{per|{d}%}\n{b|{b}}',
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
            ...theme.typography,
            fontSize: theme.spacing(3),
            lineHeight: theme.spacing(4.5),
            fontWeight: 600,
            color: theme.palette.text.primary
          }
        }
      }
    }
  ];
}

function __getDefaultLabel(data = []) {
  return data
    .filter((c) => !c.disabled)
    .reduce((prev, current) => (prev.value > current.value ? prev : current), {});
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) => isDataEqual(optionPrev, optionNext)
);

function PieWidgetUI({
  name,
  data = [],
  formatter,
  tooltipFormatter,
  height,
  colors,
  selectedCategories,
  onSelectedCategoriesChange
}) {
  const theme = useTheme();
  const chartInstance = useRef();
  const [options, setOptions] = useState({
    series: []
  });
  const [elementHover, setElementHover] = useState();
  let defaultLabel = useMemo(() => ({}), []);

  const updateLabel = (params) => {
    const echart = chartInstance.current.getEchartsInstance();
    const { option, serie } = getChartSerie(echart, params.seriesIndex);
    serie.data.forEach((category) => {
      category.label.show = category.name === params.data.name;
      category.emphasis.label.show = category.name === params.data.name;
    });
    echart.setOption(option, true);
  };

  const [colorByCategory, setColorByCategory] = useState({});

  // Reset color by category when colors changes
  // Spread colors array to avoid reference problems
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setColorByCategory({}), [...(colors || [])]);

  const dataWithColor = useMemo(() => {
    return (data || []).map((item) => {
      const { name } = item;
      const colorUsed = colorByCategory[name];
      if (colorUsed) {
        item.color = colorUsed;
      } else {
        const colorsToUse = colors || theme.palette.qualitative.bold;
        colorByCategory[name] =
          colorsToUse[Object.keys(colorByCategory).length] || '#fff';
        setColorByCategory({ ...colorByCategory });
      }
      return item;
    });
  }, [data, colorByCategory, colors, theme.palette.qualitative.bold]);

  useEffect(() => {
    const config = __generateDefaultConfig({ formatter, tooltipFormatter }, theme);
    const series = __generateSerie({
      name,
      data: dataWithColor,
      theme,
      color: config.color,
      selectedCategories
    });

    setOptions({
      ...config,
      series
    });
  }, [dataWithColor, name, theme, tooltipFormatter, formatter, selectedCategories]);

  useEffect(() => {
    const label = elementHover || __getDefaultLabel(options.series[0]?.data);
    // eslint-disable-next-line
    defaultLabel = label;
  }, [options]);

  useEffect(() => {
    const echart = chartInstance.current.getEchartsInstance();
    const { option, serie } = getChartSerie(echart, 0);
    serie?.data.forEach((category) => {
      if (category.name === defaultLabel.name) {
        category.label = { show: true };
        category.emphasis = { label: { show: true } };
      } else {
        category.label = { show: false };
        category.emphasis = { label: { show: false } };
      }
    });

    echart.setOption(option, true);
  }, [options, defaultLabel]);

  const clickEvent = (params) => {
    if (onSelectedCategoriesChange) {
      const echart = chartInstance.current.getEchartsInstance();
      const { option, serie } = getChartSerie(echart, params.seriesIndex);

      applyChartFilter(serie, params.dataIndex, theme);

      echart.setOption(option, true);

      const activeCategories = serie.data.filter((category) => !category.disabled);

      defaultLabel = __getDefaultLabel(activeCategories);

      onSelectedCategoriesChange(
        activeCategories.length === serie.data.length
          ? []
          : activeCategories.map((category) => category.name)
      );
    }
  };

  const mouseoverEvent = (params) => {
    setElementHover(params.data);
    updateLabel(params);
  };

  const mouseoutEvent = (params) => {
    setElementHover();

    const data = {
      ...params,
      data: defaultLabel
    };
    updateLabel(data);
  };

  const onEvents = {
    click: clickEvent,
    mouseover: mouseoverEvent,
    mouseout: mouseoutEvent
  };

  return (
    <EchartsWrapper
      ref={chartInstance}
      option={options}
      onEvents={onEvents}
      lazyUpdate={true}
      style={{ maxHeight: height }}
    />
  );
}

PieWidgetUI.defaultProps = {
  name: null,
  formatter: (v) => v,
  tooltipFormatter: (params) => {
    const value = params.formatter(params.value);
    const valueHtml =
      typeof value === 'object' && value !== null
        ? `${value.prefix || ''}${value.value}${value.suffix || ''}`
        : value;

    const colorSpan = (color) =>
      `<span style="display:inline-block;margin-right:4px;border-radius:4px;width:8px;height:8px;background-color:${color}"></span>`;
    return `<p style="font-size:12px;font-weight:600;line-height:1.33;margin:4px 0 4px 0;">${
      params.name
    }</p>
            <p style="font-size: 12px;font-weight:normal;line-height:1.33;margin:0 0 4px 0;">${colorSpan(
              params.data.color || params.textStyle.color
            )} ${valueHtml} (${params.percent}%)</p>`;
  },
  colors: null,
  height: '260px',
  selectedCategories: []
};

PieWidgetUI.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number
    })
  ),
  colors: PropTypes.array,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  height: PropTypes.string,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func
};

export default PieWidgetUI;
