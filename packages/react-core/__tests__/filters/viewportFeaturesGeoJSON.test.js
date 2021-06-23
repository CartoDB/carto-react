import { viewportFeaturesGeoJSON } from '../../src/filters/viewportFeaturesGeoJSON';

describe('viewport features with geojson data', () => {
  const viewport = [-10, -10, 10, 10]; // west - south - east - north

  describe('return no data', () => {
    test('should return an empty array if no geojson features present', () => {
      const geojson = {
        type: 'FeatureCollection',
        features: []
      };

      const properties = viewportFeaturesGeoJSON({
        geojson,
        viewport
      });

      expect(properties).toEqual([]);
    });
  });

  describe('correctly returns data', () => {
    test('should handle linestrings correctly fwsf', () => {
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

      const properties = viewportFeaturesGeoJSON({
        geojson: linestrings,
        viewport,
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

      const properties = viewportFeaturesGeoJSON({
        geojson: multilinestrings,
        viewport,
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

      const properties = viewportFeaturesGeoJSON({
        geojson: polygons,
        viewport,
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

      const properties = viewportFeaturesGeoJSON({
        geojson: multipolygons,
        viewport,
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

      const properties = viewportFeaturesGeoJSON({
        geojson: points,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle linestrings correctly', () => {
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

      const properties = viewportFeaturesGeoJSON({
        geojson: linestrings,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle multilinestrings correctly', () => {
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

      const properties = viewportFeaturesGeoJSON({
        geojson: multilinestrings,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle polygons correctly', () => {
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

      const properties = viewportFeaturesGeoJSON({
        geojson: polygons,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('should handle multipolygons correctly', () => {
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

      const properties = viewportFeaturesGeoJSON({
        geojson: multipolygons,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });
  });
});
