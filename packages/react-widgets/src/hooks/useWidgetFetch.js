import { InvalidColumnError } from '@carto/react-core';
import { selectAreFeaturesReadyForSource } from '@carto/react-redux';
import { dequal } from 'dequal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';
import useRemoteForeignFilterSource from './useRemoteForeignFilterSource';

export default function useWidgetFetch(
  modelFn,
  { id, dataSource, params, global, onError, enabled = true }
) {
  // State
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource)
  );
  const _source = useWidgetSource({ dataSource, id });
  const source = useRemoteForeignFilterSource(_source, global);

  useCustomCompareEffect(
    () => {
      setIsLoading(true);
      setWarning('');

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
            if (InvalidColumnError.is(error)) {
              setWarning(DEFAULT_INVALID_COLUMN_ERR);
            } else if (onError) {
              onError(error);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [params, source, onError, isSourceReady, global, enabled],
    dequal
  );

  return { data, isLoading, isSourceReady, source, warning };
}
