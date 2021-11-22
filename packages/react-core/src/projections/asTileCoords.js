import { lngLatToWorld } from '@math.gl/web-mercator';

/**
 * Transform WGS84 coordinates to tile coords.
 * It's the inverse of deck.gl coordinate-transform (https://github.com/visgl/deck.gl/blob/master/modules/geo-layers/src/mvt-layer/coordinate-transform.js)
 * 
 * @param {object} geometry - any valid geojson geometry
 * @param {{ west: number, east: number, north: number, south: number }} bbox - tile bbox as used in deck.gl
 * @returns {GeoJSON}
 */
export default function asTileCoords(geometry, bbox) {
  const nw = projectFlat([bbox.west, bbox.north]);
  const se = projectFlat([bbox.east, bbox.south]);
  const projectedBbox = [nw, se];

  const transformFn = availableTransformations[geometry.type];
  if (!transformFn) {
    return geometry;
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
  const x = inverseLerp(nw[0], se[0], pointX);
  const y = inverseLerp(nw[1], se[1], pointY);

  return [x, y];
}

function getPoints(geometry, bbox) {
  return geometry.map((g) => Point(projectFlat(g), bbox));
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

function projectFlat(xyz) {
  return lngLatToWorld(xyz);
}

function inverseLerp(a, b, x) {
  return (x - a) / (b - a);
}
