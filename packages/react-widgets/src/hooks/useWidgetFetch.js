import {
  InvalidColumnError,
  getGeometryToIntersect,
  isGlobalViewport,
  normalizeGeometry
} from '@carto/react-core';
import {
  selectAreFeaturesReadyForSource,
  selectSpatialFilter,
  selectViewport
} from '@carto/react-redux';
import { dequal } from 'dequal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';
import { isRemoteCalculationSupported } from '../models/utils';

export default function useWidgetFetch(
  modelFn,
  {
    id,
    dataSource,
    params,
    global,
    onError,
    enabled = true,
    attemptRemoteCalculation = false
  }
) {
  // State
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const source = useWidgetSource({ dataSource, id });
  const remoteCalculation =
    attemptRemoteCalculation && isRemoteCalculationSupported({ source });

  const isSourceReady = useSelector(
    (state) =>
      global || remoteCalculation || selectAreFeaturesReadyForSource(state, dataSource)
  );

  const viewport = useSelector(selectViewport);
  const spatialFilter = useSelector((state) => selectSpatialFilter(state, dataSource));
  const geometryToIntersect =
    global || (!spatialFilter && isGlobalViewport(viewport))
      ? null
      : normalizeGeometry(
          getGeometryToIntersect(viewport, spatialFilter ? spatialFilter.geometry : null)
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
          remoteCalculation,
          spatialFilter: geometryToIntersect
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
    [
      params,
      source,
      onError,
      isSourceReady,
      global,
      remoteCalculation,
      geometryToIntersect,
      enabled
    ],
    dequal
  );

  return { data, isLoading, isSourceReady, source, warning, remoteCalculation };
}
