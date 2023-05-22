import { lighten } from '@mui/material/styles';
import CategoryWidgetUI from '../../CategoryWidgetUI/CategoryWidgetUI';
import PropTypes from 'prop-types';

const ORDER_TYPES = CategoryWidgetUI.ORDER_TYPES;

/** transpose incoming data to group items by column, apply colors and labels
 * @param {{ name: string; value: number }[][]} data
 * @param {string[]} colors
 * @param {string[]} labels
 * @param {string[]} selectedCategories
 * @param {CategoryWidgetUI.ORDER_TYPES} order
 *
 * @returns {{ label: string; key: string; data: { color: string; value: number }[] }[]}
 */
export function transposeCategoryData(data, colors, labels, selectedCategories, order) {
  const reference = data[0] || [];
  const transposed = reference.map((item, itemIndex) => {
    const isDisabled =
      selectedCategories.length > 0 && selectedCategories.indexOf(item.name) === -1;

    const label = labels[itemIndex] || item.name;
    const indexData = data.map((group, groupIndex) => ({
      color: isDisabled ? lighten(colors[groupIndex], 0.8) : colors[groupIndex],
      value: group[itemIndex] ? group[itemIndex].value : 0
    }));

    return {
      label,
      key: item.name,
      data: indexData
    };
  });

  // only sort the list if order type is 'RANKING'
  // if order type is 'FIXED' keep the sort order from data
  if (order === ORDER_TYPES.RANKING) {
    transposed.sort((a, b) => {
      const aMax = Math.max(...a.data.map((d) => d.value));
      const bMax = Math.max(...b.data.map((d) => d.value));
      return bMax - aMax;
    });
  }

  return transposed;
}

export const transposedCategoryItemPropTypes = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
}).isRequired;
