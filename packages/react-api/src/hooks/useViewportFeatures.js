import { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeaturesReady } from '@carto/react-redux';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { Layer } from '@deck.gl/core';

function isGeoJSONLayer(source) {
  return isV3(source) && [MAP_TYPES.QUERY, MAP_TYPES.TABLE].includes(source?.type);
}

function isV3(source) {
  return source?.credentials.apiVersion === API_VERSIONS.V3;
}

export default function useViewportFeatures(
  source,
  uniqueIdProperty,
  debounceTimeOut = 500
) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [tiles, setTiles] = useState([]);
  const [isGeoJSONLoaded, setGeoJSONLoaded] = useState(false);
  const debounceId = useRef(null);

  const clearDebounce = () => {
    if (debounceId.current) {
      clearTimeout(debounceId.current);
    }
    debounceId.current = null;
  };

  const sourceId = source?.id;

  const setSourceViewportFeaturesReady = useCallback(
    (ready) => {
      if (sourceId) {
        dispatch(setViewportFeaturesReady({ sourceId, ready }));
      }
    },
    [dispatch, sourceId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeaturesTileset = useCallback(
    debounce(async ({ tiles, viewport, uniqueIdProperty, sourceId }) => {
      dispatch(
        setViewportFeaturesReady({
          sourceId,
          ready: false
        })
      );

      const tilesCleaned = tiles.map(({ data, isVisible, bbox }) => ({
        data,
        isVisible,
        bbox
      }));

      try {
        await executeTask(sourceId, Methods.VIEWPORT_FEATURES, {
          tiles: tilesCleaned,
          viewport,
          uniqueIdProperty
        });

        setSourceViewportFeaturesReady(true);
      } catch (error) {
        if (error.name === 'AbortError') return;
        throw error;
      } finally {
        clearDebounce();
      }
    }, debounceTimeOut),
    [setSourceViewportFeaturesReady]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeaturesGeoJSON = useCallback(
    debounce(async ({ viewport, uniqueIdProperty, sourceId }) => {
      try {
        await executeTask(sourceId, Methods.VIEWPORT_FEATURES_GEOJSON, {
          viewport,
          uniqueIdProperty
        });

        setSourceViewportFeaturesReady(true);
      } catch (error) {
        if (error.name === 'AbortError') return;
        throw error;
      }
    }, debounceTimeOut),
    [setSourceViewportFeaturesReady]
  );

  const isSourceV3 = useMemo(() => isV3(source), [source]);
  const isSourceTileset = useMemo(() => source?.type === MAP_TYPES.TILESET, [source]);
  const isSourceGeoJSONLayer = useMemo(() => isGeoJSONLayer(source), [source]);

  useEffect(() => {
    if (sourceId && tiles.length && (!isSourceV3 || isSourceTileset)) {
      clearDebounce();
      setSourceViewportFeaturesReady(false);
      debounceId.current = computeFeaturesTileset({
        tiles,
        viewport,
        uniqueIdProperty,
        sourceId
      });
    }
  }, [
    tiles,
    viewport,
    uniqueIdProperty,
    computeFeaturesTileset,
    sourceId,
    isSourceV3,
    isSourceTileset,
    setSourceViewportFeaturesReady
  ]);

  useEffect(() => {
    if (sourceId && isSourceGeoJSONLayer) {
      setSourceViewportFeaturesReady(false);
      if (isGeoJSONLoaded) {
        computeFeaturesGeoJSON({ viewport, uniqueIdProperty, sourceId });
      }
    }
  }, [
    viewport,
    uniqueIdProperty,
    computeFeaturesGeoJSON,
    sourceId,
    isSourceGeoJSONLayer,
    isGeoJSONLoaded,
    setSourceViewportFeaturesReady
  ]);

  useEffect(() => {
    if (!source) {
      setGeoJSONLoaded(false);
    }
  }, [source]);

  const onViewportLoad = useCallback((tiles) => {
    clearDebounce();
    setTiles(tiles);
  }, []);

  const onDataLoad = useCallback(
    (data) => {
      const loadDataInWorker = async () => {
        try {
          await executeTask(source.id, Methods.LOAD_GEOJSON_FEATURES, {
            geojson: data
          });
          setGeoJSONLoaded(true);
        } catch (error) {
          if (error.name === 'DataCloneError')
            throw new Error(
              `DataCloneError: Unable to retrieve GeoJSON features. Please check that your query is returning a column called "geom" or that you are using the geoColumn property to indicate the geometry column in the table.`
            );
          if (error.name === 'AbortError') return;
          throw error;
        }
      };
      setSourceViewportFeaturesReady(false);
      loadDataInWorker();
    },
    [source, setSourceViewportFeaturesReady]
  );

  const fetch = useCallback((arg1, arg2) => {
    clearDebounce();
    return Layer.defaultProps.fetch.value(arg1, arg2);
  }, []);

  return [onViewportLoad, onDataLoad, fetch];
}
