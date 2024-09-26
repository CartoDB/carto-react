import { geojsonToBinary } from '@loaders.gl/gis';
import { TILE_FORMATS, tileFeatures } from '../../src';
import * as transformToTileCoords from '../../src/utils/transformToTileCoords';
import * as transformTileCoordsToWGS84 from '../../src/utils/transformTileCoordsToWGS84';
import { GEOM_STORED_VALUE } from '../../src/filters/tileFeaturesGeometries';

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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      const expectedProperties = [
        { cartodb_id: 1, other_prop: 0 },
        { cartodb_id: 2, other_prop: 1 },
        { cartodb_id: 3, other_prop: 2 }
      ];

      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });

      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: linestrings[i].geometry
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });

      const expectedProperties = [
        { cartodb_id: 1, other_prop: 0 },
        { cartodb_id: 2, other_prop: 1 },
        { cartodb_id: 3, other_prop: 2 }
      ];

      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });

      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: {
            coordinates: multilinestrings[i].geometry.coordinates[0],
            type: 'LineString'
          }
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [
        { cartodb_id: 1, other_prop: 0 },
        { cartodb_id: 2, other_prop: 1 },
        { cartodb_id: 3, other_prop: 2 }
      ];

      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: polygons[i].geometry
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [
        { cartodb_id: 1, other_prop: 0 },
        { cartodb_id: 2, other_prop: 1 },
        { cartodb_id: 3, other_prop: 2 }
      ];

      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: {
            coordinates: multipolygons[i].geometry.coordinates[0],
            type: 'Polygon'
          }
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [{ cartodb_id: 1, other_prop: 1 }];
      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: points[i].geometry
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [{ cartodb_id: 1, other_prop: 1 }];
      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: linestrings[i].geometry
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [{ cartodb_id: 1, other_prop: 1 }];
      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: {
            coordinates: multilinestrings[i].geometry.coordinates[0],
            type: 'LineString'
          }
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [{ cartodb_id: 1, other_prop: 1 }];
      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: polygons[i].geometry
        }))
      );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id'
      });
      const expectedProperties = [{ cartodb_id: 1, other_prop: 1 }];
      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'cartodb_id',
        options: { storeGeometry: true }
      });
      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: {
            coordinates: multipolygons[i].geometry.coordinates[0],
            type: 'Polygon'
          }
        }))
      );
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

        let properties = tileFeatures({
          tiles: mockedTiles,
          viewport,
          uniqueIdProperty: undefined
        });

        const expectedProperties = [
          { other_prop: 0 },
          { other_prop: 1 },
          { other_prop: 2 }
        ];
        expect(properties).toEqual(expectedProperties);

        properties = tileFeatures({
          tiles: mockedTiles,
          viewport,
          uniqueIdProperty: undefined,
          options: { storeGeometry: true }
        });
        expect(properties).toEqual(
          expectedProperties.map((expected, i) => ({
            ...expected,
            [GEOM_STORED_VALUE]: linestrings[i].geometry
          }))
        );
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

        let properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        const expectedProperties = [
          { cartodb_id: 1, other_prop: 0 },
          { cartodb_id: 2, other_prop: 1 },
          { cartodb_id: 3, other_prop: 2 }
        ];
        expect(properties).toEqual(expectedProperties);

        properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined,
          options: { storeGeometry: true }
        });
        expect(properties).toEqual(
          expectedProperties.map((expected, i) => ({
            ...expected,
            [GEOM_STORED_VALUE]: points[i].geometry
          }))
        );
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

        let properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        const expectedProperties = [
          { geoid: '1', other_prop: 0 },
          { geoid: '2', other_prop: 1 },
          { geoid: '3', other_prop: 2 }
        ];
        expect(properties).toEqual(expectedProperties);

        properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined,
          options: { storeGeometry: true }
        });
        expect(properties).toEqual(
          expectedProperties.map((expected, i) => ({
            ...expected,
            [GEOM_STORED_VALUE]: points[i].geometry
          }))
        );
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

        let properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined
        });
        const expectedProperties = [
          { other_prop: 0 },
          { other_prop: 1 },
          { other_prop: 2 }
        ];
        expect(properties).toEqual(expectedProperties);

        properties = tileFeatures({
          tiles: mockedTile,
          viewport,
          uniqueIdProperty: undefined,
          options: { storeGeometry: true }
        });
        expect(properties).toEqual(
          expectedProperties.map((expected, i) => ({
            ...expected,
            [GEOM_STORED_VALUE]: points[i].geometry
          }))
        );
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

      let properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'user_id'
      });
      const expectedProperties = [
        { user_id: 1, other_prop: 0 },
        { user_id: 2, other_prop: 1 },
        { user_id: 3, other_prop: 2 }
      ];

      expect(properties).toEqual(expectedProperties);

      properties = tileFeatures({
        tiles: mockedTile,
        viewport,
        uniqueIdProperty: 'user_id',
        options: { storeGeometry: true }
      });

      expect(properties).toEqual(
        expectedProperties.map((expected, i) => ({
          ...expected,
          [GEOM_STORED_VALUE]: points[i].geometry
        }))
      );
    });
  });

  describe('Different tile formats', () => {
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

    test('transformToTileCoords should only be called if format is mvt', () => {
      const transformToTileCoordsSpy = jest.spyOn(transformToTileCoords, 'default');

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
    test('transformTileCoordsToWGS84 should only be called if format is mvt and storeGeometry option is true', () => {
      const transformTileCoordsToWGS84Spy = jest.spyOn(
        transformTileCoordsToWGS84,
        'default'
      );

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.GEOJSON,
        options: { storeGeometry: true }
      });
      expect(transformTileCoordsToWGS84Spy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.BINARY,
        options: { storeGeometry: true }
      });
      expect(transformTileCoordsToWGS84Spy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.MVT
      });
      expect(transformTileCoordsToWGS84Spy).toHaveBeenCalledTimes(0);

      tileFeatures({
        tiles: mockedTile,
        viewport,
        tileFormat: TILE_FORMATS.MVT,
        options: { storeGeometry: true }
      });
      expect(transformTileCoordsToWGS84Spy).toHaveBeenCalled();

      transformTileCoordsToWGS84Spy.mockRestore();
    });
  });
});
