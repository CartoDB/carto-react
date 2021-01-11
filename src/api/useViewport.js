import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setViewportFeatures } from '../redux/cartoSlice';
import { featuresInViewport } from './FeaturesInViewport';

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

function getUniqueFeatures(tiles) {
  const features = new Map();

  tiles.forEach(tile => {
    if ('dataWithWGS84Coords' in tile) {
      const data = tile.dataWithWGS84Coords;

      for (let i = 0; i < data.length; i++) {
        const feature = data[i];
        const id = uniqueId(feature);
  
        if (!features.has(id)) {
          features.set(id, feature);
        }
      }
    }
  });

  return Array.from(features.values());
}

export default function useViewport(source) {
  const dispatch = useDispatch();
  
  const onViewportChange = useCallback(
    ({ getVisibleTiles, viewport }) => {
      const sourceFeatures = getVisibleTiles();

      const uniqueFeatures = getUniqueFeatures(sourceFeatures);
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