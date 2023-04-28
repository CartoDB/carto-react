import { TILE_FORMATS } from '@deck.gl/carto';
import { geojsonToBinary } from '@loaders.gl/gis';
import { tileFeatures } from '../../src';
import * as transformToTileCoords from '../../src/utils/transformToTileCoords';
import { getGeometryToIntersect } from '../../src/filters/tileFeatures';
import bboxPolygon from '@turf/bbox-polygon';

/** @type { import('../../src').Viewport } */
const viewport = [-10, -10, 10, 10]; // west - south - east - north
const viewportGeometry = bboxPolygon(viewport).geometry;

/** @type { import('geojson').Polygon } */
const filterGeometry = {
  type: 'Polygon',
  coordinates: [
    [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1]
    ]
  ]
};
/** @type { import('geojson').Feature<import('geojson').Polygon> } */
const filterFeature = {
  type: 'Feature',
  geometry: filterGeometry,
  properties: {}
};

describe('getGeometryToIntersect', () => {
  test('returns null in case no viewport or geometry is present', () => {
    expect(getGeometryToIntersect(null, null)).toStrictEqual(null);
    expect(getGeometryToIntersect([], null)).toStrictEqual(null);
    expect(getGeometryToIntersect(null, {})).toStrictEqual(null);
    expect(getGeometryToIntersect([], {})).toStrictEqual(null);
  });

  test('returns the viewport as geometry', () => {
    expect(getGeometryToIntersect(viewport, null)).toStrictEqual(viewportGeometry);
  });

  test('returns the filter as geometry', () => {
    expect(getGeometryToIntersect(null, filterFeature)).toStrictEqual(filterGeometry);
    expect(getGeometryToIntersect(viewport, filterFeature)).toStrictEqual(filterGeometry);
  });
});

describe('viewport features with binary mode', () => {
  const [west, south, east, north] = viewport;
  const tileFormat = TILE_FORMATS.BINARY;

  describe('return no data', () => {
    test('tiles are not visible', () => {
      const mockedTiles = [...Array(10)].map(() => ({ isVisible: false }));

      const properties = tileFeatures({
        tiles: mockedTiles,
        geometryToIntersect: viewportGeometry,
        tileFormat
      });
      expect(properties).toEqual([]);
    });

    test('tiles have no data', () => {
      const mockedTiles = [{ data: null }, { data: undefined }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        geometryToIntersect: viewportGeometry,
        tileFormat
      });
      expect(properties).toEqual([]);
    });

    test('a tile is visible but it has no data', () => {
      const mockedTiles = [{ isVisible: true, data: null }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        geometryToIntersect: viewportGeometry,
        tileFormat
      });
      expect(properties).toEqual([]);
    });

    test('a tile has data but is not visibile', () => {
      const mockedTiles = [{ isVisible: false, data: [{}] }];

      const properties = tileFeatures({
        tiles: mockedTiles,
        geometryToIntersect: viewportGeometry,
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'cartodb_id',
        tileFormat
      });
      expect(properties).toEqual([{ cartodb_id: 1, other_prop: 1 }]);
    });
  });

  describe('uniqueIdProperty is undefined', () => {
    describe('tiles provide unique id field', () => {
      test('linestrings', () => {
        const linestrings = [...Array(3)].map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            // prettier-ignore
            coordinates: [[0, 0], [0, 1], [1, 2]]
          },
          properties: {
            other_prop: i
          }
        }));

        // Two tiles, linestrings[0] is present in both
        const binaryData1 = geojsonToBinary([linestrings[0], linestrings[1]]);
        // @ts-ignore
        binaryData1.lines.fields = [{ id: 100 }, { id: 101 }];

        const binaryData2 = geojsonToBinary([linestrings[0], linestrings[2]]);
        // @ts-ignore
        binaryData2.lines.fields = [{ id: 100 }, { id: 102 }];

        const mockedTiles = [
          {
            isVisible: true,
            data: binaryData1,
            bbox: { west, east, north, south }
          },
          {
            isVisible: true,
            data: binaryData2,
            bbox: { west, east, north, south }
          }
        ];

        const properties = tileFeatures({
          tiles: mockedTiles,
          geometryToIntersect: viewportGeometry,
          uniqueIdProperty: undefined,
          tileFormat
        });

        // prettier-ignore
        expect(properties).toEqual([
          { 'other_prop': 0 },
          { 'other_prop': 1 },
          { 'other_prop': 2 }
        ]);
      });
    });

    describe('features have cartodb_id field', () => {
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
          geometryToIntersect: viewportGeometry,
          uniqueIdProperty: undefined,
          tileFormat
        });
        // prettier-ignore
        expect(properties).toEqual([
          { 'cartodb_id': 1, 'other_prop': 0 },
          { 'cartodb_id': 2, 'other_prop': 1 },
          { 'cartodb_id': 3, 'other_prop': 2 }
        ]);
      });
    });

    describe('features have geoid field', () => {
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
          geometryToIntersect: viewportGeometry,
          uniqueIdProperty: undefined,
          tileFormat
        });
        // prettier-ignore
        expect(properties).toEqual([
          { 'geoid': '1', 'other_prop': 0 },
          { 'geoid': '2', 'other_prop': 1 },
          { 'geoid': '3', 'other_prop': 2 }
        ]);
      });
    });

    describe('no explicit id field', () => {
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
          geometryToIntersect: viewportGeometry,
          uniqueIdProperty: undefined,
          tileFormat
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
        geometryToIntersect: viewportGeometry,
        uniqueIdProperty: 'user_id',
        tileFormat
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
        geometryToIntersect: viewportGeometry,
        tileFormat: TILE_FORMATS.GEOJSON
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        geometryToIntersect: viewportGeometry,
        tileFormat: TILE_FORMATS.BINARY
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        geometryToIntersect: viewportGeometry,
        tileFormat: TILE_FORMATS.MVT
      });
      expect(transformToTileCoordsSpy).toHaveBeenCalledTimes(1);

      transformToTileCoordsSpy.mockRestore();
    });
  });
});
