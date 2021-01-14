import { DataFilterExtension } from '@deck.gl/extensions';
import useViewportFeatures from './useViewportFeatures';
import { applyFilter } from './Filter';
import { debounce } from '../utils/debounce';

export default function useCartoLayerFilterProps(source) {
    const [calculateViewportFeatures] = useViewportFeatures(source);

    return {
        onViewportChange: debounce(calculateViewportFeatures, 500),
        getFilterValue: applyFilter({ filters: source?.filters, type: 'number' }),
        filterRange: [1, 1],
        extensions: [new DataFilterExtension({ filterSize: 1 })],
        updateTriggers: {
            getFilterValue: source?.filters
        },
    };
}