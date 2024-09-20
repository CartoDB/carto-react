import { lerp } from '@math.gl/core';
import { lngLatToWorld, worldToLngLat } from '@math.gl/web-mercator';

/**
 * Transform WGS84 coordinates to tile coords.
 * It's the inverse of deck.gl coordinate-transform (https://github.com/visgl/deck.gl/blob/master/modules/geo-layers/src/mvt-layer/coordinate-transform.js)
 *
 * @param {object} geometry - any valid geojson geometry
 * @param {{ west: number, east: number, north: number, south: number }} bbox - tile bbox as used in deck.gl
 * @returns {GeoJSON}
 */
export default function transformTileCoordsToWGS84(geometry, bbox) {
  const nw = lngLatToWorld([bbox.west, bbox.north]);
  const se = lngLatToWorld([bbox.east, bbox.south]);
  const projectedBbox = [nw, se];

  const transformFn = availableTransformations[geometry.type];
  if (!transformFn) {
    throw new Error(`Unrecognized geometry type ${geometry.type}`);
  }

  return {
    ...geometry,
    coordinates: transformFn(geometry.coordinates, projectedBbox)
  };
}

const availableTransformations = {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon
};

function Point([pointX, pointY], [nw, se]) {
  const x = lerp(nw[0], se[0], pointX);
  const y = lerp(nw[1], se[1], pointY);

  return worldToLngLat([x, y]);
}

function getPoints(geometry, bbox) {
  return geometry.map((g) => Point(g, bbox));
}

function MultiPoint(multiPoint, bbox) {
  return getPoints(multiPoint, bbox);
}

function LineString(line, bbox) {
  return getPoints(line, bbox);
}

function MultiLineString(multiLineString, bbox) {
  return multiLineString.map((lineString) => LineString(lineString, bbox));
}

function Polygon(polygon, bbox) {
  return polygon.map((polygonRing) => getPoints(polygonRing, bbox));
}

function MultiPolygon(multiPolygon, bbox) {
  return multiPolygon.map((polygon) => Polygon(polygon, bbox));
}
