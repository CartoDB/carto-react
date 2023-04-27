import { useEffect, useCallback } from 'react';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { throwError } from './utils';
import useFeaturesCommons from './useFeaturesCommons';

export default function useGeojsonFeatures({
  source,
  geometryToIntersect,
  uniqueIdProperty,
  debounceTimeout = 250
}) {
  const [
    debounceIdRef,
    isGeoJsonLoaded,
    setGeoJsonLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceFeaturesReady
  ] = useFeaturesCommons({ source });

  const sourceId = source?.id;

  const computeFeatures = useCallback(
    ({ geometryToIntersect, uniqueIdProperty }) => {
      executeTask(sourceId, Methods.GEOJSON_FEATURES, {
        geometryToIntersect,
        uniqueIdProperty
      })
        .then(() => {
          setSourceFeaturesReady(true);
        })
        .catch(throwError);
    },
    [setSourceFeaturesReady, sourceId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedComputeFeatures = useCallback(
    debounce(computeFeatures, debounceTimeout),
    [computeFeatures]
  );

  useEffect(() => {
    if (sourceId && isGeoJsonLoaded) {
      clearDebounce();
      setSourceFeaturesReady(false);
      debounceIdRef.current = debouncedComputeFeatures({
        geometryToIntersect,
        uniqueIdProperty
      });
    }
  }, [
    geometryToIntersect,
    uniqueIdProperty,
    sourceId,
    isGeoJsonLoaded,
    debouncedComputeFeatures,
    setSourceFeaturesReady,
    clearDebounce,
    debounceIdRef
  ]);

  const onDataLoad = useCallback(
    (geojson) => {
      stopAnyCompute();
      setSourceFeaturesReady(false);
      executeTask(sourceId, Methods.LOAD_GEOJSON_FEATURES, { geojson })
        .then(() => setGeoJsonLoaded(true))
        .catch(throwError);
    },
    [sourceId, setSourceFeaturesReady, stopAnyCompute, setGeoJsonLoaded]
  );

  return [onDataLoad];
}
