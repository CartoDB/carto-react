import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { OTHERS_CATEGORY_NAME, ORDER_TYPES } from '../../utils/chartConstants';
import { sortDataDescending } from '../../utils/chartUtils';

function usePieCategories(data, order, maxItems, colors) {
  const theme = useTheme();

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
    return groupedData.map(processDataItem(colors, theme));
  }, [groupedData, colors, theme]);

  return dataWithColor;
}

export default usePieCategories;

function processDataItem(colors, theme) {
  const fallbackColor = theme.palette.common.white;

  return (item, index) => {
    const paletteToUse = colors.length ? colors : theme.palette.qualitative.bold;

    let colorToUse;
    if (Array.isArray(paletteToUse)) {
      colorToUse = paletteToUse[index % paletteToUse.length] || fallbackColor;
    } else {
      colorToUse = paletteToUse[index.toString()] || fallbackColor;
    }
    item.color = colorToUse || fallbackColor;

    return item;
  };
}
