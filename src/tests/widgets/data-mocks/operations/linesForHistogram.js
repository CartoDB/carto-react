export const values = [1, 2, 2, 3, 3, 3, 4, 4, 5];

export const buildValidFeatures = (columnName) =>
  [...Array(values.length)].map((_, idx) => ({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 1]
      ]
    },
    properties: {
      [columnName]: values[idx]
    }
  }));

export const buildInvalidFeatures = (columnName) => [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 1]
      ]
    },
    properties: {
      [columnName]: null
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 1]
      ]
    },
    properties: {
      [columnName]: undefined
    }
  }
];
