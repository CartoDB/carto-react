import { selectSourceById } from '@carto/react-redux/';
import { useSelector } from 'react-redux';
import useCustomCompareMemo from './useCustomCompareMemo';
import { dequal as deepEqual } from 'dequal';

/**
 * Obtain widget's filter values.
 *
 * @param  {object} props
 * @param  {string} props.dataSource - ID of the source to get the filters from.
 * @param  {string} props.id - ID of the widget that applied the filter.
 * @param  {string} props.column - name of column of this widget.
 * @param  {string} props.type - type of filter
 */
export function useWidgetFilterValues({ dataSource, id, column, type }) {
  const columnFilters = useSelector((state) => {
    const dataSourceState = selectSourceById(state, dataSource);

    const filter = dataSourceState?.filters?.[column]?.[type];
    if (!filter || filter.owner !== id) {
      return null;
    }
    return filter.values;
  });

  return useCustomCompareMemo(columnFilters, deepEqual);
}
