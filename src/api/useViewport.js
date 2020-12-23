import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeatures } from '../redux/cartoSlice';

export default function useViewport(sourceId) {
  const dispatch = useDispatch();
  
  const onViewportChange = useCallback(
    (e) => {
      dispatch(setViewportFeatures({ sourceId, getRenderedFeatures: e.getRenderedFeatures }));
    },
    [dispatch, sourceId, setViewportFeatures]
  );

  return [onViewportChange];
}
