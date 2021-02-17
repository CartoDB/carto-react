import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';

// // import prueba from '../workers/testWorker';
// const worker = new Worker(new URL('../workers/testWorker.js', import.meta.url));
// // const worker = new Worker('worker.js');

// worker.postMessage({
//   question:
//     'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
// });
// import WebWorker from '../workers/WebWorker';
// import testWorker from '../workers/testWorker.worker.js';

// const testWorker = new Worker('../workers/testWorker.worker.js', { type: 'module' });
// const worker = new Worker(new URL("../workers/testWorker.worker.js", import.meta.url));

// const worker = new WebWorker(testWorker);

// worker.postMessage({
//   question:
//     'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
// });

// import Worker from "worker-loader!../workers/testWorker.worker.js";

////////FUNCIONA//////////////////////////////////////////////////////////////

// import testWorker from "../workers/testWorker.worker.js";

// const worker = new testWorker();
// worker.postMessage({
//   question:
//     'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
// });
////////FUNCIONA//////////////////////////////////////////////////////////////

import { getWorker } from '../workers/workerPool';

// Clip the viewport with the tile and transform to tile coordinates [0..1]
function prepareViewport(bbox, viewport) {
  const { west, south, east, north } = bbox;

  // Clip viewport with the tile
  const minX = Math.max(west, viewport[0]);
  const minY = Math.max(south, viewport[1]);
  const maxX = Math.min(east, viewport[2]);
  const maxY = Math.min(north, viewport[3]);

  // Transform to tile coordinates, between 0..1
  const tMinX = (minX - west) / (east - west);
  const tMaxX = (maxX - west) / (east - west);
  const tMinY = (minY - north) / (south - north);
  const tMaxY = (maxY - north) / (south - north);

  return [tMinX, tMinY, tMaxX, tMaxY];
}

function getFeatureUniqueId(feature, uniqueIdProperty) {
  if (uniqueIdProperty in feature.properties) {
    return feature.properties[uniqueIdProperty];
  }

  if ('geoid' in feature.properties) {
    return feature.properties.geoid;
  }

  if ('id' in feature) {
    return feature.id;
  }

  return -1;
}

function addIntersectedFeaturesInTile({ map, tile, viewport, uniqueIdProperty }) {
  const viewportIntersection = bboxPolygon(prepareViewport(tile.bbox, viewport));

  for (const f of tile.data) {
    const uniqueId = getFeatureUniqueId(f, uniqueIdProperty);

    // Add if the feature was not previously intersected and intersects with the viewport
    if (!map.has(uniqueId) && intersects(f, viewportIntersection)) {
      map.set(uniqueId, f.properties);
    }
  }
}

function isTileFullVisible(bbox, viewport) {
  const [minX, maxX, maxY, minY] = viewport;
  return (
    bbox.west >= minX && bbox.east <= maxX && bbox.north <= maxY && bbox.south >= minY
  );
}

export function viewportFeatures({ tiles, viewport, uniqueIdProperty }) {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile
    if (!tile.isVisible || !tile.data) {
      continue;
    }

    const { bbox } = tile;
    tile.fullVisible = isTileFullVisible(bbox, viewport);

    if (tile.fullVisible) {
      // All the features of the tile are visible
      for (const f of tile.data) {
        const prop = f.properties;
        const uniqueId = getFeatureUniqueId(f, uniqueIdProperty);
        if (!map.has(uniqueId)) {
          map.set(uniqueId, prop);
        }
      }
    } else {
      addIntersectedFeaturesInTile({ map, tile, viewport, uniqueIdProperty });
    }
  }

  getWorker('testWorker').postMessage({});

  return Array.from(map.values());
}
