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
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_INVALID_COLUMN_ERR } from '../widgets/utils/constants';
import useCustomCompareEffect from './useCustomCompareEffect';
import useWidgetSource from './useWidgetSource';
import { isRemoteCalculationSupported } from '../models/utils';

export const WidgetStateType = {
  Loading: 'loading',
  Success: 'success',
  Error: 'error'
};

/**
 * Select a geometry to intersect features with, given the widget configuration.
 *
 * @typedef { import('geojson').Polygon | import('geojson').MultiPolygon } Geometry
 * @typedef { import('geojson').Feature<Geometry> } Feature
 * @typedef { import('@carto/react-core').Viewport } Viewport
 *
 * @param {boolean} global if the widget is in global mode
 * @param {Viewport?} viewport the current viewport
 * @param {Feature?} spatialFilter the current active mask, if set
 * @returns {Geometry?}
 *   the geometry to intersect, if any, to be used as spatial filter for queries
 */
export function selectGeometryToIntersect(global, viewport, spatialFilter) {
  if (global) {
    // global widgets work with selection mask, if set, otherwise no filter at all
    if (spatialFilter?.geometry?.coordinates) {
      return normalizeGeometry(spatialFilter.geometry);
    } else {
      return null;
    }
  } else {
    // shortcut to remove viewports that cover the world anyway
    if (!spatialFilter && isGlobalViewport(viewport)) {
      return null;
    } else {
      // non-global widgets work with selection mask, if set, otherwise viewport
      return normalizeGeometry(
        getGeometryToIntersect(viewport, spatialFilter ? spatialFilter.geometry : null)
      );
    }
  }
}

export default function useWidgetFetch(
  modelFn,
  {
    id,
    dataSource,
    params,
    global,
    onError,
    onStateChange,
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
  const geometryToIntersect = useMemo(
    () => selectGeometryToIntersect(global, viewport, spatialFilter),
    [global, viewport, spatialFilter]
  );

  useCustomCompareEffect(
    () => {
      let outdated = false;
      setIsLoading(true);
      setWarning('');

      if (!source || !isSourceReady || !enabled) {
        return;
      }

      onStateChange?.({ state: WidgetStateType.Loading });

      modelFn({
        source,
        ...params,
        global,
        remoteCalculation,
        spatialFilter: geometryToIntersect
      })
        .then((data) => {
          if (outdated) return;

          onStateChange?.({ state: WidgetStateType.Success, data });
          setData(data ?? undefined);
        })
        .catch((error) => {
          if (outdated) return;

          setData(undefined);
          onStateChange?.({ state: WidgetStateType.Error, error: String(error) });
          if (InvalidColumnError.is(error)) {
            setWarning(DEFAULT_INVALID_COLUMN_ERR);
          } else {
            onError?.(error);
          }
        })
        .finally(() => {
          if (outdated) return;

          setIsLoading(false);
        });

      return () => {
        outdated = true;
      };
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
