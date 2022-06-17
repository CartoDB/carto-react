import { assert } from '@carto/react-core';

/**
 * Sorts a list of layers based on a list of id property values
 * @param {any[]} layers list of layers to sort
 * @param {string[]} layerOrder values to sort by
 * @returns sorted array
 */
export default function sortLayersById(layers = [], layerOrder = []) {
  const uniqueValues = [...new Set(layerOrder)];
  assert(
    layers.every((layer) => layer.id),
    'Layers must have an id property'
  );
  return layers.sort((a, b) => uniqueValues.indexOf(b.id) - uniqueValues.indexOf(a.id));
}
