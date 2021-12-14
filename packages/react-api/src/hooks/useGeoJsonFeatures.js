import { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeaturesReady } from '@carto/react-redux';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { throwError } from './utils';

export default function useGeoJsonFeatures(
  source,
  { viewport, uniqueIdProperty = 'cartodb_id', debounceTimeout = 200 }
) {
  const dispatch = useDispatch();
  const [isGeoJsonLoaded, setGeoJsonLoaded] = useState(false);
  const debounceIdRef = useRef(null);

  const clearDebounce = () => {
    if (debounceIdRef.current) {
      clearTimeout(debounceIdRef.current);
    }
    debounceIdRef.current = null;
  };

  const sourceId = source?.id;

  const setSourceViewportFeaturesReady = useCallback(
    (ready) => {
      if (sourceId) {
        dispatch(setViewportFeaturesReady({ sourceId, ready }));
      }
    },
    [dispatch, sourceId]
  );

  const computeFeaturesGeoJson = useCallback(
    ({ viewport, uniqueIdProperty }) => {
      let t0 = performance.now();
      executeTask(sourceId, Methods.VIEWPORT_FEATURES_GEOJSON, {
        viewport: Float32Array.of(...viewport),
        uniqueIdProperty
      })
        .then(() => {
          let t1 = performance.now();
          console.log(t1 - t0);
          setSourceViewportFeaturesReady(true);
        })
        .catch(throwError);
    },
    [setSourceViewportFeaturesReady, sourceId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedComputeFeaturesGeoJson = useCallback(
    debounce(computeFeaturesGeoJson, debounceTimeout),
    [computeFeaturesGeoJson]
  );

  useEffect(() => {
    if (sourceId && isGeoJsonLoaded) {
      setSourceViewportFeaturesReady(false);
      clearDebounce();
      debounceIdRef.current = debouncedComputeFeaturesGeoJson({
        viewport,
        uniqueIdProperty
      });
    }
  }, [
    viewport,
    uniqueIdProperty,
    debouncedComputeFeaturesGeoJson,
    sourceId,
    isGeoJsonLoaded,
    setSourceViewportFeaturesReady
  ]);

  useEffect(() => {
    if (!source) {
      setGeoJsonLoaded(false);
    }
  }, [source]);

  const onDataLoad = useCallback(
    (geojson) => {
      clearDebounce();
      setSourceViewportFeaturesReady(false);
      executeTask(sourceId, Methods.LOAD_GEOJSON_FEATURES, { geojson })
        .then(() => setGeoJsonLoaded(true))
        .catch(throwError);
    },
    [sourceId, setSourceViewportFeaturesReady]
  );

  return [onDataLoad];
}
