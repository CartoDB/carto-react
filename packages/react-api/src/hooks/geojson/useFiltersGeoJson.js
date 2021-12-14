import { _buildFeatureFilter } from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import turfIntersects from '@turf/boolean-intersects';

export default function useFiltersGeoJson({ source }) {
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const filterFn = useMemo(
    () => _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    [source?.filters]
  );

  const spatialFilterFn = useCallback(
    (feature) =>
      spatialFilterGeometry
        ? Number(turfIntersects(feature.geometry, spatialFilterGeometry))
        : 1,
    [spatialFilterGeometry]
  );

  const getFilterValue = useCallback(
    (feature) => filterFn(feature) && spatialFilterFn(feature),
    [filterFn, spatialFilterFn]
  );

  return getFilterValue;
}
