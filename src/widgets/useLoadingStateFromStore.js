import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidgetLoaders, removeWidgetLoaders } from '../redux/cartoSlice';

export default function useLoadingStateFromStore(widgetId, filterIsByViewport) {
  const dispatch = useDispatch();
  const widgetLoaders = useSelector((state) => state.carto.widgetLoaders);
  const isLoadingStateSet = useRef(false);

  const setLoading = useCallback(
    (isLoading) => {
      if (widgetId) {
        dispatch(
          setWidgetLoaders({
            widgetId,
            isLoading
          })
        );
      }
    },
    [widgetId]
  );

  useEffect(() => {
    if (!widgetId) {
      throw new Error('Widget "id" property is required.');
    }

    setLoading(filterIsByViewport);

    return () => {
      dispatch(removeWidgetLoaders([widgetId]));
    };
  }, []);

  useEffect(() => {
    if (widgetId in widgetLoaders) {
      isLoadingStateSet.current = true;
    }
  }, [widgetLoaders]);

  return [isLoadingStateSet.current, setLoading];
}
