import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidgetLoadingState, removeWidgetLoadingState } from '../redux/cartoSlice';

export default function useWidgetLoadingState(widgetId, filterIsByViewport) {
  const dispatch = useDispatch();
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const hasLoadingState = useRef(false);

  const setIsLoading = useCallback(
    (isLoading) => {
      if (widgetId) {
        dispatch(
          setWidgetLoadingState({
            widgetId,
            isLoading
          })
        );
      }
    },
    [dispatch, widgetId]
  );

  useEffect(() => {
    if (!widgetId) {
      throw new Error('Widget "id" property is required.');
    }

    setIsLoading(filterIsByViewport);

    return () => {
      dispatch(removeWidgetLoadingState(widgetId));
    };
  }, [dispatch, filterIsByViewport, setIsLoading, widgetId]);

  useEffect(() => {
    if (widgetId in widgetsLoadingState) {
      hasLoadingState.current = true;
    }
  }, [widgetId, widgetsLoadingState]);

  return [hasLoadingState.current, setIsLoading];
}
