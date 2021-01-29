export const POINTS = (column, operationColumn) => [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [[0, 0]]
    },
    properties: {
      [column]: 'a',
      [operationColumn]: 1
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [[0, 1]]
    },
    properties: {
      [column]: 'a',
      [operationColumn]: 2
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [[0, 2]]
    },
    properties: {
      [column]: 'b',
      [operationColumn]: 3
    }
  }
];
