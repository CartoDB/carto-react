import { _applyFiltersToTileContent } from '@carto/react-core/';
import { useCallback, useRef } from 'react';

export default function useFiltersTileset({ source, tilesCacheRef }) {
  const currentFiltersRef = useRef(source?.filters);
  const hasChanged = currentFiltersRef.current !== source?.filters;

  if (hasChanged) {
    tilesCacheRef.current = {};
    currentFiltersRef.current = source?.filters;
  }

  return useCallback(
    (props) => {
      let { data } = props;

      if (source?.filters) {
        data = _applyFiltersToTileContent(props.data, source?.filters);
      }

      return { ...props, data };
    },
    [source?.filters]
  );
}
