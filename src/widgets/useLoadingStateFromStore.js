import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidgetLoaders, removeWidgetLoaders } from '../redux/cartoSlice';

export default function useLoadingStateFromStore(widgetId, filterIsByViewport) {
  const dispatch = useDispatch();
  const widgetLoaders = useSelector((state) => state.carto.widgetLoaders);
  const widgetIdIsSet = useRef(false);

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
      removeWidgetLoaders();
    };
  }, []);

  useEffect(() => {
    if (widgetId in widgetLoaders) {
      widgetIdIsSet.current = true;
    }
  }, [widgetLoaders]);

  return [widgetIdIsSet.current, setLoading];
}
