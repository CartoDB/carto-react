import { binaryToGeoJson } from '../../node_modules/@loaders.gl/gis';
import { viewportFeatures } from '../api/viewportFeatures';

onmessage = ({ data: { tiles, viewport, uniqueIdProperty } }) => {
  const features = viewportFeatures({
    tiles: tiles.map(({ data, isVisible, bbox }) => ({
      data: data && binaryToGeoJson(data),
      isVisible,
      bbox
    })),
    viewport,
    uniqueIdProperty
  });

  postMessage({
    features
  });
};
