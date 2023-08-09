import bboxClip from '@turf/bbox-clip';
import bboxPolygon from '@turf/bbox-polygon';
import union from '@turf/union';
import { getType } from '@turf/invariant';
import { polygon, multiPolygon } from '@turf/helpers';

/**
 * Select the geometry to use for widget calculation and data filtering.
 * If a spatial filter (mask) is set, use the mask otherwise use the current viewport.
 * Since it's possible that no mask and no viewport is set, return null in this case.
 *
 * @typedef { import('geojson').Polygon | import('geojson').MultiPolygon } Geometry
 * @typedef { import('../types').Viewport? } Viewport
 *
 * @param { Viewport? } viewport viewport [minX, minY, maxX, maxY], if any
 * @param { Geometry? } geometry the active spatial filter (mask), if any
 * @returns { Geometry? } the geometry to use for filtering
 */
export function getGeometryToIntersect(viewport, geometry) {
  // TODO: Searching the error
  return geometry && geometry.coordinates
    ? geometry
    : Array.isArray(viewport) && viewport.length === 4
    ? bboxPolygon(viewport).geometry
    : null;
}

/**
 * Check if a viewport is large enough to represent a global coverage.
 * In this case the spatial filter parameter for widget calculation is removed.
 *
 * @param { import('../types').Viewport? } viewport
 * @returns { boolean }
 */
export function isGlobalViewport(viewport) {
  if (viewport) {
    const [minx, miny, maxx, maxy] = viewport;
    return maxx - minx > 179.5 * 2 && maxy - miny > 85.05 * 2;
  }
  return false;
}

function cleanPolygonCoords(cc) {
  const coords = cc.filter((c) => c.length > 0);
  return coords.length > 0 ? coords : null;
}

function cleanMultiPolygonCoords(ccc) {
  const coords = ccc.map(cleanPolygonCoords).filter((cc) => cc);
  return coords.length > 0 ? coords : null;
}

function clean(geometry) {
  if (!geometry) {
    return null;
  } else if (getType(geometry) === 'Polygon') {
    const coords = cleanPolygonCoords(geometry.coordinates);
    return coords ? polygon(coords).geometry : null;
  } else if (getType(geometry) === 'MultiPolygon') {
    const coords = cleanMultiPolygonCoords(geometry.coordinates);
    return coords ? multiPolygon(coords).geometry : null;
  } else {
    return null;
  }
}

function txContourCoords(cc, distance) {
  return cc.map((c) => [c[0] + distance, c[1]]);
}

function txPolygonCoords(ccc, distance) {
  return ccc.map((cc) => txContourCoords(cc, distance));
}

function txMultiPolygonCoords(cccc, distance) {
  return cccc.map((ccc) => txPolygonCoords(ccc, distance));
}

function tx(geometry, distance) {
  if (geometry && getType(geometry) === 'Polygon') {
    const coords = txPolygonCoords(geometry.coordinates, distance);
    return polygon(coords).geometry;
  } else if (geometry && getType(geometry) === 'MultiPolygon') {
    const coords = txMultiPolygonCoords(geometry.coordinates, distance);
    return multiPolygon(coords).geometry;
  } else {
    return null;
  }
}

/**
 * Normalized a geometry, coming from a mask or a viewport. The parts
 * spanning outside longitude range [-180, +180] are clipped and "folded"
 * back to the valid range and unioned to the polygons inide that range.
 *
 * It results in a Polygon or MultiPolygon strictly inside the validity range.
 *
 * @param {Geometry?} geometry
 * @returns {Geometry?}
 */
export function normalizeGeometry(geometry) {
  let result = null;

  if (geometry) {
    const WORLD = [-180, -90, +180, +90];
    const worldClip = clean(bboxClip(geometry, WORLD).geometry);

    const geometryTxWest = tx(geometry, 360);
    const geometryTxEast = tx(geometry, -360);

    result = worldClip;

    if (result && geometryTxWest) {
      const worldWestClip = clean(bboxClip(geometryTxWest, WORLD).geometry);
      if (worldWestClip) {
        result = clean(union(result, worldWestClip)?.geometry);
      }
    }

    if (result && geometryTxEast) {
      const worldEastClip = clean(bboxClip(geometryTxEast, WORLD).geometry);
      if (worldEastClip) {
        result = clean(union(result, worldEastClip)?.geometry);
      }
    }
  }

  return result;
}
