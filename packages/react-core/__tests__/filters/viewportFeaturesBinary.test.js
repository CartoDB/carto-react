import { geojsonToBinary } from '@loaders.gl/gis';
import { viewportFeatures } from '../../src/filters/viewportFeaturesBinary';

describe('viewport features with binary mode', () => {
  const viewport = [-10, -10, 10, 10];

  describe('returns no data', () => {
    test('tiles are not visible', () => {
      const mockedTiles = [...Array(10)].map(() => ({ isVisible: false }));

      const properties = viewportFeatures({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('tiles has no data', () => {
      const mockedTiles = [{ data: null }, { data: undefined }];

      const properties = viewportFeatures({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('a tiles is visibile but has no data', () => {
      const mockedTiles = [{ isVisible: true, data: null }];

      const properties = viewportFeatures({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });

    test('a tiles has data but is not visibile', () => {
      const mockedTiles = [{ isVisible: false, data: [{}] }];

      const properties = viewportFeatures({ tiles: mockedTiles, viewport });
      expect(properties).toEqual([]);
    });
  });

  describe('correctly returns data', () => {
    const [west, south, east, north] = viewport;

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

      test('tile is completely in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(points),
            bbox: { west, east, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 0 }, { a: 1 }]);
      });

      test('tile is partially in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(points),
            // Moving tile to the left 1 degree
            bbox: { west: west - 1, east: east - 1, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 1 }]);
      });
    });

    describe('should handle linestrings correctly', () => {
      const linestrings = [...Array(3)].map((_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [i, i],
            [i, i + 1],
            [i, i + 2]
          ]
        },
        properties: {
          a: i
        }
      }));

      test('tile is completely in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(linestrings),
            bbox: { west, east, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(linestrings),
            // Moving tile to the left 1 degree
            bbox: { west: west - 1, east: east - 1, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 1 }]);
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

      test('tile is completely in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(polygons),
            bbox: { west, east, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 0 }, { a: 1 }, { a: 2 }]);
      });

      test('tile is partially in viewport', () => {
        const mockedTile = [
          {
            isVisible: true,
            data: geojsonToBinary(polygons),
            bbox: { west: west - 1, east: east - 1, north, south }
          }
        ];

        const func = viewportFeatures({ tiles: mockedTile, viewport });
        expect(func).toEqual([{ a: 0 }, { a: 1 }]);
      });
    });
  });
});
