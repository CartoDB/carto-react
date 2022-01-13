import { useEffect, useCallback } from 'react';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { throwError } from './utils';
import useFeaturesCommons from './useFeaturesCommons';

export default function useGeoJsonFeatures({
  source,
  viewport,
  uniqueIdProperty,
  debounceTimeout = 250
}) {
  const [
    debounceIdRef,
    isGeoJsonLoaded,
    setGeoJsonLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceViewportFeaturesReady
  ] = useFeaturesCommons({ source });

  const sourceId = source?.id;

  const computeFeaturesGeoJson = useCallback(
    ({ viewport, uniqueIdProperty }) => {
      executeTask(sourceId, Methods.VIEWPORT_FEATURES_GEOJSON, {
        viewport,
        uniqueIdProperty
      })
        .then(() => {
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
      clearDebounce();
      setSourceViewportFeaturesReady(false);
      debounceIdRef.current = debouncedComputeFeaturesGeoJson({
        viewport,
        uniqueIdProperty
      });
    }
  }, [
    viewport,
    uniqueIdProperty,
    sourceId,
    isGeoJsonLoaded,
    debouncedComputeFeaturesGeoJson,
    setSourceViewportFeaturesReady,
    clearDebounce,
    debounceIdRef
  ]);

  const onDataLoad = useCallback(
    (geojson) => {
      stopAnyCompute();
      setSourceViewportFeaturesReady(false);
      executeTask(sourceId, Methods.LOAD_GEOJSON_FEATURES, { geojson })
        .then(() => setGeoJsonLoaded(true))
        .catch(throwError);
    },
    [sourceId, setSourceViewportFeaturesReady, stopAnyCompute, setGeoJsonLoaded]
  );

  return [onDataLoad];
}
