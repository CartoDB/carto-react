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

function pickPropByUniqueId(feature, uniqueId) {
  if (uniqueId in feature.properties) {
    return feature.properties[uniqueId];
  }

  if ('id' in feature) {
    return feature.id;
  }

  if ('geoid' in feature.properties) {
    return feature.properties.geoid;
  }

  throw new Error('"uniqueFeatureId" is required.');
}

function getUniqueFeatures(tiles, uniqueId) {
  const features = new Map();

  tiles.forEach(({ data, isCompletelyInViewport }) => {
    if (data) {
      for (const feature of data) {
        const id = pickPropByUniqueId(feature, uniqueId);
    
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

export default function useViewportFeatures(source, uniqueId) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [uniqueFeatures, setUniqueFeatures] = useState();
  const [delayedViewport, setDelayedViewport] = useState();

  const computeFeatures = useCallback((features, viewport, sourceId) => {
    const viewportFeatures = featuresInViewport(features, viewport);

    dispatch(setViewportFeatures({
      sourceId,
      features: viewportFeatures
    }));
  }, []);

  useEffect(() => {
    if (uniqueFeatures && delayedViewport && source?.id) {
      computeFeatures(uniqueFeatures, delayedViewport, source.id);
    }
  }, [uniqueFeatures, delayedViewport, source]);

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

    const features = getUniqueFeatures(tilesInViewport, uniqueId);
    setUniqueFeatures(features);
  }, [uniqueId, viewport]);

  return [onViewportLoad];
}
