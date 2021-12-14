import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import useGeoJsonFeatures from './geojson/useGeoJsonFeatures';
import useTilesetFeatures from './tileset/useTilesetFeatures';
import { dequal as deepEqual } from 'dequal';
import useFiltersGeoJson from './geojson/useFiltersGeoJson';
import { useCallback } from 'react';
import useRenderSubLayers from './tileset/useRenderSubLayers';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250,
  renderSubLayers: _renderSubLayers // TODO: Provide a default renderSubLayers
}) {
  const viewport = useSelector((state) => state.carto.viewport);

  // For GeoJson layers
  const getFilterValue = useFiltersGeoJson({ source });

  const [onDataLoad] = useGeoJsonFeatures({
    source,
    viewport,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  // For tiles layers
  const [renderSubLayers, spatialFilterBuffers] = useRenderSubLayers({
    source,
    renderSubLayers: _renderSubLayers
  });

  const [onViewportLoad, fetch] = useTilesetFeatures({
    source,
    viewport,
    spatialFilterBuffers,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  let props = {};

  const useMVT =
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET;

  const useGeoJSON = source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE;

  if (useMVT) {
    props = {
      binary: true,
      renderSubLayers,
      ...(viewportFeatures && {
        onViewportLoad,
        fetch
      })
    };
  } else if (useGeoJSON) {
    props = {
      getFilterValue,
      updateTriggers: { getFilterValue },
      ...(viewportFeatures && { onDataLoad })
    };
  }

  const dataComparator = useCallback((a, b) => {
    if (a.byteLength && b.byteLength) {
      return deepEqual(a, b);
    }
    return a === b;
  }, []);

  return {
    ...props,
    dataComparator,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    // Filtering
    filterRange: [1, 1],
    extensions: [new DataFilterExtension({ filterSize: 1 })]
  };
}
