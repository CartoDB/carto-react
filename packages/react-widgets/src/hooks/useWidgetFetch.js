import { InvalidColumnError } from '@carto/react-core';
import { selectAreFeaturesReadyForSource, addFilter } from '@carto/react-redux';
import { dequal } from 'dequal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';
import {
  getForeignFilter,
  selectForeignFilterParams,
  assignBackEndFilters
} from '@carto/react-api';

export default function useWidgetFetch(
  modelFn,
  { id, dataSource, params, global, onError, enabled = true }
) {
  // State
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const dispatch = useDispatch();

  const source = useWidgetSource({ dataSource, id });
  const { hasForeignFilter, foreignSource, isForeignSourceReady } = useSelector((state) =>
    selectForeignFilterParams(state, source)
  );

  const isSourceReady = useSelector((state) => {
    const selfReady = global || selectAreFeaturesReadyForSource(state, dataSource);
    if (hasForeignFilter) {
      return selfReady && isForeignSourceReady;
    }
    return selfReady;
  });

  useCustomCompareEffect(
    () => {
      if (!source?.id || !foreignSource || !isForeignSourceReady) {
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
    [source?.id, foreignSource, isForeignSourceReady],
    dequal
  );

  useCustomCompareEffect(
    () => {
      setIsLoading(true);
      setWarning('');

      if (source && isSourceReady && enabled) {
        let _source = source;
        if (foreignSource && global) {
          _source = assignBackEndFilters(source, foreignSource);
        }

        modelFn({
          source: _source,
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
    [params, source, onError, isSourceReady, global, enabled, foreignSource],
    dequal
  );

  return { data, isLoading, isSourceReady, source, warning };
}
