import {
  InvalidColumnError,
  getGeometryToIntersect,
  isGlobalViewport,
  normalizeGeometry
} from '@carto/react-core';
import {
  selectAreFeaturesReadyForSource,
  selectValidSpatialFilter,
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

// stolen from deck.gl/modules/carto/src/layers/h3-tileset-2d.ts
const BIAS = 2;
export function getHexagonResolution(viewport, tileSize) {
  // Difference in given tile size compared to deck's internal 512px tile size,
  // expressed as an offset to the viewport zoom.
  const zoomOffset = Math.log2(tileSize / 512);
  const hexagonScaleFactor = (2 / 3) * (viewport.zoom - zoomOffset);
  const latitudeScaleFactor = Math.log(1 / Math.cos((Math.PI * viewport.latitude) / 180));

  // Clip and bias
  return Math.max(0, Math.floor(hexagonScaleFactor + latitudeScaleFactor - BIAS));
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
  const viewState = useSelector((state) => state.carto.viewState);
  const spatialFilter = useSelector((state) =>
    selectValidSpatialFilter(state, dataSource)
  );
  const geometryToIntersect = useMemo(
    () => selectGeometryToIntersect(global, viewport, spatialFilter),
    [global, viewport, spatialFilter]
  );

  const source2 = useMemo(() => {
    if (
      !source ||
      !geometryToIntersect ||
      !source.dataResolution ||
      source.spatialDataType === 'geo'
    ) {
      return source;
    }

    if (source.spatialDataType === 'h3') {
      const hexagonResolution = getHexagonResolution(
        { zoom: viewState.zoom, latitude: viewState.latitude },
        source.dataResolution
      );
      return {
        ...source,
        spatialFiltersResolution: Math.min(source.dataResolution, hexagonResolution)
      };
    }
    if (source.spatialDataType === 'quadbin') {
      const quadsResolution = viewState.zoom;
      return {
        ...source,
        spatialFiltersResolution: Math.min(source.dataResolution, quadsResolution)
      };
    }
    return source;
  }, [geometryToIntersect, source, viewState.zoom, viewState.latitude]);

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
        source: source2,
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
      source2,
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
