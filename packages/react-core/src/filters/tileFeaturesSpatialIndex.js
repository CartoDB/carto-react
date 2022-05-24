import { indexes } from '@mapbox/tile-cover';
// h3-js has a known problem that does not allow us to use it in a web-worker. To solve
// it we're overwriting the node_module package after install it (check postinstall script in package.json)
// To know more about the h3-js issue check https://github.com/uber/h3-js/issues/117
import { h3GetResolution, polyfill } from 'h3-js';
import { SpatialIndex } from '../operations/constants/SpatialIndexTypes';

export default function tileFeaturesSpatialIndex({
  tiles,
  geometryToIntersect,
  spatialIndex
}) {
  const map = new Map();
  const resolution = getResolution(tiles, spatialIndex);

  if (!resolution) {
    return [];
  }
  const cells = getCellsCoverGeometry(
    geometryToIntersect.geometry,
    spatialIndex,
    resolution
  );

  if (!cells?.length) {
    return [];
  }
  // We transform cells to object to improve the performace
  const cellsDictionary = cells.reduce((prev, current) => {
    prev[current] = {};
    return prev;
  }, {});

  for (const tile of tiles) {
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    tile.data.forEach((d) => {
      if (cellsDictionary[d.id]) {
        map.set(d.id, d.properties);
      }
    });
  }
  return Array.from(map.values());
}

function getResolution(tiles, spatialIndex) {
  const data = tiles.find((tile) => tile.data?.length)?.data;

  if (!data) {
    return;
  }

  if (spatialIndex === SpatialIndex.QUADINT || spatialIndex === SpatialIndex.QUADKEY) {
    return data[0].id.length;
  }

  if (spatialIndex === SpatialIndex.H3) {
    return h3GetResolution(data[0].id);
  }
}

function getCellsCoverGeometry(geometry, spatialIndex, resolution) {
  if (spatialIndex === SpatialIndex.QUADINT || spatialIndex === SpatialIndex.QUADKEY) {
    return indexes(geometry, {
      min_zoom: resolution,
      max_zoom: resolution
    });
  }

  if (spatialIndex === SpatialIndex.H3) {
    return polyfill(geometry.coordinates, resolution, true);
  }
}
