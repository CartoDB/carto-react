import { selectAreFeaturesReadyForSource } from '@carto/react-redux/';
import { dequal } from 'dequal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';

export default function useWidgetFetch(
  modelFn,
  { id, dataSource, params, global, onError, enabled = true }
) {
  // State
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource)
  );
  const source = useWidgetSource({ dataSource, id });

  useCustomCompareEffect(
    () => {
      setIsLoading(true);

      if (source && isSourceReady && enabled) {
        modelFn({
          source,
          ...params,
          global
        })
          .then((data) => {
            if (data !== null && data !== undefined) {
              setData(data);
            }
          })
          .catch((error) => {
            if (onError) onError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [params, source, onError, isSourceReady, global, enabled],
    dequal
  );

  return { data, isLoading, isSourceReady, source };
}
