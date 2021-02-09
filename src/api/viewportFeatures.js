import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';

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

function addIntersectedFeaturesInTile({ map, tile, viewport, uniqueId }) {
  const viewportIntersection = bboxPolygon(prepareViewport(tile.bbox, viewport));

  for (const f of tile.data) {
    // Add if the feature was not previously intersected and intersects with the viewport
    if (!map.has(f.properties[uniqueId]) && intersects(f, viewportIntersection)) {
      map.set(f.properties[uniqueId], f.properties);
    }
  }
}

function isTileFullVisible(bbox, viewport) {
  const [minX, maxX, maxY, minY] = viewport;
  return (
    bbox.west >= minX && bbox.east <= maxX && bbox.north <= maxY && bbox.south >= minY
  );
}

export function viewportFeatures({ tiles, viewport, uniqueId }) {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile
    if (!tile.isVisible) {
      continue;
    }

    const { bbox } = tile;
    tile.fullVisible = isTileFullVisible(bbox, viewport);

    if (tile.fullVisible) {
      // All the features of the tile are visible
      for (const f of tile.data) {
        const prop = f.properties;
        if (!map.has(prop[uniqueId])) {
          map.set(prop[uniqueId], prop);
        }
      }
    } else {
      addIntersectedFeaturesInTile({ map, tile, viewport, uniqueId });
    }
  }

  return Array.from(map.values());
}
