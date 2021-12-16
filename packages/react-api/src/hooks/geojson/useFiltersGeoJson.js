import { _buildFeatureFilter } from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import turfIntersects from '@turf/boolean-intersects';
import { getFiltersByType, MAX_GPU_FILTERS } from '../dataFilterExtensionUtils';

export default function useFiltersGeoJson({ source }) {
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const [filters, timeFilter] = useMemo(
    () => (source?.filters ? getFiltersByType(source?.filters) : []),
    [source?.filters]
  );

  const filterFn = useMemo(() => _buildFeatureFilter({ filters, type: 'number' }), [
    filters
  ]);

  const spatialFilterFn = useCallback(
    (feature) =>
      spatialFilterGeometry
        ? Number(turfIntersects(feature.geometry, spatialFilterGeometry))
        : 1,
    [spatialFilterGeometry]
  );

  const getTimeColumn = useMemo(() => {
    if (timeFilter) {
      return (feature) => {
        const f = feature.properties || feature;
        return f[timeFilter.column];
      };
    }
  }, [timeFilter]);

  const getFilterValue = useMemo(() => {
    const result = Array(MAX_GPU_FILTERS).fill(0);

    // We evaluate all filters except the time filter using _buildFeatureFilter function.
    // For the time filter, we return the value of the feature and we will change the getFilterRange result
    // every time this filter changes
    return (feature) => {
      result[0] = filterFn(feature) && spatialFilterFn(feature);

      if (getTimeColumn) {
        result[1] = getTimeColumn(feature);
      }

      return result;
    };
  }, [filterFn, spatialFilterFn, getTimeColumn]);

  return getFilterValue;
}
