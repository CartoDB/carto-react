import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeaturesReady, setAllWidgetsLoadingState } from '@carto/react-redux';
import { debounce } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeaturesTileset = useCallback(
    debounce(async ({ tiles, viewport, uniqueIdProperty, sourceId }) => {
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

        dispatch(
          setViewportFeaturesReady({
            sourceId,
            ready: true
          })
        );
      } catch (error) {
        if (error.name === 'AbortError') return;
        throw error;
      }
    }, debounceTimeOut),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeFeaturesGeoJSON = useCallback(
    debounce(async ({ viewport, uniqueIdProperty, sourceId }) => {
      try {
        await executeTask(sourceId, Methods.VIEWPORT_FEATURES_GEOJSON, {
          viewport,
          uniqueIdProperty
        });

        dispatch(
          setViewportFeaturesReady({
            sourceId,
            ready: true
          })
        );
      } catch (error) {
        if (error.name === 'AbortError') return;
        throw error;
      }
    }, debounceTimeOut),
    []
  );

  useEffect(() => {
    if (source && tiles.length && (!isV3(source) || source?.type === MAP_TYPES.TILESET)) {
      dispatch(setAllWidgetsLoadingState(true));
      computeFeaturesTileset({ tiles, viewport, uniqueIdProperty, sourceId: source.id });
    }
  }, [tiles, viewport, uniqueIdProperty, computeFeaturesTileset, source, dispatch]);

  useEffect(() => {
    if (source && isGeoJSONLayer(source)) {
      dispatch(setAllWidgetsLoadingState(true));
      if (isGeoJSONLoaded) {
        computeFeaturesGeoJSON({ viewport, uniqueIdProperty, sourceId: source.id });
      }
    }
  }, [
    viewport,
    uniqueIdProperty,
    computeFeaturesGeoJSON,
    source,
    dispatch,
    isGeoJSONLoaded
  ]);

  useEffect(() => {
    if (!source) {
      setGeoJSONLoaded(false);
    }
  }, [source]);

  const onViewportLoad = useCallback((tiles) => {
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
              `Unable to retrieve GeoJSON. Please check that your query is returning a column called "geom" or that you are using the geoColumn property to indicate the geometry column in the table.`
            );
          if (error.name === 'AbortError') return;
          throw error;
        }
      };
      dispatch(setAllWidgetsLoadingState(true));
      loadDataInWorker();
    },
    [dispatch, source]
  );

  return [onViewportLoad, onDataLoad];
}
