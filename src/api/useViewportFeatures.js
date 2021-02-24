import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllWidgetsLoadingState, setViewportFeaturesReady } from '../redux/cartoSlice';
import { debounce } from '../utils/debounce';
import { Methods } from '../workers';
import { executeTask } from '../workers';

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
    debounce(async ({ tiles, viewport, uniqueIdProperty, sourceId }) => {
      const tilesCleaned = tiles.map(({ data, isVisible, bbox }) => ({
        data,
        isVisible,
        bbox
      }));

      await executeTask(sourceId, Methods.VIEWPORT_FEATURES, {
        tiles: tilesCleaned,
        viewport,
        uniqueIdProperty
      });

      dispatch(
        setViewportFeaturesReady({
          sourceId,
          ready: true
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
