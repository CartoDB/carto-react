import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { useSelector } from 'react-redux';
import { selectSpatialFilter } from '@carto/react-redux';
import useGeoJsonFeatures from './useGeoJsonFeatures';
import useTilesetFeatures from './useTilesetFeatures';
import { getDataFilterExtensionProps } from './dataFilterExtensionUtil';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250
}) {
  const viewport = useSelector((state) => state.carto.viewport);
  const spatialFilter = useSelector((state) => selectSpatialFilter(state, source?.id));

  const [onDataLoad] = useGeoJsonFeatures({
    source,
    viewport,
    spatialFilter,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  const [onViewportLoad, fetch] = useTilesetFeatures({
    source,
    viewport,
    spatialFilter,
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

  const dataFilterExtensionProps = getDataFilterExtensionProps(source?.filters);

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
