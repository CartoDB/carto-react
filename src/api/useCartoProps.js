import { DataFilterExtension } from '@deck.gl/extensions';
import useViewport from './useViewport';
import { filterApplicator } from './FilterApplicator';
import { debounce } from '../utils/debounce';

export default function useCartoProps(source) {
    const [onViewportChange] = useViewport(source?.id);

    return {
        onViewportChange: debounce(onViewportChange, 500),
        getFilterValue: (row) => source?.filters ? Number(filterApplicator(row, source.filters)) : 1,
        filterRange: [1, 1],
        extensions: [new DataFilterExtension({ filterSize: 1 })],
        updateTriggers: {
            getFilterValue: source?.filters
        },
    };
}