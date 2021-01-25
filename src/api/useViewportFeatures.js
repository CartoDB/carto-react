import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures } from '../redux/cartoSlice';
import bboxPolygon from '@turf/bbox-polygon';
import booleanContains from '@turf/boolean-contains';
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

  tiles.forEach(({ data, isCompletelyInViewport }) => {
    if (data) {
      for (const feature of data) {
        const id = uniqueId(feature);
    
        if (!features.has(id)) {
          feature = { ...feature, isCompletelyInViewport };
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
      if (feat.isCompletelyInViewport) {
        return true;
      }

      return intersects(feat, viewportBbox);
    }
    
    return false;
  });
}

export default function useViewportFeatures(source) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [uniqueFeatures, setUniqueFeatures] = useState();
  const [delayedViewport, setDelayedViewport] = useState();
  const firstUpdate = useRef(true);

  const computeFeatures = useCallback((features, viewport, sourceId) => {
    const viewportFeatures = featuresInViewport(features, viewport);

    dispatch(setViewportFeatures({
      sourceId,
      features: viewportFeatures
    }));
  }, []);

  useEffect(() => {
    if (firstUpdate.current && uniqueFeatures && viewport && source?.id) {
      computeFeatures(uniqueFeatures, viewport, source.id);
      firstUpdate.current = false;
    }
  }, [uniqueFeatures, viewport, source]);

  useEffect(() => {
    if (uniqueFeatures && delayedViewport && source?.id) {
      computeFeatures(uniqueFeatures, delayedViewport, source.id);
    }
  }, [delayedViewport, source]);

  useEffect(() => {
    setDebouncedViewport(viewport);
  }, [viewport]);

  const setDebouncedViewport = useCallback(
    debounce(viewport => {
      setDelayedViewport(viewport);
    }, 500),
    []
  );

  const onViewportLoad = useCallback((visibleTiles) => {
    const viewportBbox = bboxPolygon(viewport);
    
    const tilesInViewport = visibleTiles.map(tile => {
      const tileBbox = bboxPolygon(Object.values(tile.bbox));

      return {
        isCompletelyInViewport: booleanContains(viewportBbox, tileBbox),
        data: tile.dataInWGS84
      }
    });

    const features = getUniqueFeatures(tilesInViewport);
    setUniqueFeatures(features);
  }, [viewport]);

  return [onViewportLoad];
}