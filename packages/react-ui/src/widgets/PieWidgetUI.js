import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from '../custom-components/echarts-for-react';
import { useTheme } from '@material-ui/core';
import {
  getChartSerie,
  areChartPropsEqual,
  disableSerie,
  setColor,
  defaultTooltipFormatter
} from './utils/chartUtils';

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

  const tooltipOptions = useMemo(
    () => ({
      trigger: 'item',
      showDelay: 1000,
      transitionDuration: 0,
      backgroundColor: theme.palette.other.tooltip,
      textStyle: {
        color: theme.palette.common.white
      },
      confine: true,
      ...(tooltipFormatter
        ? {
            formatter: (params) =>
              tooltipFormatter([{ ...params, valueFormatter: formatter }])
          }
        : {})
    }),
    [formatter, theme.palette.common.white, theme.palette.other.tooltip, tooltipFormatter]
  );

  const labelOptions = useMemo(
    () => ({
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
    }),
    [theme]
  );

  // Series
  const seriesOptions = useMemo(
    () => [
      {
        type: 'pie',
        animation,
        data: data.map((item) => {
          // Avoid modifying data item
          const clonedItem = {
            ...item,
            name: labels?.[item.name] || item.name,
            key: item.name
          };

          const disabled =
            selectedCategories?.length && !selectedCategories.includes(clonedItem.key);

          if (disabled) {
            disableSerie(clonedItem, theme);
            return clonedItem;
          }

          setColor(clonedItem);

          return clonedItem;
        }),
        radius: ['74%', '90%'],
        bottom: theme.spacing(2.5),
        label: { show: showLabel, ...labelOptions },
        emphasis: {
          label: { ...labelOptions, position: undefined }
        }
      }
    ],
    [animation, data, labels, selectedCategories, theme, showLabel, labelOptions]
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
      series: seriesOptions
    }),
    [theme, tooltipOptions, seriesOptions]
  );

  const onEvents = {
    mouseover: () => setShowLabel(false),
    mouseout: () => setShowLabel(true)
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
  tooltipFormatter: defaultTooltipFormatter,
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
