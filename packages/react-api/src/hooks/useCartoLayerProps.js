import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import useGeoJsonFeatures from './useGeoJsonFeatures';
import useTilesetFeatures from './tileset/useTilesetFeatures';
import { getDataFilterExtensionProps } from './dataFilterExtensionUtil';
import { selectSpatialFilter } from '@carto/react-redux';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250
}) {
  const viewport = useSelector((state) => state.carto.viewport);
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const [onDataLoad] = useGeoJsonFeatures({
    source,
    viewport,
    spatialFilterGeometry,
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

  const useTileset =
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET;

  const useGeoJson = source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE;

  const {
    updateTriggers,
    getFilterValue,
    ...dataFilterExtensionProps
  } = getDataFilterExtensionProps(source?.filters, spatialFilterGeometry);

  if (useTileset) {
    props = {
      binary: true,
      ...(viewportFeatures && {
        onViewportLoad,
        fetch
      })
    };
  } else if (useGeoJson) {
    props = {
      getFilterValue,
      updateTriggers: { getFilterValue },
      ...(viewportFeatures && { onDataLoad })
    };
  }

  return {
    ...props,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    ...dataFilterExtensionProps
  };
}
