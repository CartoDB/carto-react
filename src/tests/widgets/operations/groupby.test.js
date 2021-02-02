import { groupValuesByColumn } from 'src/widgets/operations/groupby';
import { AggregationTypes } from 'src/widgets/AggregationTypes';
import {
  validFeatures,
  invalidFeatures
} from '../data-mocks/operations/pointsForGroupby';

const COLUMN = 'test';

describe('Group values by column', () => {
  test('should return null due to empty data array', () => {
    expect(groupValuesByColumn([])).toEqual(null);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByColumn(
          validFeatures(COLUMN),
          `${COLUMN}_quantitative`,
          `${COLUMN}_qualitative`,
          'pow'
        )
      ).toEqual([]);
    });

    test(AggregationTypes.COUNT, () => {
      const func = groupValuesByColumn(
        validFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.COUNT
      );
      expect(func).toEqual([
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
      const func = groupValuesByColumn(
        validFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.AVG
      );
      expect(func).toEqual([
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
      const func = groupValuesByColumn(
        validFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.MIN
      );
      expect(func).toEqual([
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
      const func = groupValuesByColumn(
        validFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.MAX
      );
      expect(func).toEqual([
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
      const func = groupValuesByColumn(
        validFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.SUM
      );
      expect(func).toEqual([
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
      const func = groupValuesByColumn(
        invalidFeatures(COLUMN),
        `${COLUMN}_quantitative`,
        `${COLUMN}_qualitative`,
        AggregationTypes.COUNT
      );
      expect(func).toEqual([
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
