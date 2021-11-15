import { selectSourceById } from '@carto/react-redux/';
import { useSelector } from 'react-redux';
import useCustomCompareMemo from './useCustomCompareMemo';
import { dequal as deepEqual } from 'dequal';

/**
 * Obtain current widgets's filter values.
 *
 * @param  {object} props
 * @param  {string} props.dataSource - ID of the source to get the filters from.
 * @param  {string} props.id - ID of the widget that apply the filter you want to exclude.
 * @param  {string} props.column - name of column of this widget.
 * @param  {string} props.type - type of filter
 */
export function useWidgetFilterValues({ dataSource, id, column, type }) {
  const columnFilters = useSelector((state) => {
    // TODO: id ?
    const dataSourceState = selectSourceById(state, dataSource);
    const filterTypes = dataSourceState?.filters ? dataSourceState?.filters[column] : {};

    console.log('useWidgetOwnFilters', dataSource, id, filterTypes);
    return filterTypes ? filterTypes[type]?.values : null;
  });

  return useCustomCompareMemo(columnFilters, deepEqual);
}
