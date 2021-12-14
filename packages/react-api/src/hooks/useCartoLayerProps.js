import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import useGeoJsonFeatures from './useGeoJsonFeatures';
import useTilesetFeatures from './useTilesetFeatures';
import useSpatialFilterTileset from './useSpatialFilterTileset';
import { dequal as deepEqual } from 'dequal';
import useSpatialFilterGeoJson from './useSpatialFilterGeoJson';
import { useCallback } from 'react';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 500,
  renderSubLayers // TODO: Provide a default renderSubLayers
}) {
  const viewport = useSelector((state) => state.carto.viewport);

  const [getFilterValue] = useSpatialFilterGeoJson(source);

  const [onDataLoad] = useGeoJsonFeatures({
    source,
    viewport,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  const [_renderSubLayers, spatialFilterBuffers] = useSpatialFilterTileset(source, {
    renderSubLayers,
    uniqueIdProperty
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
      renderSubLayers: _renderSubLayers,
      ...(viewportFeatures && {
        onViewportLoad,
        fetch
      })
    };
  } else if (useGeoJSON) {
    props = {
      getFilterValue,
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
