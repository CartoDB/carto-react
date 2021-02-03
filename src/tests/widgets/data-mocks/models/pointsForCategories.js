export const buildPointFeatures = (categoryColumn, operationColumn) => [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [[0, 0]]
    },
    properties: {
      [categoryColumn]: 'a',
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
      [categoryColumn]: 'a',
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
      [categoryColumn]: 'b',
      [operationColumn]: 3
    }
  }
];
