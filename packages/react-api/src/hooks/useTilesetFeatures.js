import { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeaturesReady } from '@carto/react-redux';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { Layer } from '@deck.gl/core';
import { throwError } from './utils';

export default function useTilesetFeatures(
  source,
  { viewport, uniqueIdProperty, debounceTimeout = 500 }
) {
  const dispatch = useDispatch();
  const [isTilesetLoaded, setTilesetLoaded] = useState(false);
  const debounceIdRef = useRef(null);

  const clearDebounce = () => {
    if (debounceIdRef.current) {
      clearTimeout(debounceIdRef.current);
    }
    debounceIdRef.current = null;
  };

  const stopAnyCompute = useCallback(() => {
    clearDebounce();
    setTilesetLoaded(false);
  }, [setTilesetLoaded]);

  const sourceId = source?.id;

  const setSourceViewportFeaturesReady = useCallback(
    (ready) => {
      if (sourceId) {
        dispatch(setViewportFeaturesReady({ sourceId, ready }));
      }
    },
    [dispatch, sourceId]
  );

  const computeViewportFeatures = useCallback(
    ({ viewport, uniqueIdProperty }) => {
      setSourceViewportFeaturesReady(false);

      executeTask(sourceId, Methods.VIEWPORT_FEATURES, {
        viewport: Float32Array.of(...viewport),
        uniqueIdProperty
      })
        .then(() => {
          setSourceViewportFeaturesReady(true);
        })
        .catch(throwError)
        .finally(clearDebounce);
    },
    [setSourceViewportFeaturesReady, sourceId]
  );

  const loadTiles = useCallback(
    (tiles) => {
      const cleanedTiles = tiles.reduce((acc, { data, isVisible, bbox }) => {
        if (isVisible && data) {
          acc.push({
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
    [sourceId]
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
        uniqueIdProperty
      });
    }
  }, [
    viewport,
    uniqueIdProperty,
    debouncedComputeViewportFeatures,
    sourceId,
    isTilesetLoaded,
    setSourceViewportFeaturesReady
  ]);

  useEffect(() => {
    if (!source) {
      setTilesetLoaded(false);
    }
  }, [source]);

  const onViewportLoad = useCallback(
    (tiles) => {
      stopAnyCompute();
      setSourceViewportFeaturesReady(false);

      debounceIdRef.current = debouncedLoadTiles(tiles);
    },
    [stopAnyCompute, setSourceViewportFeaturesReady, debouncedLoadTiles]
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
