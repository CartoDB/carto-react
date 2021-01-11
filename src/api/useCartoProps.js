import { DataFilterExtension } from '@deck.gl/extensions';
import useViewport from './useViewport';
import { applyFilter } from './Filter';
import { debounce } from '../utils/debounce';

export default function useCartoProps(source) {
    const [onViewportChange] = useViewport(source);

    return {
        onViewportChange: debounce(onViewportChange, 500),
        getFilterValue: applyFilter({ filters: source?.filters, returnedType: 'number' }),
        filterRange: [1, 1],
        extensions: [new DataFilterExtension({ filterSize: 1 })],
        updateTriggers: {
            getFilterValue: source?.filters
        },
    };
}