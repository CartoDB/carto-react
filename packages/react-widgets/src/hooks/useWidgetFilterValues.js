import { selectSourceById } from '@carto/react-redux/';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

/**
 * Obtain widget's filter values.
 *
 * @param  {object} props
 * @param  {string} props.dataSource - ID of the source to get the filters from.
 * @param  {string} props.id - ID of the widget that applied the filter.
 * @param  {string=} props.column - name of column of this widget.
 * @param  {string} props.type - type of filter
 */
export function useWidgetFilterValues({ dataSource, id, column, type }) {
  const { filters } = useSelector((state) => selectSourceById(state, dataSource) || {});

  return useMemo(() => {
    if (!column) return null
    const filter = filters?.[column]?.[type];
    if (!filter || filter.owner !== id) {
      return null;
    }
    return filter.values;
  }, [filters, column, type, id]);
}
