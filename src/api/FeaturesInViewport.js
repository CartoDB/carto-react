import bboxPolygon from "@turf/bbox-polygon";
import intersect from "@turf/intersect";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const GEOMETRY_TYPES = Object.freeze({
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon
});

function intersects(geometry, viewport) {
  return Boolean(intersect(geometry, viewport));
}

function Point(point, viewportBbox) {
  return booleanPointInPolygon(point, viewportBbox);
}

function getPoints(geometry, viewport) {
  return geometry.map(g => Point(g, viewport));
}

function MultiPoint(points, viewport) {
  return getPoints(points, viewport);
}

function LineString(line, viewport) {
  return intersects(line, viewport);
}

function MultiLineString(multiLineString, viewport) {
  return intersects(multiLineString, viewport);
}

function Polygon(polygon, viewport) {
  return intersects(polygon, viewport);
}

function MultiPolygon(multiPolygon, viewport) {
  return intersects(multiPolygon, viewport);
}

export function featuresInViewport(features, viewport) {
  const viewportBbox = bboxPolygon(viewport.getBounds());

  return features.filter(feat => {
    return GEOMETRY_TYPES[feat.geometry.type](feat, viewportBbox);
  });
}
