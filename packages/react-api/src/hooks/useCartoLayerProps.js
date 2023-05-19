import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSpatialFilter, selectViewport } from '@carto/react-redux';
import useGeojsonFeatures from './useGeojsonFeatures';
import useTileFeatures from './useTileFeatures';
import { getDataFilterExtensionProps } from './dataFilterExtensionUtil';
import { getMaskExtensionProps } from './maskExtensionUtil';
import FeaturesDroppedLoader from './FeaturesDroppedLoader';
import { CLIENT_ID } from '../api/common';

const LOADERS = [FeaturesDroppedLoader];

export default function useCartoLayerProps({
  source,
  layerConfig,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 250
}) {
  const viewport = useSelector(selectViewport);
  const spatialFilter = useSelector((state) => selectSpatialFilter(state, source?.id));

  const [onDataLoadForGeojson] = useGeojsonFeatures({
    source,
    viewport,
    spatialFilter,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  const [onDataLoadForTile, onViewportLoad, fetch] = useTileFeatures({
    source,
    viewport,
    spatialFilter,
    uniqueIdProperty,
    debounceTimeout: viewporFeaturesDebounceTimeout
  });

  const onDataLoad = useCallback(
    (data) => {
      if (data?.tilejson) {
        return onDataLoadForTile(data);
      }

      return onDataLoadForGeojson(data);
    },
    [onDataLoadForGeojson, onDataLoadForTile]
  );

  // Due to dynamic tiling integration, we cannot know if we're going to load a geojson or a tileset
  // until onDataLoad be executed so we return binary, onViewportLoad and fetch that will be ignored
  // for NOT Tileset layer
  const props = {
    binary: true,
    ...(viewportFeatures && {
      onViewportLoad,
      fetch,
      loaders: LOADERS,
      onDataLoad
    })
  };

  const dataFilterExtensionProps = getDataFilterExtensionProps(
    source?.filters,
    source?.filtersLogicalOperator
  );
  const maskExtensionProps = getMaskExtensionProps(spatialFilter?.geometry?.coordinates);
  const extensions = [
    ...dataFilterExtensionProps.extensions,
    ...maskExtensionProps.extensions
  ];

  return {
    ...props,
    id: layerConfig?.id,
    visible: layerConfig?.visible !== undefined ? layerConfig.visible : true,
    opacity: layerConfig?.opacity ?? 1,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    clientId: CLIENT_ID,
    queryParameters: source?.queryParameters,
    ...dataFilterExtensionProps,
    ...maskExtensionProps,
    extensions
  };
}
