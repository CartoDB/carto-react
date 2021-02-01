import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWidgetsLoadingState, removeWidgetsLoadingState } from '../redux/cartoSlice';

export default function useWidgetLoadingState(widgetId, filterIsByViewport) {
  const dispatch = useDispatch();
  const widgetsLoadingState = useSelector((state) => state.carto.widgetsLoadingState);
  const hasLoadingState = useRef(false);

  const setIsLoading = useCallback(
    (isLoading) => {
      if (widgetId) {
        dispatch(
          setWidgetsLoadingState({
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

    setIsLoading(filterIsByViewport);

    return () => {
      dispatch(removeWidgetsLoadingState([widgetId]));
    };
  }, []);

  useEffect(() => {
    if (widgetId in widgetsLoadingState) {
      hasLoadingState.current = true;
    }
  }, [widgetsLoadingState]);

  return [hasLoadingState.current, setIsLoading];
}
