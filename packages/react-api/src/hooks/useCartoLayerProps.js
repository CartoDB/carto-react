import { DataFilterExtension } from '@deck.gl/extensions';
import { _buildFeatureFilter } from '@carto/react-core';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import useGeoJsonFeatures from './useGeoJsonFeatures';
import useTilesetFeatures from './useTilesetFeatures';
import { getGpuFilter, MAX_GPU_FILTERS } from './gpu-filter-utils';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250
}) {
  const viewport = useSelector((state) => state.carto.viewport);

  const [onDataLoad] = useGeoJsonFeatures({
    source,
    viewport,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  const [onViewportLoad, fetch] = useTilesetFeatures({
    source,
    viewport,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  let props = {};

  if (
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET
  ) {
    props = {
      binary: true,
      ...(viewportFeatures && {
        onViewportLoad,
        fetch
      })
    };
  } else if (source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE) {
    props = viewportFeatures && {
      onDataLoad
    };
  }

  const { filterRange, filterValueUpdateTriggers, getFilterValue } = getGpuFilter(
    source?.filters
  );

  return {
    ...props,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    getFilterValue: getFilterValue,
    filterRange: filterRange,
    extensions: [new DataFilterExtension({ filterSize: MAX_GPU_FILTERS })],
    updateTriggers: {
      getFilterValue: filterValueUpdateTriggers
    }
  };
}
