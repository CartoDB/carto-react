import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures, setAllWidgetsLoadingState } from '@carto/react-redux';
import { debounce, viewportFeatures } from '@carto/react-core';

export default function useViewportFeatures(
  source,
  uniqueIdProperty,
  debounceTimeOut = 500
) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [tiles, setTiles] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeatures = useCallback(
    debounce(({ tiles, viewport, uniqueIdProperty, sourceId }) => {
      const features = viewportFeatures({ tiles, viewport, uniqueIdProperty });

      dispatch(
        setViewportFeatures({
          sourceId,
          features: features
        })
      );
    }, debounceTimeOut),
    []
  );

  useEffect(() => {
    if (tiles.length && source) {
      dispatch(setAllWidgetsLoadingState(true));
      computeFeatures({ tiles, viewport, uniqueIdProperty, sourceId: source.id });
    }
  }, [tiles, viewport, uniqueIdProperty, computeFeatures, source, dispatch]);

  const onViewportLoad = useCallback((tiles) => {
    setTiles(tiles);
  }, []);

  return [onViewportLoad];
}
