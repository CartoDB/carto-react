import { useEffect, useCallback, useState } from 'react';
import {
  debounce,
  SpatialIndex,
  getColumnNameFromGeoColumn,
  TILE_FORMATS
} from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { Layer } from '@deck.gl/core';
import { throwError } from './utils';
import useFeaturesCommons from './useFeaturesCommons';

export default function useTileFeatures({
  source,
  viewport,
  spatialFilter,
  uniqueIdProperty,
  debounceTimeout = 250
}) {
  const [
    debounceIdRef,
    isTilesetLoaded,
    setTilesetLoaded,
    clearDebounce,
    stopAnyCompute,
    setSourceFeaturesReady
  ] = useFeaturesCommons({ source });

  const [tileFormat, setTileFormat] = useState('');
  const [spatialIndex, setSpatialIndex] = useState();
  const [geoColumName, setGeoColumName] = useState();

  const sourceId = source?.id;

  const computeFeatures = useCallback(
    ({ viewport, spatialFilter, uniqueIdProperty }) => {
      if (!tileFormat) {
        return null;
      }

      setSourceFeaturesReady(false);

      executeTask(sourceId, Methods.TILE_FEATURES, {
        viewport,
        geometry: spatialFilter?.geometry,
        uniqueIdProperty,
        tileFormat,
        geoColumName,
        spatialIndex
      })
        .then(() => {
          setSourceFeaturesReady(true);
        })
        .catch(throwError)
        .finally(clearDebounce);
    },
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      spatialFilter ? spatialFilter : viewport,
      tileFormat,
      setSourceFeaturesReady,
      sourceId,
      geoColumName,
      spatialIndex,
      clearDebounce
    ]
  );

  const loadTiles = useCallback(
    (tiles) => {
      const cleanedTiles = tiles.reduce((acc, { data, isVisible, bbox }) => {
        if (isVisible && data) {
          acc.push({
            data,
            bbox
          });
        }
        return acc;
      }, []);

      executeTask(sourceId, Methods.LOAD_TILES, { tiles: cleanedTiles })
        .then(() => setTilesetLoaded(true))
        .catch(throwError);
    },
    [sourceId, setTilesetLoaded]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedComputeFeatures = useCallback(
    debounce(computeFeatures, debounceTimeout),
    [computeFeatures]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadTiles = useCallback(debounce(loadTiles, debounceTimeout), [
    loadTiles
  ]);

  useEffect(
    () => {
      if (sourceId && isTilesetLoaded) {
        clearDebounce();
        setSourceFeaturesReady(false);
        debounceIdRef.current = debouncedComputeFeatures({
          viewport,
          spatialFilter,
          uniqueIdProperty
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      spatialFilter ? spatialFilter : viewport,
      uniqueIdProperty,
      debouncedComputeFeatures,
      sourceId,
      isTilesetLoaded,
      setSourceFeaturesReady,
      clearDebounce,
      debounceIdRef
    ]
  );

  const onViewportLoad = useCallback(
    (tiles) => {
      stopAnyCompute();
      setSourceFeaturesReady(false);

      debounceIdRef.current = debouncedLoadTiles(tiles);
    },
    [stopAnyCompute, setSourceFeaturesReady, debouncedLoadTiles, debounceIdRef]
  );

  const fetch = useCallback(
    (...args) => {
      stopAnyCompute();
      return Layer.defaultProps.fetch.value(...args);
    },
    [stopAnyCompute]
  );

  const onDataLoad = useCallback(({ tiles: [tile], scheme }) => {
    const url = new URL(tile);
    const tilesFormat = url.searchParams.get('formatTiles');
    setTileFormat(tilesFormat || TILE_FORMATS.MVT);
    const geoColum = url.searchParams.get('geo_column');

    if (geoColum) {
      setGeoColumName(getColumnNameFromGeoColumn(geoColum));
    }
    setSpatialIndex(Object.values(SpatialIndex).includes(scheme) ? scheme : undefined);
  }, []);

  return [onDataLoad, onViewportLoad, fetch];
}
