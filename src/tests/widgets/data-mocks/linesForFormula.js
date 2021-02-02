export const LINES = (column) => [
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
      [column]: 1
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 2]
      ]
    },
    properties: {
      [column]: 2
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 4]
      ]
    },
    properties: {
      [column]: 3
    }
  }
];
