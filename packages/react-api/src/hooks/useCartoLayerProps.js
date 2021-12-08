import { DataFilterExtension } from '@deck.gl/extensions';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import useSpatialFilter from './useSpatialFilter';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 500,
  renderSubLayers // TODO: Provide a default renderSubLayers
}) {
  const [_renderSubLayers, filtersBuffer, getFilterValue] = useSpatialFilter(source, {
    renderSubLayers
  });

  const [onViewportLoad, onDataLoad, fetch] = useViewportFeatures(
    source,
    uniqueIdProperty,
    viewporFeaturesDebounceTimeout,
    filtersBuffer
  );

  let props = {};

  const useMVT =
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET;

  const useGeoJSON = source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE;

  if (useMVT) {
    props = {
      binary: true,
      onViewportLoad: viewportFeatures ? onViewportLoad : null,
      fetch: viewportFeatures ? fetch : null,
      renderSubLayers: _renderSubLayers,
      updateTriggers: {}
    };
  } else if (useGeoJSON) {
    props = {
      // empty function should be removed by null, but need a fix in CartoLayer
      onDataLoad: viewportFeatures ? onDataLoad : () => null,
      updateTriggers: {
        getFilterValue
      },
      getFilterValue
    };
  }

  return {
    ...props,
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
