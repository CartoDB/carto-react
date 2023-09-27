import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from '../../custom-components/echarts-for-react';
import { Grid, Link, styled, useTheme } from '@mui/material';
import {
  findLargestCategory,
  disableSerie,
  findElementByName,
  setColor,
  sortDataDescending
} from '../utils/chartUtils';
import { processFormatterRes } from '../utils/formatterUtils';
import PieSkeleton from './components/PieSkeleton';
import ChartLegend from '../ChartLegend';
import Typography from '../../components/atoms/Typography';

export const OptionsBar = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5)
}));

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
  onSelectedCategoriesChange,
  isLoading,
  maxItems,
  order
}) {
  const theme = useTheme();
  const colorByCategory = useRef({});
  const othersCategory = 'Others';

  // Sort data by size if order is ranking, otherwise keep the original order
  const orderedData = useMemo(() => {
    let orderedCategories = [];

    if (order === PieWidgetUI.ORDER_TYPES.RANKING) {
      orderedCategories = sortDataDescending(data);
    } else {
      orderedCategories = [...data];
    }

    return orderedCategories;
  }, [data, order]);

  // Limit the number of categories to display, then group the rest into an "Others" category
  const groupedData = useMemo(() => {
    let categories = [];
    let othersValue = 0;

    for (const category of orderedData) {
      if (categories.length < maxItems) {
        categories.push({ ...category });
      } else {
        othersValue += category.value;
      }
    }

    if (othersValue > 0) {
      categories.push({
        name: othersCategory,
        value: othersValue,
        emphasis: { scale: false }
      });
    }

    return categories;
  }, [maxItems, orderedData]);

  // Add a color to each category
  const dataWithColor = useMemo(() => {
    return groupedData.map(processDataItem(colorByCategory, colors, theme));
  }, [groupedData, colors, theme]);

  // Reset colorByCategory when colors and categories change
  useEffect(() => {
    colorByCategory.current = {};
    // Spread colors array to avoid reference problems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...colors, dataWithColor]);

  // Tooltip
  const tooltipOptions = useMemo(
    () => ({
      backgroundColor: theme.palette.black[90],
      borderColor: 'transparent',
      textStyle: { color: theme.palette.common.white },
      confine: true,
      formatter:
        !!tooltipFormatter && ((params) => tooltipFormatter({ ...params, formatter }))
    }),
    [formatter, theme.palette.common.white, theme.palette.black, tooltipFormatter]
  );

  // WIP Central Text
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    console.log('dataWithColor', dataWithColor); // ok
    if (!dataWithColor || dataWithColor.length === 0) {
      return;
    }

    let array;
    if (selectedCategories.length > 0) {
      array = dataWithColor.filter((dataItem) =>
        selectedCategories.includes(dataItem.name)
      );
    } else {
      array = dataWithColor;
    }
    console.log('array in', array); // ok also in the updated array

    const largestCategory = findLargestCategory(array);
    console.log('largestCategory', largestCategory); // ok, but not in the updated array

    const category = findElementByName(array, largestCategory);
    setSelectedItem(category);

    console.log('category', selectedItem); // undefined in the first render, ok in the updated array
  }, [dataWithColor, selectedCategories, selectedItem]);
  console.log('selectedItem Out', selectedItem); // undefined in the first render, ok in the updated array

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
        bottom: theme.spacingValue * 1.5,
        label: { show: false },
        emphasis: {
          focus: 'series',
          scaleSize: 5
        },
        itemStyle: {
          borderColor: theme.palette.background.paper,
          borderWidth: 1
        }
      }
    ],
    [name, animation, dataWithColor, labels, selectedCategories, theme]
  );

  const options = useMemo(
    () => ({
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: tooltipOptions,
      legend: {
        show: false
      },
      series: seriesOptions
    }),
    [tooltipOptions, seriesOptions]
  );

  const handleChartClick = useCallback(
    (params) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const { name } = dataWithColor[params.dataIndex];

        // Avoid clicking if the category name is "Others"
        if (name === othersCategory) {
          return;
        }

        const selectedCategoryIdx = newSelectedCategories.indexOf(name);

        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(name);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [dataWithColor, onSelectedCategoriesChange, selectedCategories]
  );

  const handleLegendClick = useCallback(
    (category) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];
        const selectedCategoryIdx = newSelectedCategories.indexOf(category);

        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(category);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [onSelectedCategoriesChange, selectedCategories]
  );

  const onEvents = {
    ...(filterable && { click: handleChartClick })
  };

  const handleClearSelectedCategories = () => {
    onSelectedCategoriesChange([]);
  };

  if (isLoading) return <PieSkeleton height={height} />;

  return (
    <>
      <OptionsBar container>
        <Typography variant='caption' color='textSecondary'>
          {selectedCategories.length ? selectedCategories.length : 'All'} selected
        </Typography>
        {selectedCategories.length > 0 && (
          <Link variant='caption' onClick={handleClearSelectedCategories}>
            Clear
          </Link>
        )}
      </OptionsBar>

      <CentralText selectedItem={selectedItem} />

      <ReactEcharts
        option={options}
        onEvents={onEvents}
        lazyUpdate={true}
        style={{ maxHeight: height }}
      />

      {dataWithColor.length > 0 && (
        <ChartLegend
          series={dataWithColor}
          selectedCategories={selectedCategories}
          onCategoryClick={onSelectedCategoriesChange && handleLegendClick}
        />
      )}
    </>
  );
}

/**
 * Enum for PieWidgetUI order types. 'RANKING' orders the data by value and 'FIXED' keeps the order present in the original data
 * @enum {string}
 */
PieWidgetUI.ORDER_TYPES = {
  RANKING: 'ranking',
  FIXED: 'fixed'
};

PieWidgetUI.defaultProps = {
  name: null,
  formatter: (v) => v,
  tooltipFormatter,
  colors: [],
  labels: {},
  height: '260px',
  animation: true,
  filterable: true,
  selectedCategories: [],
  maxItems: 11,
  order: PieWidgetUI.ORDER_TYPES.RANKING
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
  onSelectedCategoriesChange: PropTypes.func,
  isLoading: PropTypes.bool,
  maxItems: PropTypes.number,
  order: PropTypes.oneOf(Object.values(PieWidgetUI.ORDER_TYPES))
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

// TODO: Move this component to a separate file as JSX
function CentralText({ selectedItem }) {
  if (!selectedItem) {
    return null;
  }

  const { name, value, color } = selectedItem;

  const markerStyle = {
    display: 'inline-block',
    marginRight: '4px',
    borderRadius: '4px',
    width: '8px',
    height: '8px',
    backgroundColor: color
  };

  return (
    <div>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '1.33',
          margin: '4px 0 4px 0'
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 'normal',
          lineHeight: '1.33',
          margin: '0 0 4px 0'
        }}
      >
        <span style={markerStyle}></span> {value} ({value}%)
      </p>
    </div>
  );
}
