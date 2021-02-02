export const POLYGONS = (operationColumn) => [
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
          [0, 0]
        ]
      ]
    },
    properties: {
      [operationColumn]: 1
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [1, 1],
          [1, 2],
          [2, 2],
          [2, 1],
          [1, 1]
        ]
      ]
    },
    properties: {
      [operationColumn]: 2
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [2, 2],
          [2, 3],
          [3, 3],
          [3, 2],
          [2, 2]
        ]
      ]
    },
    properties: {
      [operationColumn]: 3
    }
  }
];
