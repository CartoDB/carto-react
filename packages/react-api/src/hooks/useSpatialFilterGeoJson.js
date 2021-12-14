import { _buildFeatureFilter } from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import turfIntersects from '@turf/boolean-intersects';

export default function useSpatialFilterGeoJson(source) {
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const filterFn = useMemo(() => {
    return _buildFeatureFilter({ filters: source?.filters });
  }, [source?.filters]);

  const getFilterValue = useCallback(
    (feature) => {
      return Number(
        filterFn(feature) &&
          (!spatialFilterGeometry ||
            turfIntersects(feature.geometry, spatialFilterGeometry))
      );
    },
    [filterFn, spatialFilterGeometry]
  );

  return [getFilterValue];
}
