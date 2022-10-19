import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from '../custom-components/echarts-for-react';
import { useTheme } from '@material-ui/core';
import { disableSerie, setColor } from './utils/chartUtils';
import { processFormatterRes } from './utils/formatterUtils';

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
  const [showLabel, setShowLabel] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const colorByCategory = useRef({});

  // Reset colorByCategory when colors changes
  useEffect(() => {
    colorByCategory.current = {};
    // Spread colors array to avoid reference problems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...colors]);

  const dataWithColor = useMemo(() => {
    return data.map(processDataItem(colorByCategory, colors, theme));
  }, [data, colors, theme]);

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
      show: showTooltip,
      showDelay: 1000,
      transitionDuration: 0,
      backgroundColor: theme.palette.other.tooltip,
      textStyle: { color: theme.palette.common.white },
      confine: true,
      formatter:
        !!tooltipFormatter && ((params) => tooltipFormatter({ ...params, formatter }))
    }),
    [
      showTooltip,
      formatter,
      theme.palette.common.white,
      theme.palette.other.tooltip,
      tooltipFormatter
    ]
  );

  // Legend
  const legendOptions = useMemo(
    () => ({
      selectedMode: false,
      type: 'scroll',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      itemGap: theme.spacing(3),
      icon: 'circle',
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      // TODO: as prop?
      formatter: (name) => name.toUpperCase(),
      textStyle: {
        ...theme.typography.overlineDelicate,
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
        fontFamily: theme.typography.overlineDelicate.fontFamily,
        fontSize: theme.spacing(1.5),
        lineHeight: theme.spacing(1.75),
        fontWeight: 'normal',
        color: theme.palette.text.primary
      }
    }),
    [theme]
  );

  // Series
  const labelOptions = useMemo(
    () => ({
      formatter: '{per|{d}%}\n{b|{b}}',
      position: 'center',
      rich: {
        b: {
          fontFamily: theme.typography.overlineDelicate.fontFamily,
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
    }),
    [theme]
  );

  const seriesOptions = useMemo(
    () => [
      {
        type: 'pie',
        name,
        animation,
        data: dataWithColor.map((item) => {
          // Avoid modifying data item
          const clonedItem = { ...item };

          const disabled =
            selectedCategories?.length && !selectedCategories.includes(clonedItem.name);

          if (labels?.[clonedItem.name]) {
            clonedItem.name = labels[clonedItem.name];
          }

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
        label: { show: showLabel, ...labelOptions },
        emphasis: {
          label: { ...labelOptions, position: undefined }
        }
      }
    ],
    [
      name,
      animation,
      dataWithColor,
      labels,
      selectedCategories,
      theme,
      showLabel,
      labelOptions
    ]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: theme.spacing(0),
        top: theme.spacing(0),
        right: theme.spacing(0),
        bottom: theme.spacing(0)
      },
      tooltip: tooltipOptions,
      legend: legendOptions,
      series: seriesOptions
    }),
    [theme, tooltipOptions, seriesOptions, legendOptions]
  );

  const clickEvent = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const { name } = data[params.dataIndex];

        const selectedCategoryIdx = newSelectedCategories.indexOf(name);
        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(name);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [data, onSelectedCategoriesChange, selectedCategories]
  );

  const onEvents = {
    ...(filterable && { click: clickEvent }),
    mouseover: () => {
      setShowLabel(false);
      setShowTooltip(true);
    },
    mouseout: () => {
      setShowLabel(true);
      setShowTooltip(false);
    }
  };

  return (
    <ReactEcharts
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
  tooltipFormatter,
  colors: [],
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

// Aux
function tooltipFormatter(params) {
  const value = processFormatterRes(params.formatter(params.value));

  const markerColor = params.data.color || params.textStyle.color;
  const markerStyle = `display:inline-block;margin-right:4px;border-radius:4px;width:8px;height:8px;background-color:${markerColor}`;

  return `
    <p style="font-size:12px;font-weight:600;line-height:1.33;margin:4px 0 4px 0;">${params.name}</p>
    <p style="font-size: 12px;font-weight:normal;line-height:1.33;margin:0 0 4px 0;"><span style="${markerStyle}"></span> ${value} (${params.percent}%)</p>
  `.trim();
}

function processDataItem(colorByCategory, colors, theme) {
  return (item) => {
    const { name } = item;
    const colorUsed = colorByCategory.current[name];
    if (colorUsed) {
      item.color = colorUsed;
    } else {
      const paletteToUse = colors.length ? colors : theme.palette.qualitative.bold;
      const colorToUse =
        paletteToUse[Object.keys(colorByCategory.current).length] || '#fff';
      colorByCategory.current[name] = colorToUse;
      item.color = colorToUse;
    }
    return item;
  };
}
