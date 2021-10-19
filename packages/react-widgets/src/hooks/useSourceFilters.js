import { _getApplicableFilters as getApplicableFilters } from '@carto/react-core/';
import { selectSourceById } from '@carto/react-redux/';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCustomCompareMemo from './useCustomCompareMemo';
import { dequal as deepEqual } from 'dequal';

/**
 * Hook to obtain source's filters excluding the one from a certain widget
 * @param  {object} props
 * @param  {string} props.dataSource - ID of the source to get the filters from.
 * @param  {string} props.id - ID of the widget that apply the filter you want to exclude.
 */
export default function useSourceFilters({ dataSource, id }) {
  const { filters } = useSelector((state) => selectSourceById(state, dataSource) || {});

  const applicableFilters = useMemo(() => getApplicableFilters(filters, id), [
    filters,
    id
  ]);

  return useCustomCompareMemo(applicableFilters, deepEqual);
}
