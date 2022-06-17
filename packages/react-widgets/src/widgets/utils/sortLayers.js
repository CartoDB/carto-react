import { _assert as assert } from '@carto/react-core';

/**
 * Sorts a list of layers based on a list of id property values
 * @param {{ id: string }[]} layers - Array of layers to sort
 * @param {string[]} layerOrder - Array of ids to sort by
 * @returns sorted array
 */
export default function sortLayers(layers = [], layerOrder = []) {
  if (!layerOrder.length) {
    return layers;
  }
  return [...layers].sort((layerA, layerB) => {
    assert(layerA.id && layerB.id, 'Layer must have an id');
    return layerOrder.indexOf(layerB.id) - layerOrder.indexOf(layerA.id);
  });
}
