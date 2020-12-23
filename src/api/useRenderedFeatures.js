import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeatures as setVF } from '../redux/cartoSlice';

export function useRenderedFeatures(sourceId) {
  const dispatch = useDispatch();
  
  const onViewportChange = useCallback(
    (e) => {
      dispatch(setVF({ sourceId, data: e }));
    },
    [dispatch, sourceId, setVF]
  );

  return [onViewportChange];
}
