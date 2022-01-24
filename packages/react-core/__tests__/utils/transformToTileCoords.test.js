import transformToTileCoords from '../../src/utils/transformToTileCoords';

const GEOMETRY_AS_WGS84 = {
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

const TILE_2_3_3_BBOX = { west: -90, north: 40.97989806962013, east: -45, south: 0 };

const GEOMETRY_AS_TILE_COORDS = {
  type: 'Polygon',
  coordinates: [
    [
      [-0.0126953125, -0.072265625],
      [-0.1689453125, 0.0107421875],
      [0.0458984375, 0.1142578125],
      [0.16015625, 0.087890625],
      [0.1455078125, 0.020507812500000888],
      [0.111328125, -0.0361328125],
      [0.0078125, 0.0283203125],
      [-0.0126953125, -0.072265625]
    ]
  ]
};

describe('wgs84ToTileCoords', () => {
  test('projects correctly', () => {
    const transformedGeometry = transformToTileCoords(GEOMETRY_AS_WGS84, TILE_2_3_3_BBOX);

    expect(transformedGeometry).toEqual(GEOMETRY_AS_TILE_COORDS);
  });

  test("raises error if geometry type isn't covered", () => {
    expect(() =>
      transformToTileCoords(
        { ...GEOMETRY_AS_WGS84, type: 'MultiMovidas' },
        TILE_2_3_3_BBOX
      )
    ).toThrowError(Error);
  });
});
