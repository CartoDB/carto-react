import { groupValuesByColumn } from 'src/widgets/operations/groupby';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import {
  buildValidFeatures,
  buildInvalidFeatures
} from '../data-mocks/operations/pointsForGroupby';

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
          category: 'Category 2',
          value: 3
        },
        {
          category: 'Category 1',
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
          category: 'Category 2',
          value: 3
        },
        {
          category: 'Category 1',
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
          category: 'Category 2',
          value: 1
        },
        {
          category: 'Category 1',
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
          category: 'Category 2',
          value: 5
        },
        {
          category: 'Category 1',
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
          category: 'Category 2',
          value: 9
        },
        {
          category: 'Category 1',
          value: 6
        }
      ]);
    });
  });

  describe('invalid features', () => {
    test('should return all groups values to 0 due to invalid column data', () => {
      const groups = groupValuesByColumn(
        buildInvalidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.COUNT
      );
      expect(groups).toEqual([
        {
          category: 'Category 1',
          value: 0
        },
        {
          category: 'Category 2',
          value: 0
        }
      ]);
    });
  });
});
