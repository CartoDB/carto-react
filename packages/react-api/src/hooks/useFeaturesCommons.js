import { useDispatch } from 'react-redux';
import { setViewportFeaturesReady } from '@carto/react-redux';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function useFeaturesCommons({ source }) {
  const dispatch = useDispatch();

  const [isDataLoaded, setDataLoaded] = useState(false);
  const debounceIdRef = useRef(null);

  useEffect(() => {
    if (!source) {
      setDataLoaded(false);
    }
  }, [source]);

  const clearDebounce = () => {
    if (debounceIdRef.current) {
      clearTimeout(debounceIdRef.current);
    }
    debounceIdRef.current = null;
  };

  const stopAnyCompute = useCallback(() => {
    clearDebounce();
    setDataLoaded(false);
  }, [setDataLoaded]);

  const sourceId = source?.id;

  const setSourceViewportFeaturesReady = useCallback(
    (ready) => {
      if (sourceId) {
        dispatch(setViewportFeaturesReady({ sourceId, ready }));
      }
    },
    [dispatch, sourceId]
  );

  return [
    isDataLoaded,
    setDataLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceViewportFeaturesReady
  ];
}
