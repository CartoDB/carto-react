import { useEffect, useCallback } from 'react';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { Layer } from '@deck.gl/core';
import { throwError } from './utils';
import useFeaturesCommons from './useFeaturesCommons';

export default function useTilesetFeatures({
  source,
  viewport,
  uniqueIdProperty,
  debounceTimeout = 250,
  spatialFilterBuffers
}) {
  const [
    debounceIdRef,
    isTilesetLoaded,
    setTilesetLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceViewportFeaturesReady
  ] = useFeaturesCommons({ source });

  const sourceId = source?.id;

  const computeViewportFeatures = useCallback(
    ({ viewport, uniqueIdProperty, spatialFilterBuffers }) => {
      setSourceViewportFeaturesReady(false);

      executeTask(sourceId, Methods.VIEWPORT_FEATURES, {
        viewport,
        uniqueIdProperty,
        spatialFilterBuffers
      })
        .then(() => {
          setSourceViewportFeaturesReady(true);
        })
        .catch(throwError)
        .finally(clearDebounce);
    },
    [setSourceViewportFeaturesReady, sourceId, clearDebounce]
  );

  const loadTiles = useCallback(
    (tiles) => {
      const cleanedTiles = tiles.reduce((acc, { data, isVisible, bbox, x, y, z }) => {
        if (isVisible && data) {
          acc.push({
            x,
            y,
            z,
            data,
            bbox
          });
        }
        return acc;
      }, []);

      executeTask(sourceId, Methods.LOAD_TILES, { tiles: cleanedTiles })
        .then(() => setTilesetLoaded(true))
        .catch(throwError);
    },
    [sourceId, setTilesetLoaded]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedComputeViewportFeatures = useCallback(
    debounce(computeViewportFeatures, debounceTimeout),
    [computeViewportFeatures]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadTiles = useCallback(debounce(loadTiles, debounceTimeout), [
    loadTiles
  ]);

  useEffect(() => {
    if (sourceId && isTilesetLoaded) {
      clearDebounce();
      setSourceViewportFeaturesReady(false);
      debounceIdRef.current = debouncedComputeViewportFeatures({
        viewport,
        uniqueIdProperty,
        spatialFilterBuffers
      });
    }
  }, [
    viewport,
    uniqueIdProperty,
    debouncedComputeViewportFeatures,
    sourceId,
    isTilesetLoaded,
    setSourceViewportFeaturesReady,
    spatialFilterBuffers,
    clearDebounce,
    debounceIdRef
  ]);

  const onViewportLoad = useCallback(
    (tiles) => {
      stopAnyCompute();
      setSourceViewportFeaturesReady(false);

      debounceIdRef.current = debouncedLoadTiles(tiles);
    },
    [stopAnyCompute, setSourceViewportFeaturesReady, debouncedLoadTiles, debounceIdRef]
  );

  const fetch = useCallback(
    (...args) => {
      stopAnyCompute();
      return Layer.defaultProps.fetch.value(...args);
    },
    [stopAnyCompute]
  );

  return [onViewportLoad, fetch];
}
