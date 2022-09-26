import { InvalidColumnError } from '@carto/react-core';
import {
  selectAreFeaturesReadyForSource,
  selectSourceById,
  addFilter
} from '@carto/react-redux';
import { dequal } from 'dequal';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';
import { getForeignFilter } from '@carto/react-api';

export default function useWidgetFetch(
  modelFn,
  { id, dataSource, params, global, onError, enabled = true }
) {
  // State
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const dispatch = useDispatch();

  const isSourceReady = useSelector(
    (state) => global || selectAreFeaturesReadyForSource(state, dataSource)
  );
  // const _source = useWidgetSource({ dataSource, id });
  // const source = useRemoteForeignFilterSource(_source, global);

  const source = useWidgetSource({ dataSource, id });
  const foreignSource = useSelector(
    (state) =>
      source?.foreignFilteringSource?.foreignSourceId &&
      selectSourceById(state, source?.foreignFilteringSource?.foreignSourceId)
  );

  useCustomCompareEffect(
    () => {
      if (!source?.id || !foreignSource) {
        return;
      }
      getForeignFilter(source, foreignSource).then((filter) => {
        if (filter) {
          dispatch(
            addFilter({
              id: source?.id,
              ...filter
            })
          );
        }
      });
    },
    [source?.id, foreignSource],
    dequal
  );

  useCustomCompareEffect(
    () => {
      setIsLoading(true);
      setWarning('');

      if (source && isSourceReady && enabled) {
        modelFn({
          source,
          ...params,
          global,
          foreignSource
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
    [params, source, onError, isSourceReady, global, enabled, foreignSource],
    dequal
  );

  return { data, isLoading, isSourceReady, source, warning };
}
