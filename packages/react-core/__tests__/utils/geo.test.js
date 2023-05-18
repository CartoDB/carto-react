import bboxPolygon from '@turf/bbox-polygon';
import { isGlobalViewport, getGeometryToIntersect } from '../../src/utils/geo';

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
    console.log(viewport);
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
