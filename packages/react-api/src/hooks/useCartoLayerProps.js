import { useDispatch } from 'react-redux';
import { DataFilterExtension } from '@deck.gl/extensions';
import { debounce, _buildFeatureFilter } from '@carto/react-core';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES } from '@deck.gl/carto';

export default function useCartoLayerProps(source, uniqueIdProperty) {
  const [onViewportLoad, onDataLoad] = useViewportFeatures(source, uniqueIdProperty);

  const props =
    source && source.type === MAP_TYPES.TILESET
      ? {
          binary: true,
          onViewportLoad
        }
      : {
          onDataLoad
        };

  return {
    ...props,
    uniqueIdProperty: uniqueIdProperty,
    data: source && source.data,
    type: source && source.type,
    provider: source && source.provider,
    connection: source && source.connection,
    getFilterValue: _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    filterRange: [1, 1],
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    updateTriggers: {
      getFilterValue: source?.filters
    }
  };
}
