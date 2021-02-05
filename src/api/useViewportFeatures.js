import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportFeatures, setAllWidgetsLoadingState } from '../redux/cartoSlice';
import bboxPolygon from '@turf/bbox-polygon';
import booleanContains from '@turf/boolean-contains';
import intersects from '@turf/boolean-intersects';
import { debounce } from '../utils/debounce';
import { viewportFeatures } from './viewportFeatures';

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
      for (let feature of data) {
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

  return features.filter((feat) => {
    if (GEOMETRY_TYPES.includes(feat.geometry.type)) {
      if (feat.isCompletelyInViewport) {
        return true;
      }

      return intersects(feat, viewportBbox);
    }

    return false;
  });
}

export default function useViewportFeatures(source, uniqueId, debounceTimeOut = 500) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.carto.viewport);
  const [tiles, setTiles] = useState([]);

  const computeFeatures = useCallback(
    debounce(({ tiles, viewport, uniqueId, sourceId }) => {
      const features = viewportFeatures({ tiles, viewport, uniqueId });
      dispatch(
        setViewportFeatures({
          sourceId,
          features: features
        })
      );
    }, debounceTimeOut)
  ).current;

  useEffect(() => {
    if (tiles.length) {
      dispatch(setAllWidgetsLoadingState(true));
      computeFeatures({ tiles, viewport, uniqueId, sourceId: source.id });
    }
  }, [tiles, viewport, uniqueId, computeFeatures, source, dispatch]);

  const onViewportLoad = useCallback((tiles) => {
    console.log('onViewportLoad');
    setTiles(tiles);
  }, []);

  return [onViewportLoad];
}
