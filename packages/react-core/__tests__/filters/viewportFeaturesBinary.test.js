import { geojsonToBinary } from '@loaders.gl/gis';
import { viewportFeaturesBinary } from '../../';

describe('viewport features with binary mode', () => {
  const viewport = [-10, -10, 10, 10]; // west - south - east - north

  describe('returns no data', () => {
    test('tiles are not visible', () => {
      const mockedTiles = [...Array(10)].map(() => ({ isVisible: false }));

      const properties = viewportFeaturesBinary({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('tiles has no data', () => {
      const mockedTiles = [{ data: null }, { data: undefined }];

      const properties = viewportFeaturesBinary({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('a tile is visibile but has no data', () => {
      const mockedTiles = [{ isVisible: true, data: null }];

      const properties = viewportFeaturesBinary({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('a tile has data but is not visibile', () => {
      const mockedTiles = [{ isVisible: false, data: [{}] }];

      const properties = viewportFeaturesBinary({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });
  });

  describe('correctly returns data', () => {
    const [west, south, east, north] = viewport;
    const movedViewport = [-11, viewport[1], 9, viewport[3]]; // Moving viewport to the left 1 degree

    describe('should handle points correctly', () => {
      const points = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [i, i]
        },
        properties: {
          a: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(points),
          bbox: { west, east, north, south }
        }
      ];

      test('tile is completely in viewport', () => {
        const properties = viewportFeaturesBinary({ tiles: mockedTile, viewport });
        expect(properties).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const properties = viewportFeaturesBinary({
          tiles: mockedTile,
          viewport: movedViewport
        });
        expect(properties).toEqual([{ a: 0 }]);
      });
    });

    describe('should handle linestrings correctly', () => {
      const linestrings = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          // prettier-ignore
          coordinates: [[i, i], [i, i + 1], [i, i + 2]]
        },
        properties: {
          a: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(linestrings),
          bbox: { west, east, north, south }
        }
      ];

      test('tile is completely in viewport', () => {
        const properties = viewportFeaturesBinary({ tiles: mockedTile, viewport });
        expect(properties).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const properties = viewportFeaturesBinary({
          tiles: mockedTile,
          viewport: movedViewport
        });
        expect(properties).toEqual([{ a: 0 }]);
      });
    });

    describe('should handle multilinestrings correctly', () => {
      const multilinestrings = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          // prettier-ignore
          coordinates: [[[i, i], [i + 1, i + 1]], [[i + 2, i + 2], [i + 3, i + 3]]]
        },
        properties: {
          a: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multilinestrings),
          bbox: { west, east, north, south }
        }
      ];

      test('tile is completely in viewport', () => {
        const properties = viewportFeaturesBinary({ tiles: mockedTile, viewport });
        expect(properties).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const properties = viewportFeaturesBinary({
          tiles: mockedTile,
          viewport: movedViewport
        });
        expect(properties).toEqual([{ a: 0 }]);
      });
    });

    describe('should handle polygons correctly', () => {
      const polygons = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          // prettier-ignore
          coordinates: [[[i, i], [i + 1, i], [i + 1, i + 1], [i, i + 1], [i, i]]]
        },
        properties: {
          a: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(polygons),
          bbox: { west, east, north, south }
        }
      ];

      test('tile is completely in viewport', () => {
        const properties = viewportFeaturesBinary({ tiles: mockedTile, viewport });
        expect(properties).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const properties = viewportFeaturesBinary({
          tiles: mockedTile,
          viewport: movedViewport
        });
        expect(properties).toEqual([{ a: 0 }]);
      });
    });

    describe('should handle multilipolygons correctly', () => {
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
          a: i
        }
      }));

      const mockedTile = [
        {
          isVisible: true,
          data: geojsonToBinary(multipolygons),
          bbox: { west, east, north, south }
        }
      ];

      test('tile is completely in viewport', () => {
        const properties = viewportFeaturesBinary({ tiles: mockedTile, viewport });
        expect(properties).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const properties = viewportFeaturesBinary({
          tiles: mockedTile,
          viewport: movedViewport
        });
        expect(properties).toEqual([{ a: 0 }]);
      });
    });
  });
});
