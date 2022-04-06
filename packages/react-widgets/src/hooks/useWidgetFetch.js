import { selectAreFeaturesReadyForSource } from '@carto/react-redux/';
import { dequal } from 'dequal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';

export default function useWidgetFetch(
  modelFn,
  { id, dataSource, params, global, onError }
) {
  // State
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource)
  );
  const source = useWidgetSource({ dataSource, id });

  useCustomCompareEffect(
    () => {
      setIsLoading(true);

      if (source && isSourceReady) {
        modelFn({
          source,
          ...params,
          global
        })
          .then((data) => {
            if (data !== null && data !== undefined) {
              setIsLoading(false);
              setData(data);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            if (onError) onError(error);
          });
      }
    },
    [params, source, setIsLoading, onError, isSourceReady, global],
    dequal
  );

  return { data, isLoading };
}
