import { DataFilterExtension } from '@deck.gl/extensions';
import { debounce } from '@carto/react-core';
import useViewportFeatures from './viewportFeatures/useViewportFeatures';
import { buildFeatureFilter } from './Filter';

export default function useCartoLayerFilterProps(
  source,
  uniqueIdProperty = 'cartodb_id'
) {
  const [onViewportLoad] = useViewportFeatures(source, uniqueIdProperty);

  return {
    onViewportLoad: debounce(onViewportLoad),
    getFilterValue: buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    filterRange: [1, 1],
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    updateTriggers: {
      getFilterValue: source?.filters
    }
  };
}
