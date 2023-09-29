import { useMemo, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { OTHERS_CATEGORY_NAME, ORDER_TYPES } from '../../utils/chartConstants';
import { sortDataDescending } from '../../utils/chartUtils';

function usePieCategories(data, order, maxItems, colors) {
  const theme = useTheme();
  const colorByCategory = useRef({});

  // Sort data by size if order is ranking, otherwise keep the original order
  const orderedData = useMemo(() => {
    let orderedCategories = [];

    if (order === ORDER_TYPES.RANKING) {
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
        name: OTHERS_CATEGORY_NAME,
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
  }, [colors, dataWithColor]);

  return dataWithColor;
}

export default usePieCategories;

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
