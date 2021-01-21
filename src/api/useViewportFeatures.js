import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures } from '../redux/cartoSlice';
import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import { debounce } from '../utils/debounce';

const GEOMETRY_TYPES = Object.freeze([
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon'
]);

// TODO: need to find another way to get the unique feature id
// User will need to specify the unique id as a widget prop ?¿
// useViewportFeatures receives another argument with unique id ?¿
function uniqueId(feature) {
  if ('id' in feature) {
    return feature.id;
  }

  if ('cartodb_id' in feature.properties) {
    return feature.properties.cartodb_id;
  }

  if ('geoid' in feature.properties) {
    return feature.properties.geoid;
  }

  throw new Error('"uniqueFeatureId" is required.');
}

function getUniqueFeatures(tiles) {
  const features = new Map();

  tiles.forEach(tile => {
    const data = tile.dataInWGS84;

    if (data) {
      for (const feature of data) {
        const id = uniqueId(feature);
    
        if (!features.has(id)) {
          features.set(id, feature);
        }
      }
    }
  });

  return Array.from(features.values());
}

function featuresInViewport(features, viewport) {
  const viewportBbox = bboxPolygon(viewport);

  return features.filter(feat => {
    if (GEOMETRY_TYPES.includes(feat.geometry.type)) {
      return intersects(feat, viewportBbox);
    }
    
    return false;
  });
}

export default function useViewportFeatures(source) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [visibleTiles, setVisibleTiles] = useState();
  const [delayedViewport, setDelayedViewport] = useState();
  const firstUpdate = useRef(true);

  const computeFeatures = useCallback((tiles, viewport, sourceId) => {
    const uniqueFeatures = getUniqueFeatures(tiles);
    const viewportFeatures = featuresInViewport(uniqueFeatures, viewport);

    dispatch(setViewportFeatures({
      sourceId,
      features: viewportFeatures
    }));
  }, []);

  useEffect(() => {
    if (firstUpdate.current && visibleTiles && viewport && source?.id) {
      computeFeatures(visibleTiles, viewport, source.id);
      firstUpdate.current = false;
    }
  }, [visibleTiles, viewport, source]);

  useEffect(() => {
    if (visibleTiles && delayedViewport && source?.id) {
      computeFeatures(visibleTiles, delayedViewport, source.id);
    }
  }, [delayedViewport, source]);

  useEffect(() => {
    verifyViewport(viewport);
  }, [viewport]);

  const verifyViewport = useCallback(
    debounce(viewport => {
      setDelayedViewport(viewport);
    }, 500),
    []
  );

  function onViewportLoad(visibleTiles) {
    setVisibleTiles(visibleTiles);
  }

  return [onViewportLoad];
}