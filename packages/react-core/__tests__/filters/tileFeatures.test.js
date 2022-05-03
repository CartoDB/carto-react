import { TILE_FORMATS } from '@deck.gl/carto';
import { geojsonToBinary } from '@loaders.gl/gis';
import { tileFeatures } from '../../src';
import * as transformToTileCoords from '../../src/utils/transformToTileCoords';

describe('viewport features with binary mode', () => {
  const viewport = [-10, -10, 10, 10]; // west - south - east - north
  const [west, south, east, north] = viewport;

  describe('return no data', () => {
    test('tiles are not visible', () => {
      const mockedTiles = [...Array(10)].map(() => ({ isVisible: false }));

      const properties = tileFeatures({
        tiles: mockedTiles,
        viewport
      });
      expect(properties).toEqual([]);
    });

    test('tiles have no data', () => {
      const mockedTiles = [{ data: null }, { data: undefined }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        viewport
      });
      expect(properties).toEqual([]);
    });

    test('a tile is visible but it has no data', () => {
      const mockedTiles = [{ isVisible: true, data: null }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        viewport
      });
      expect(properties).toEqual([]);
    });

    test('a tile has data but is not visibile', () => {
      const mockedTiles = [{ isVisible: false, data: [{}] }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        viewport
      });
      expect(properties).toEqual([]);
    });
  });

  describe('correctly returns data', () => {
    test('should handle linestrings correctly', () => {
      const linestrings = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          // prettier-ignore
          coordinates: [[i, i], [i, i + 1], [i, i + 2]]
        },
        properties: {
          cartodb_id: i + 1,
          other_prop: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(linestrings),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      // prettier-ignore
      expect(properties).toEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });

    test('should handle multilinestrings correctly', () => {
      const multilinestrings = [...Array(3)].map((_, i) => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multilinestrings),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      // prettier-ignore
      expect(properties).toEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });

    test('should handle polygons correctly', () => {
      const polygons = [...Array(3)].map((_, i) => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(polygons),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      // prettier-ignore
      expect(properties).toEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });

    test('should handle multilipolygons correctly', () => {
      const multipolygons = [...Array(3)].map((_, i) => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multipolygons),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      // prettier-ignore
      expect(properties).toEqual([
        { 'cartodb_id': 1, 'other_prop': 0 },
        { 'cartodb_id': 2, 'other_prop': 1 },
        { 'cartodb_id': 3, 'other_prop': 2 }
      ]);
    });
  });

  describe('with repeated features', () => {
    test('points', () => {
      const points = [...Array(4)].map(() => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        properties: {
          cartodb_id: 1,
          other_prop: 1
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(points),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('linestrings', () => {
      const linestrings = [...Array(4)].map(() => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(linestrings),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('multilinestrings', () => {
      const multilinestrings = [...Array(4)].map(() => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multilinestrings),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('polygons', () => {
      const polygons = [...Array(4)].map(() => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(polygons),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });

    test('multipolygons', () => {
      const multipolygons = [...Array(4)].map(() => ({
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
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multipolygons),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });
  });

  describe('uniqueIdProperty is undefined', () => {
    describe('dataset has cartodb_id field', () => {
      test('points', () => {
        const points = [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [i, i]
          },
          properties: {
            cartodb_id: i + 1,
            other_prop: i
          }
        }));

        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(points),
            bbox: { west, east, north, south }
          }
        ];

        const properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        // prettier-ignore
        expect(properties).toEqual([
          { 'cartodb_id': 1, 'other_prop': 0 },
          { 'cartodb_id': 2, 'other_prop': 1 },
          { 'cartodb_id': 3, 'other_prop': 2 }
        ]);
      });
    });

    describe('dataset has geoid field', () => {
      test('points', () => {
        const points = [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [i, i]
          },
          properties: {
            geoid: String(i + 1), // Because geoid from DO datasets is a string
            other_prop: i
          }
        }));

        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(points),
            bbox: { west, east, north, south }
          }
        ];

        const properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        // prettier-ignore
        expect(properties).toEqual([
          { 'geoid': '1', 'other_prop': 0 },
          { 'geoid': '2', 'other_prop': 1 },
          { 'geoid': '3', 'other_prop': 2 }
        ]);
      });
    });

    describe('dataset has no cartodb_id or geoid fields', () => {
      test('points', () => {
        const points = [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [i, i]
          },
          properties: {
            other_prop: i
          }
        }));

        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(points),
            bbox: { west, east, north, south }
          }
        ];

        const properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        // prettier-ignore
        expect(properties).toEqual([
          { 'other_prop': 0 },
          { 'other_prop': 1 },
          { 'other_prop': 2 }
        ]);
      });
    });
  });

  describe('uniqueIdProperty is defined', () => {
    test('points', () => {
      const points = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [i, i]
        },
        properties: {
          user_id: i + 1,
          other_prop: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(points),
          bbox: { west, east, north, south }
        }
      ];

      const properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'user_id'
      });
      // prettier-ignore
      expect(properties).toEqual([
        { 'user_id': 1, 'other_prop': 0 },
        { 'user_id': 2, 'other_prop': 1 },
        { 'user_id': 3, 'other_prop': 2 }
      ]);
    });
  });

  describe('Different tile formats', () => {
    test('transformToTileCoords should only be called if format is mvt', () => {
      const transformToTileCoordsSpy = jest.spyOn(transformToTileCoords, 'default');

      const points = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [i, i]
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(points),
          bbox: { west, east, north, south }
        }
      ];

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.BINARY
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.MVT
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(1);

      transformToTileCoordsSpy.mockRestore();
    });
  });
});
