import { DataFilterExtension } from '@deck.gl/extensions';
import { _buildFeatureFilter } from '@carto/react-core';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true
}) {
  const [onViewportLoad, onDataLoad] = useViewportFeatures(source, uniqueIdProperty);

  let props = {};

  if (
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET
  ) {
    props = {
      binary: true,
      onViewportLoad: viewportFeatures ? onViewportLoad : null
    };
  } else if (source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE) {
    props = {
      // empty function should be removed by null, but need a fix in CartoLayer
      onDataLoad: viewportFeatures ? onDataLoad : () => null
    };
  }

  return {
    ...props,
    uniqueIdProperty,
    data: source && source.data,
    type: source && source.type,
    connection: source && source.connection,
    credentials: source && source.credentials,
    getFilterValue: _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    filterRange: [1, 1],
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    updateTriggers: {
      getFilterValue: source?.filters
    }
  };
}
