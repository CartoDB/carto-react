import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';
import {
  getChartSerie,
  applyChartFilter,
  areChartPropsEqual,
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

function __generateSerie({ name, data, theme, animation, selectedCategories, labels }) {
  return [
    {
      type: 'pie',
      name,
      animation,
      data: data.map((item) => {
        // Avoid modify data item
        const clonedItem = { ...item };

        if (labels?.[clonedItem.name]) {
          clonedItem.name = labels[clonedItem.name];
        }

        const disabled =
          selectedCategories?.length && !selectedCategories.includes(clonedItem.name);

        if (disabled) {
          disableSerie(clonedItem, theme);
          return clonedItem;
        }

        setColor(clonedItem);

        return clonedItem;
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
  ({ option: optionPrev }, { option: optionNext }) =>
    areChartPropsEqual(optionPrev, optionNext)
);

function PieWidgetUI({
  name,
  data = [],
  formatter,
  tooltipFormatter,
  height,
  labels,
  colors,
  animation,
  filterable,
  selectedCategories,
  onSelectedCategoriesChange
}) {
  const theme = useTheme();
  const chartInstance = useRef();
  const [options, setOptions] = useState({
    series: []
  });
  const [elementHover, setElementHover] = useState();
  let defaultLabel = useRef({});
  const colorByCategory = useRef({});

  const updateLabel = (params) => {
    const echart = chartInstance.current.getEchartsInstance();
    const { option, serie } = getChartSerie(echart, params.seriesIndex);
    serie.data.forEach((category) => {
      category.label.show = category.name === params.data.name;
      category.emphasis.label.show = category.name === params.data.name;
    });
    echart.setOption(option, true);
  };

  // Reset colorByCategory when colors changes
  // Spread colors array to avoid reference problems
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => (colorByCategory.current = {}), [...(colors || [])]);

  const dataWithColor = useMemo(() => {
    return (data || []).map((item) => {
      const { name } = item;
      const colorUsed = colorByCategory.current[name];
      if (colorUsed) {
        item.color = colorUsed;
      } else {
        const paletteToUse = colors || theme.palette.qualitative.bold;
        const colorToUse =
          paletteToUse[Object.keys(colorByCategory.current).length] || '#fff';
        colorByCategory.current[name] = colorToUse;
        item.color = colorToUse;
      }
      return item;
    });
  }, [data, colors, theme.palette.qualitative.bold]);

  useEffect(() => {
    const config = __generateDefaultConfig({ formatter, tooltipFormatter }, theme);
    const series = __generateSerie({
      name,
      data: dataWithColor,
      theme,
      color: config.color,
      selectedCategories,
      labels,
      animation
    });

    setOptions({
      ...config,
      series
    });
  }, [
    dataWithColor,
    name,
    theme,
    tooltipFormatter,
    formatter,
    selectedCategories,
    labels,
    animation
  ]);

  useEffect(() => {
    const label = elementHover || __getDefaultLabel(options.series[0]?.data);
    defaultLabel.current = label;
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    const echart = chartInstance.current.getEchartsInstance();
    const { option, serie } = getChartSerie(echart, 0);
    serie?.data.forEach((category) => {
      if (category.name === defaultLabel.current.name) {
        category.label = { show: true };
        category.emphasis = { label: { show: true } };
      } else {
        category.label = { show: false };
        category.emphasis = { label: { show: false } };
      }
    });

    echart.setOption(option, true);
  }, [options, defaultLabel]);

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
        const echart = chartInstance.current.getEchartsInstance();
        const { option, serie } = getChartSerie(echart, params.seriesIndex);

        applyChartFilter(serie, params.dataIndex, theme);

        echart.setOption(option, true);

        const activeCategories = serie.data.filter((category) => !category.disabled);

        defaultLabel.current = __getDefaultLabel(activeCategories);

        onSelectedCategoriesChange(
          activeCategories.length === serie.data.length
            ? []
            : activeCategories.map((category) => category.name)
        );
      }
    },
    [onSelectedCategoriesChange, theme]
  );

  const mouseoverEvent = useCallback((params) => {
    setElementHover(params.data);
    updateLabel(params);
  }, []);

  const mouseoutEvent = useCallback(
    (params) => {
      setElementHover();

      const data = {
        ...params,
        data: defaultLabel.current
      };
      updateLabel(data);
    },
    [defaultLabel]
  );

  const onEvents = useMemo(
    () => ({
      ...(filterable && { click: clickEvent }),
      mouseover: mouseoverEvent,
      mouseout: mouseoutEvent
    }),
    [filterable, clickEvent, mouseoverEvent, mouseoutEvent]
  );

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
  labels: {},
  height: '260px',
  animation: true,
  filterable: true,
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
  labels: PropTypes.object,
  colors: PropTypes.array,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  height: PropTypes.string,
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func
};

export default PieWidgetUI;
