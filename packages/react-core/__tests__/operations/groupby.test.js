import { groupValuesByColumn } from '../../src/operations/groupby';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const buildValidFeatures = (columnName) =>
  [...Array(VALUES.length)].map((_, idx) => ({
    [`${columnName}_qualitative`]: `Category ${idx % 2 === 0 ? 2 : 1}`, // 2 categories === 'Category 1' && 3 categories === 'Category 2'
    [`${columnName}_quantitative`]: VALUES[idx]
  }));

const buildInvalidFeatures = (columnName) => [
  {
    [`${columnName}_qualitative`]: 'Category 1',
    [`${columnName}_quantitative`]: null
  },
  {
    [`${columnName}_qualitative`]: 'Category 2',
    [`${columnName}_quantitative`]: undefined
  }
];

const COLUMN = 'test';

describe('groupValuesByColumn', () => {
  test('should return null due to empty data array', () => {
    expect(groupValuesByColumn([])).toEqual(null);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByColumn(
          buildValidFeatures(COLUMN),
          `${COLUMN}_quantitative`,
          `${COLUMN}_qualitative`,
          'pow'
        )
      ).toEqual([]);
    });

    test(AggregationTypes.COUNT, () => {
      const groups = groupValuesByColumn(
        buildValidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.COUNT
      );
      expect(groups).toEqual([
        {
          name: 'Category 2',
          value: 3
        },
        {
          name: 'Category 1',
          value: 2
        }
      ]);
    });

    test(AggregationTypes.AVG, () => {
      const groups = groupValuesByColumn(
        buildValidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.AVG
      );
      expect(groups).toEqual([
        {
          name: 'Category 2',
          value: 3
        },
        {
          name: 'Category 1',
          value: 3
        }
      ]);
    });

    test(AggregationTypes.MIN, () => {
      const groups = groupValuesByColumn(
        buildValidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.MIN
      );
      expect(groups).toEqual([
        {
          name: 'Category 2',
          value: 1
        },
        {
          name: 'Category 1',
          value: 2
        }
      ]);
    });

    test(AggregationTypes.MAX, () => {
      const groups = groupValuesByColumn(
        buildValidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.MAX
      );
      expect(groups).toEqual([
        {
          name: 'Category 2',
          value: 5
        },
        {
          name: 'Category 1',
          value: 4
        }
      ]);
    });

    test(AggregationTypes.SUM, () => {
      const groups = groupValuesByColumn(
        buildValidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.SUM
      );
      expect(groups).toEqual([
        {
          name: 'Category 2',
          value: 9
        },
        {
          name: 'Category 1',
          value: 6
        }
      ]);
    });
  });

  describe('invalid features', () => {
    test('should count nulls when operation is COUNT', () => {
      const groups = groupValuesByColumn(
        buildInvalidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.COUNT
      );
      expect(groups).toEqual([
        {
          name: 'Category 1',
          value: 1
        },
        {
          name: 'Category 2',
          value: 0
        }
      ]);
    });
    test('should return all groups values to 0 due to invalid column data for operations other than COUNT', () => {
      const groups = groupValuesByColumn(
        buildInvalidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.SUM
      );
      expect(groups).toEqual([
        {
          name: 'Category 1',
          value: 0
        },
        {
          name: 'Category 2',
          value: 0
        }
      ]);
    });
  });
});
