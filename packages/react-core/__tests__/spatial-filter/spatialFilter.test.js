import { applySpatialFilterToTileContent } from '../../src/spatial-filter/applySpatialFilterToTileContent';
import {
  applySpatialFilterToLines,
  applySpatialFilterToPoints,
  applySpatialFilterToPolygons
} from '../../src/spatial-filter/helpers';

// Used tile is x: 238 | y: 383 | z: 10
const tileBbox = {
  west: -96.328125,
  north: 41.24477234308208,
  east: -95.9765625,
  south: 40.97989806962013
};

const UNIQUE_ID_PROPERTY = 'cartodb_id';

const FILTERING_GEOMETRY_AS_WGS84 = {
  type: 'Polygon',
  coordinates: [
    [
      [-90.5712890625, 43.389081939117496],
      [-97.6025390625, 40.613952441166596],
      [-87.9345703125, 36.98500309285596],
      [-82.79296874999999, 37.92686760148135],
      [-83.4521484375, 40.27952566881291],
      [-84.990234375, 42.19596877629178],
      [-89.6484375, 40.01078714046552],
      [-90.5712890625, 43.389081939117496]
    ]
  ]
};

const FILTERING_GEOMETRY_AS_TILE_COORDS = {
  type: 'Polygon',
  coordinates: [
    [
      [16.375000000000465, -8.25],
      [-3.625000000000103, 2.375],
      [23.87500000000068, 15.625],
      [38.500000000001094, 12.25],
      [36.625000000001044, 3.6250000000001137],
      [32.25000000000092, -3.625],
      [19.00000000000054, 4.625],
      [16.375000000000465, -8.25]
    ]
  ]
};

describe('Spatial filter', () => {
  executePointsTests();
  executePolygonTests();
  executeLinesTests();

  test('should apply spatial filter correctly to tile content', () => {
    const tileContent = {
      byteLength: 0,
      points: POINTS_DATA,
      polygons: POLYGONS_DATA,
      lines: LINES_DATA
    };

    const analysedFeatures = {
      points: new Map(),
      polygons: new Map(),
      lines: new Map()
    };

    const tileContentWithGetFilterValue = applySpatialFilterToTileContent({
      tileContent,
      tileBbox,
      filteringGeometry: FILTERING_GEOMETRY_AS_WGS84,
      analysedFeatures,
      uniqueIdProperty: UNIQUE_ID_PROPERTY
    });

    [
      { key: 'points', results: POINTS_RESULTS },
      { key: 'polygons', results: POLYGONS_RESULTS },
      { key: 'lines', results: LINES_RESULTS }
    ].forEach(({ key, results }) => {
      expect(tileContentWithGetFilterValue[key]).toHaveProperty('attributes');
      expect(tileContentWithGetFilterValue[key].attributes).toHaveProperty(
        'getFilterValue'
      );
      expect(tileContentWithGetFilterValue[key].attributes.getFilterValue.value).toEqual(
        results
      );
    });
  });
});

const POINTS_DATA = {
  featureIds: {
    value: Uint16Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    size: 1
  },
  fields: [],
  globalFeatureIds: {
    value: Uint16Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    size: 1
  },
  numericProps: {
    cartodb_id: {
      value: Float32Array.of(
        7810,
        7811,
        7814,
        7909,
        7935,
        7936,
        7937,
        7940,
        7941,
        7942,
        7943,
        7944,
        7945
      ),
      size: 1
    }
  },
  positions: {
    value: Float32Array.of(
      1.008056640625,
      -0.056396484375,
      1.024658203125,
      0.399658203125,
      1.002685546875,
      0.087646484375,
      0.80517578125,
      0.39892578125,
      0.83740234375,
      -0.057861328125,
      0.702880859375,
      0.154296875,
      0.8134765625,
      0.24853515625,
      0.80615234375,
      0.06689453125,
      0.5712890625,
      0.148193359375,
      0.539794921875,
      0.29638671875,
      0.536376953125,
      0.04150390625,
      0.35693359375,
      0.0439453125,
      0.2177734375,
      0.556640625
    ),
    size: 2
  },
  properties: Array(13)
    .fill(null)
    .map((_, idx) => ({ store_id: '' + idx }))
};

const POINTS_RESULTS = Uint16Array.of(1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1);

function executePointsTests() {
  test('should filter points', () => {
    const getFilterValueRes = applySpatialFilterToPoints(
      POINTS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      { uniqueIdProperty: UNIQUE_ID_PROPERTY }
    );

    expect(getFilterValueRes.length).toEqual(POINTS_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(POINTS_RESULTS);
  });

  test('should filter points without uniqueIdProperty', () => {
    const getFilterValueRes = applySpatialFilterToPoints(
      { ...POINTS_DATA, numericProps: {} },
      FILTERING_GEOMETRY_AS_TILE_COORDS
    );

    expect(getFilterValueRes.length).toEqual(POINTS_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(POINTS_RESULTS);
  });

  test('should fill analysedPointsFeatures map if provided', () => {
    const analysedPointsFeatures = new Map();

    applySpatialFilterToPoints(POINTS_DATA, FILTERING_GEOMETRY_AS_TILE_COORDS, {
      uniqueIdProperty: UNIQUE_ID_PROPERTY,
      analysedPointsFeatures
    });

    const analysedPointsFeatures2 = new Map();

    applySpatialFilterToPoints(POINTS_DATA, FILTERING_GEOMETRY_AS_TILE_COORDS, {
      uniqueIdProperty: 'store_id',
      analysedPointsFeatures: analysedPointsFeatures2
    });

    // Check if analysedPointsFeatures is being filled correctly using numeric uniqueIdProperty
    expect(typeof [...analysedPointsFeatures.keys()][0]).toBe('number');
    expect(Uint16Array.of(...analysedPointsFeatures.values())).toEqual(POINTS_RESULTS);

    // Same but using string
    expect(typeof [...analysedPointsFeatures2.keys()][0]).toBe('string');
    expect(Uint16Array.of(...analysedPointsFeatures2.values())).toEqual(POINTS_RESULTS);
  });

  test('should use analysedPointsFeatures if provided', () => {
    const analysedPointsFeatures1 = new Map(
      [...POINTS_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 0])
    );

    const getFilterValueRes1 = applySpatialFilterToPoints(
      POINTS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedPointsFeatures: analysedPointsFeatures1
      }
    );

    const analysedPointsFeatures2 = new Map(
      [...POINTS_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 1])
    );

    const getFilterValueRes2 = applySpatialFilterToPoints(
      POINTS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedPointsFeatures: analysedPointsFeatures2
      }
    );

    // The result is full of 0 because in points,
    // if a previous the same point didn't intersect before,
    // this won't intersect neither, it's a different behavior
    // than the one we can find in polygons in lines
    getFilterValueRes1.forEach((doesIntersects) => expect(doesIntersects).toBe(0));

    // Same but using 1 as previous value
    getFilterValueRes2.forEach((doesIntersects) => expect(doesIntersects).toBe(1));
  });
}

const POLYGONS_DATA = {
  featureIds: {
    value: Uint16Array.of(0, 0, 0, 0, 0),
    size: 1
  },
  fields: [],
  globalFeatureIds: {
    value: Uint16Array.of(0, 0, 0, 0, 0),
    size: 1
  },
  numericProps: {
    cartodb_id: {
      value: Float32Array.of(79, 79, 79, 79, 79),
      size: 1
    }
  },
  polygonIndices: {
    value: Uint16Array.of(0, 3, 5),
    size: 1
  },
  primitivePolygonIndices: {
    value: Uint16Array.of(0, 3, 5),
    size: 1
  },
  positions: {
    value: Float32Array.of(
      1.0625,
      -0.0625,
      1.0625,
      1.0625,
      -0.0625,
      1.0625,
      -0.0625,
      -0.0625,
      1.0625,
      -0.0625
    ),
    size: 2
  },
  properties: [{}]
};

const POLYGONS_RESULTS = Uint16Array.of(1, 1, 1, 1, 1);

function executePolygonTests() {
  test('should filter polygons', () => {
    const getFilterValueRes = applySpatialFilterToPolygons(
      POLYGONS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      { uniqueIdProperty: UNIQUE_ID_PROPERTY }
    );

    expect(getFilterValueRes.length).toEqual(POLYGONS_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(POLYGONS_RESULTS);
  });

  test('should filter polygons without uniqueIdProperty', () => {
    const getFilterValueRes = applySpatialFilterToPolygons(
      { ...POLYGONS_DATA, numericProps: {} },
      FILTERING_GEOMETRY_AS_TILE_COORDS
    );

    expect(getFilterValueRes.length).toEqual(POLYGONS_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(POLYGONS_RESULTS);
  });

  test('should fill analysedPolygonsFeatures map if provided', () => {
    const analysedPolygonsFeatures = new Map();

    applySpatialFilterToPolygons(POLYGONS_DATA, FILTERING_GEOMETRY_AS_TILE_COORDS, {
      uniqueIdProperty: UNIQUE_ID_PROPERTY,
      analysedPolygonsFeatures
    });

    expect([...analysedPolygonsFeatures.values()]).toEqual([true]);
    // We don't check key and uniqueIdProperty if string, because it's the same code used in points
  });

  test('should use analysedPolygonsFeatures if provided', () => {
    const analysedPolygonsFeatures1 = new Map(
      [...POLYGONS_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 1])
    );

    const getFilterValueRes1 = applySpatialFilterToPolygons(
      POLYGONS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedPolygonsFeatures: analysedPolygonsFeatures1
      }
    );

    // The result is full of 1 because in polygons,
    // if previously the same polygon was intersecting,
    // this will intersect too, or if this don't intersect
    // it's because the polygon is splitted between two tiles
    // and if some of the polygons parts intersects, everything intersects
    getFilterValueRes1.forEach((doesIntersects) => expect(doesIntersects).toBe(1));

    // This behavior differs from points, because in points, if a previously analysed
    // point does or doesn't intersect, the result in a new analysis will be the same.
    // In polygons, due to the possibility of having polygons that are splitted between tiles,
    // results that didn't intersect will be analysed again.
    // For that reason, we expect that the result is full of 1
    const analysedPolygonsFeatures2 = new Map(
      [...POLYGONS_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 0])
    );

    const getFilterValueRes2 = applySpatialFilterToPolygons(
      POLYGONS_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedPolygonsFeatures: analysedPolygonsFeatures2
      }
    );

    getFilterValueRes2.forEach((doesIntersects) => expect(doesIntersects).toBe(1));
  });
}

const LINES_DATA = {
  featureIds: {
    value: Uint16Array.of(0, 0, 0, 0, 0),
    size: 1
  },
  fields: [],
  globalFeatureIds: {
    value: Uint16Array.of(0, 0, 0, 0, 0),
    size: 1
  },
  numericProps: {
    cartodb_id: {
      value: Float32Array.of(79, 79, 79, 79, 79),
      size: 1
    }
  },
  pathIndices: {
    value: Uint16Array.of(0, 3, 5),
    size: 1
  },
  positions: {
    value: Float32Array.of(
      1.0625,
      -0.0625,
      1.0625,
      1.0625,
      -0.0625,
      1.0625,
      -0.0625,
      -0.0625,
      1.0625,
      -0.0625
    ),
    size: 2
  },
  properties: [{}]
};

const LINES_RESULTS = Uint16Array.of(1, 1, 1, 1, 1);

function executeLinesTests() {
  test('should filter lines', () => {
    const getFilterValueRes = applySpatialFilterToLines(
      LINES_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      { uniqueIdProperty: UNIQUE_ID_PROPERTY }
    );

    expect(getFilterValueRes.length).toEqual(LINES_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(LINES_RESULTS);
  });

  test('should filter lines without uniqueIdProperty', () => {
    const getFilterValueRes = applySpatialFilterToLines(
      { ...LINES_DATA, numericProps: {} },
      FILTERING_GEOMETRY_AS_TILE_COORDS
    );

    expect(getFilterValueRes.length).toEqual(LINES_DATA.featureIds.value.length);
    expect(getFilterValueRes).toEqual(LINES_RESULTS);
  });

  test('should fill analysedLinesFeatures map if provided', () => {
    const analysedLinesFeatures = new Map();

    applySpatialFilterToLines(LINES_DATA, FILTERING_GEOMETRY_AS_TILE_COORDS, {
      uniqueIdProperty: UNIQUE_ID_PROPERTY,
      analysedLinesFeatures
    });

    expect([...analysedLinesFeatures.values()]).toEqual([true]);
    // We don't check key and uniqueIdProperty if string, because it's the same code used in points
  });

  test('should use analysedLinesFeatures if provided', () => {
    const analysedLinesFeatures1 = new Map(
      [...LINES_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 1])
    );

    // This fake data do not intersect, with this test I want to be sure
    // that even if the lines don't intersect, if analysedLinesFeatures says that lines intersects
    // the result will be that they intersects
    const dataDoNotIntersect = {
      ...LINES_DATA,
      positions: { value: LINES_DATA.positions.value.map((el) => el - 1), size: 2 }
    };

    // Minor check to be sure that fake data doesn't intersect
    applySpatialFilterToLines(
      dataDoNotIntersect,
      FILTERING_GEOMETRY_AS_TILE_COORDS
    ).forEach((doesIntersects) => expect(doesIntersects).toBe(0));

    const getFilterValueRes1 = applySpatialFilterToLines(
      dataDoNotIntersect,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedLinesFeatures: analysedLinesFeatures1
      }
    );

    // The result is full of 1 because in lines,
    // if previously the same polygon was intersecting
    // (we indicate that using analysedLinesFeatures),
    // this will intersect too, or if this don't intersect
    // it's because the polygon is splitted between two tiles
    // and if some of the lines parts intersects, everything intersects
    getFilterValueRes1.forEach((doesIntersects) => expect(doesIntersects).toBe(1));

    // This behavior differs from points, because in points, if a previously analysed
    // point does or doesn't intersect, the result in a new analysis will be the same.
    // In lines, due to the possibility of having lines that are splitted between tiles,
    // results that didn't intersect will be analysed again.
    // For that reason, we expect that the result is full of 1
    const analysedLinesFeatures2 = new Map(
      [...LINES_DATA.numericProps[UNIQUE_ID_PROPERTY].value].map((el) => [el, 0])
    );

    const getFilterValueRes2 = applySpatialFilterToLines(
      LINES_DATA,
      FILTERING_GEOMETRY_AS_TILE_COORDS,
      {
        uniqueIdProperty: UNIQUE_ID_PROPERTY,
        analysedLinesFeatures: analysedLinesFeatures2
      }
    );

    getFilterValueRes2.forEach((doesIntersects) => expect(doesIntersects).toBe(1));
  });
}
