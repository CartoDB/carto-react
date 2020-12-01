import React, { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';
import applyChartFilter from '../utils/applyChartFilter'
import getChartSerie from '../utils/getChartSerie'

function __generateDefaultConfig({ tooltipFormatter }, theme) {
  return {
    grid: {
      left: theme.spacing(0),
      top: theme.spacing(0),
      right: theme.spacing(0),
      bottom: theme.spacing(0),
    },
    color: [theme.palette.secondary.dark, theme.palette.secondary.main, theme.palette.secondary.light],
    tooltip: {
      trigger: 'item',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      backgroundColor: theme.palette.other.tooltip,
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {}),
    },
    legend: {
      selectedMode: false,  // TODO
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
        padding: [0, 0, 0, theme.spacing(1.5)],
        
      },
      inactiveColor: theme.palette.text.disabled,
    },
  };
}

function __generateSerie(name, data, theme, selectedCategories) {
  return [
    {
      type: 'pie',
      name,
      data: data.map(item => {
        const disabled = selectedCategories && selectedCategories.length && selectedCategories.some(c => c === item.name)
        if (disabled) {
          return {
            ...item,
            disabled: true,
            itemStyle: { color: theme.palette.charts.disabled },
          }
        }

        if (item.color) {
          return {
            ...item,
            itemStyle: { color: item.color },
          }
        }

        return item;
      }),
      radius: ['59%', '70%'],
      selectedOffset: 0,
      hoverOffset: 5,
      label: {
        formatter: '{per|{d}%}\n{b|{b}}',
        position: 'center',
        rich: {
          b: {
            fontFamily: theme.typography.charts.fontFamily,
            fontSize: theme.spacing(1.75),
            lineHeight: theme.spacing(1.75),
            fontWeight: 'normal',
            color: theme.palette.text.primary,
          },
          per: {
            ...theme.typography,
            fontSize: theme.spacing(3),
            lineHeight: theme.spacing(4.5),
            fontWeight: 600,
            color: theme.palette.text.primary,
          }
        }
      },
    },
  ];
}

function __getDefaultLabel (data) {
  return data.filter(c => !c.disabled).reduce((prev, current) => (prev.value > current.value) ? prev : current)
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) => __dataEqual(optionPrev, optionNext)
);

function PieWidgetUI (props) {
  const theme = useTheme();
  const {
    name,
    data = [],
    tooltipFormatter,
    height,
    selectedCategories,
    onSelectedCategoriesChange
  } = props;

  const chartInstance = useRef();
  const options = useMemo(() => {
    const config = __generateDefaultConfig({ tooltipFormatter }, theme);
    const series = __generateSerie(name, data, theme, selectedCategories);
    return Object.assign({}, config, { series });
  }, [
    data,
    name,
    theme,
    tooltipFormatter,
  ]);
  let defaultLabel = __getDefaultLabel(options.series[0].data);
  let echart;

  useEffect(() => {
    echart = chartInstance.current.getEchartsInstance();

    const { option, serie } = getChartSerie(echart, 0);
    serie.data.forEach(serie => {
      if (serie.name === defaultLabel.name) {
        serie.label = { show: true };
      } else {
        serie.label = { show: false };
      }
    });

    echart.setOption(option, true);
  }, []);

  const clickEvent = (params) => {
    if (onSelectedCategoriesChange) {
      const { option, serie } = getChartSerie(echart, params.seriesIndex);
      applyChartFilter(serie, params.dataIndex, theme);
      echart.setOption(option, true);

      const activeSeries = [];
      serie.data.forEach((d, index) => {
        if (!d.disabled) {
          activeSeries.push(index);
        }
      });
      
      defaultLabel = __getDefaultLabel(activeSeries.map(i => serie.data[i]));

      onSelectedCategoriesChange({
        series: activeSeries.length === serie.data.length ? [] : activeSeries,
        chartInstance,
      });
    }
  };

  const mouseoverEvent = (params) => {
    const { option, serie } = getChartSerie(echart, params.seriesIndex);
    serie.data.forEach(d => {
      d.label.show = d.name === params.data.name;
      d.emphasis.label.show = d.name === params.data.name;
    });

    echart.setOption(option, true);
  };
  
  const mouseoutEvent = (params) => {
    const { option, serie } = getChartSerie(echart, params.seriesIndex);
    serie.data.forEach(d => {
      d.label.show = d.name === defaultLabel.name;
      d.emphasis.label.show = d.name === defaultLabel.name;
    });

    echart.setOption(option, true);
  };

  const onEvents = {
    click: clickEvent,
    mouseover: mouseoverEvent,
    mouseout: mouseoutEvent,
  };

  return (
    <div>
      <EchartsWrapper
        ref={chartInstance}
        option={options}
        onEvents={onEvents}
        lazyUpdate={true}
        style={{ height }}
      />
    </div>
  );
}

PieWidgetUI.defaultProps = {
  tooltipFormatter: (params) => {
    const colorSpan = color => `<span style="display:inline-block;margin-right:4px;border-radius:4px;width:8px;height:8px;background-color:${color}"></span>`;
    return `<p style="font-size:12px;font-weight:600;line-height:1.33;margin:4px 0 4px 0;">${params.name}</p>
            <p style="font-size: 12px;font-weight:normal;line-height:1.33;margin:0 0 4px 0;">${colorSpan(params.data.color || params.color)} ${params.value} (${params.percent}%)</p>`;
  },
  name: null,
  height: 300,
  selectedCategories: [],
};

PieWidgetUI.propTypes = {
  data: PropTypes.array.isRequired,
  tooltipFormatter: PropTypes.func,
  name: PropTypes.string,
  height: PropTypes.number,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
};

export default PieWidgetUI;