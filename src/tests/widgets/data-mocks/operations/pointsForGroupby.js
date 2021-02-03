const VALUES = [1, 2, 3, 4, 5];

export const buildValidFeatures = (columnName) =>
  [...Array(5)].map((_, idx) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    properties: {
      [`${columnName}_qualitative`]: `Category ${idx % 2 === 0 ? 2 : 1}`, // 2 categories === 'Category 1' && 3 categories === 'Category 2'
      [`${columnName}_quantitative`]: VALUES[idx]
    }
  }));

export const buildInvalidFeatures = (columnName) => [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    properties: {
      [`${columnName}_qualitative`]: 'Category 1',
      [`${columnName}_quantitative`]: null
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0]
    },
    properties: {
      [`${columnName}_qualitative`]: 'Category 2',
      [`${columnName}_quantitative`]: undefined
    }
  }
];
