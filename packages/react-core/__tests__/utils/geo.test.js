import bboxPolygon from '@turf/bbox-polygon';
import {
  isGlobalViewport,
  getGeometryToIntersect,
  normalizeGeometry
} from '../../src/utils/geo';
import { polygon, multiPolygon } from '@turf/helpers';

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

describe('isGlobalViewport', () => {
  const normalViewports = [
    { v: null },
    { v: viewport },
    {
      v: [-344.2596303029739, -75.05112877980663, 230.26452782294038, 75.05112877980655]
    },
    { v: [-125.2596303029739, -85.05112877980663, 230.26452782294038, 85.05112877980655] }
  ];
  const globalViewports = [
    { v: [-344.2596303029739, -85.05112877980663, 230.26452782294038, 85.05112877980655] }
  ];

  test.each(normalViewports)('return false for normal viewports', ({ v }) => {
    expect(!isGlobalViewport(v));
  });

  test.each(globalViewports)('return true for global viewports', ({ v }) => {
    expect(isGlobalViewport(v));
  });
});

describe('getGeometryToIntersect', () => {
  test('returns null in case no or invalid viewport or geometry is present', () => {
    expect(getGeometryToIntersect(null, null)).toStrictEqual(null);
    expect(getGeometryToIntersect([], null)).toStrictEqual(null);
    expect(getGeometryToIntersect(null, {})).toStrictEqual(null);
    expect(getGeometryToIntersect([], {})).toStrictEqual(null);
  });

  test('returns the viewport as geometry', () => {
    expect(getGeometryToIntersect(viewport, null)).toStrictEqual(viewportGeometry);
  });

  test('returns the filter as geometry', () => {
    expect(getGeometryToIntersect(null, filterGeometry)).toStrictEqual(filterGeometry);
    expect(getGeometryToIntersect(viewport, filterGeometry)).toStrictEqual(
      filterGeometry
    );
  });
});

describe('normalizeGeometry', () => {
  test('does not clip when not needed', () => {
    const input = polygon([
      [
        [-90, 0],
        [0, -45],
        [90, 0],
        [0, 45],
        [-90, 0]
      ]
    ]).geometry;
    const expected = input;
    expect(normalizeGeometry(input)).toStrictEqual(expected);
  });

  test('it produces multipolygons wrapping from the west', () => {
    const input = multiPolygon([
      [
        [
          [-90, 0],
          [0, -45],
          [90, 0],
          [0, 45],
          [-90, 0]
        ]
      ],
      [
        [
          [-190, -50],
          [-170, -70],
          [-170, 70],
          [-190, 50],
          [-190, -50]
        ]
      ]
    ]).geometry;
    const expected = multiPolygon([
      [
        [
          [-180, -60],
          [-170, -70],
          [-170, 70],
          [-180, 60],
          [-180, -60]
        ]
      ],
      [
        [
          [-90, 0],
          [0, -45],
          [90, 0],
          [0, 45],
          [-90, 0]
        ]
      ],
      [
        [
          [170, -50],
          [180, -60],
          [180, 60],
          [170, 50],
          [170, -50]
        ]
      ]
    ]).geometry;
    expect(normalizeGeometry(input)).toStrictEqual(expected);
  });

  test('it produces multipolygons wrapping from the east', () => {
    const input = multiPolygon([
      [
        [
          [-90, 0],
          [0, -45],
          [90, 0],
          [0, 45],
          [-90, 0]
        ]
      ],
      [
        [
          [170, -50],
          [190, -70],
          [190, 70],
          [170, 50],
          [170, -50]
        ]
      ]
    ]).geometry;
    const expected = multiPolygon([
      [
        [
          [-180, -60],
          [-170, -70],
          [-170, 70],
          [-180, 60],
          [-180, -60]
        ]
      ],
      [
        [
          [-90, 0],
          [0, -45],
          [90, 0],
          [0, 45],
          [-90, 0]
        ]
      ],
      [
        [
          [170, -50],
          [180, -60],
          [180, 60],
          [170, 50],
          [170, -50]
        ]
      ]
    ]).geometry;
    expect(normalizeGeometry(input)).toStrictEqual(expected);
  });

  test('it unwraps large viewports', () => {
    const input = polygon([
      [
        [-200, -80],
        [210, -80],
        [210, 75],
        [-200, 75],
        [-200, -80]
      ]
    ]).geometry;
    const expected = polygon([
      [
        [-180, -80],
        [180, -80],
        [180, 75],
        [-180, 75],
        [-180, -80]
      ]
    ]).geometry;
    expect(normalizeGeometry(input)).toStrictEqual(expected);
  });

  test('it absorbes unneeded polygons', () => {
    const input = multiPolygon([
      [
        [
          [-200, -80],
          [210, -80],
          [210, 75],
          [-200, 75],
          [-200, -80]
        ]
      ],
      [
        [
          [-90, 0],
          [0, -45],
          [90, 0],
          [0, 45],
          [-90, 0]
        ]
      ]
    ]).geometry;
    const expected = polygon([
      [
        [-180, -80],
        [180, -80],
        [180, 75],
        [-180, 75],
        [-180, -80]
      ]
    ]).geometry;
    expect(normalizeGeometry(input)).toStrictEqual(expected);
  });
});
