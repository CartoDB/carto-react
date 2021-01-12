import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeatures } from '../redux/cartoSlice';
import bboxPolygon from "@turf/bbox-polygon";
import intersects from "@turf/boolean-intersects";

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
// useViewport receives another argument with unique id ?¿
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

async function getUniqueFeatures(tiles) {
  const features = new Map();

  await tiles.forEach(async tile => {
    if ('dataWithWGS84Coords' in tile) {
      const data = await tile.dataWithWGS84Coords;

      for (const feature of data) {
        const id = uniqueId(feature);
  
        if (!features.has(id)) {
          features.set(id, feature);
        }
      }
    }
  });

  return Array.from(await features.values());
}

function featuresInViewport(features, viewport) {
  const viewportBbox = bboxPolygon(viewport.getBounds());

  return features.filter(feat => {
    if (GEOMETRY_TYPES.includes(feat.geometry.type)) {
      return intersects(feat, viewportBbox);
    }
    
    return false;
  });
}

export default function useViewport(source) {
  const dispatch = useDispatch();
  
  const onViewportChange = useCallback(
    async ({ getVisibleTiles, viewport }) => {
      const sourceFeatures = getVisibleTiles('wgs84');
      const uniqueFeatures = await getUniqueFeatures(sourceFeatures);
      const intersectedFeaturesWithViewport = featuresInViewport(uniqueFeatures, viewport, source.filters);

      dispatch(setViewportFeatures({
        sourceId: source.id,
        features: intersectedFeaturesWithViewport
      }));
    },
    [dispatch, source, setViewportFeatures]
  );

  return [onViewportChange];
}