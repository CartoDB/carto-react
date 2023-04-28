import bboxPolygon from '@turf/bbox-polygon';
import { geojsonFeatures } from '../../src/filters/geojsonFeatures';

describe('viewport features with geojson data', () => {
  /** @type { import('../../src').Viewport } */
  const viewport = [-10, -10, 10, 10]; // west - south - east - north
  const viewportGeometry = bboxPolygon(viewport).geometry;

  describe('return no data', () => {
    test('should return an empty array if no geojson features present', () => {
      /** @type { import('geojson').FeatureCollection } */
      const geojson = {
        type: 'FeatureCollection',
        features: []
      };

      const properties = geojsonFeatures({
        geojson,
        geometryToIntersect: viewportGeometry
      });

      expect(properties).toEqual([]);
    });
  });

  describe('correctly returns data', () => {
    test('should handle linestrings correctly fwsf', () => {
      /** @type { import('geojson').FeatureCollection } */
      const linestrings = {
        type: 'FeatureCollection',
        features: [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            // prettier-ignore
            coordinates: [0, 0]
          },
          properties: {
            cartodb_id: i + 1,
            other_prop: i
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: linestrings,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      // prettier-ignore
      expect(properties).toEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 },
      ]);
    });

    test('should handle multilinestrings correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const multilinestrings = {
        type: 'FeatureCollection',
        features: [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            // prettier-ignore
            coordinates: [[[i, i], [i + 1, i + 1]], [[i + 2, i + 2], [i + 3, i + 3]]]
          },
          properties: {
            cartodb_id: i + 1,
            other_prop: i
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: multilinestrings,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      // prettier-ignore
      expect(properties).toStrictEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });

    test('should handle polygons correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const polygons = {
        type: 'FeatureCollection',
        features: [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            // prettier-ignore
            coordinates: [[[i, i], [i + 1, i], [i + 1, i + 1], [i, i + 1], [i, i]]]
          },
          properties: {
            cartodb_id: i + 1,
            other_prop: i
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: polygons,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      // prettier-ignore
      expect(properties).toStrictEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });

    test('should handle multilipolygons correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const multipolygons = {
        type: 'FeatureCollection',
        features: [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            // prettier-ignore
            coordinates: [
              [[[i, i], [i + 1, i], [i + 1, i + 1], [i, i + 1], [i, i]]],
              [[[i + 1, i + 1], [i + 2, i + 1], [i + 2, i + 2], [i + 1, i + 2], [i + 1, i + 1]]]
            ]
          },
          properties: {
            cartodb_id: i + 1,
            other_prop: i
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: multipolygons,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      // prettier-ignore
      expect(properties).toStrictEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });
  });

  describe('with repeated features', () => {
    test('should handle points correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const points = {
        type: 'FeatureCollection',
        features: [...Array(4)].map(() => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          },
          properties: {
            cartodb_id: 1,
            other_prop: 1
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: points,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle linestrings correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const linestrings = {
        type: 'FeatureCollection',
        features: [...Array(4)].map(() => ({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            // prettier-ignore
            coordinates: [[0, 0], [0, 1], [1, 2]]
          },
          properties: {
            cartodb_id: 1,
            other_prop: 1
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: linestrings,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle multilinestrings correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const multilinestrings = {
        type: 'FeatureCollection',
        features: [...Array(4)].map(() => ({
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            // prettier-ignore
            coordinates: [[[0, 0], [1, 1]], [[2, 2], [3, 3]]]
          },
          properties: {
            cartodb_id: 1,
            other_prop: 1
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: multilinestrings,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle polygons correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const polygons = {
        type: 'FeatureCollection',
        features: [...Array(4)].map(() => ({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            // prettier-ignore
            coordinates: [[[0, 0], [1, 0], [1, 1], [0, 2], [0, 0]]]
          },
          properties: {
            cartodb_id: 1,
            other_prop: 1
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: polygons,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle multipolygons correctly', () => {
      /** @type { import('geojson').FeatureCollection } */
      const multipolygons = {
        type: 'FeatureCollection',
        features: [...Array(4)].map(() => ({
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            // prettier-ignore
            coordinates: [
              [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]],
              [[[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]
            ]
          },
          properties: {
            cartodb_id: 1,
            other_prop: 1
          }
        }))
      };

      const properties = geojsonFeatures({
        geojson: multipolygons,
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });
  });
});
