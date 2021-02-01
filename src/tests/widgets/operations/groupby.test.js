import { groupValuesByColumn } from 'src/widgets/operations/groupby';
import { AggregationTypes } from 'src/widgets/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const COLUMN_NAME = 'test_column';
const FEATURES = [...Array(5)].map((_, idx) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0]
  },
  properties: {
    [`${COLUMN_NAME}_qualitative`]: `Category ${idx % 2 == 0 ? 2 : 1}`, // 2 categories === 'Category 1' && 3 categories === 'Category 2'
    [COLUMN_NAME]: VALUES[idx]
  }
}));

describe('Group values by column', () => {
  test('should return null due to empty data array', () => {
    expect(groupValuesByColumn([])).toEqual(null);
  });

  describe('groupValuesByColumn', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByColumn(FEATURES, COLUMN_NAME, `${COLUMN_NAME}_qualitative`, 'pow')
      ).toEqual([]);
    });

    test(AggregationTypes.COUNT, () => {
      const func = groupValuesByColumn(
        FEATURES,
        COLUMN_NAME,
        `${COLUMN_NAME}_qualitative`,
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
        FEATURES,
        COLUMN_NAME,
        `${COLUMN_NAME}_qualitative`,
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

    test(AggregationTypes.SUM, () => {
      const func = groupValuesByColumn(
        FEATURES,
        COLUMN_NAME,
        `${COLUMN_NAME}_qualitative`,
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
});
