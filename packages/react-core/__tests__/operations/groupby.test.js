import { groupValuesByColumn } from '../../src/operations/groupby';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 3, 4, 5];

const buildValidFeatures = (columnName) =>
  [...Array(VALUES.length)].map((_, idx) => ({
    [`${columnName}_qualitative`]: `Category ${idx % 2 === 0 ? 2 : 1}`, // 2 categories === 'Category 1' && 3 categories === 'Category 2'
    [`${columnName}_quantitative`]: VALUES[idx],
    [`${columnName}_quantitative_2`]: VALUES[idx]
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
    expect(groupValuesByColumn({ data: [] })).toEqual(null);
  });

  describe('valid features', () => {
    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByColumn({
          data: buildValidFeatures(COLUMN),
          valuesColumns: [`${COLUMN}_quantitative`],
          keysColumn: `${COLUMN}_qualitative`,
          // @ts-ignore
          operation: 'pow'
        })
      ).toEqual([]);
    });

    const RESULTS = [
      [
        { name: 'Category 2', value: 3 },
        { name: 'Category 1', value: 2 }
      ],
      [
        { name: 'Category 2', value: 3 },
        { name: 'Category 1', value: 3 }
      ],
      [
        { name: 'Category 2', value: 1 },
        { name: 'Category 1', value: 2 }
      ],
      [
        { name: 'Category 2', value: 5 },
        { name: 'Category 1', value: 4 }
      ],
      [
        { name: 'Category 2', value: 9 },
        { name: 'Category 1', value: 6 }
      ]
    ];

    describe('one valuesColumns', () => {
      Object.values(AggregationTypes).forEach((operation, idx) => {
        test(operation, () => {
          const groups = groupValuesByColumn({
            data: buildValidFeatures(COLUMN),
            valuesColumns: [`${COLUMN}_quantitative`],
            keysColumn: `${COLUMN}_qualitative`,
            operation
          });
          expect(groups).toEqual(RESULTS[idx]);
        });
      });
    });

    describe('multiple valuesColumns', () => {
      const RESULTS_FOR_MULTIPLE = RESULTS.map((result, idx) =>
        result.map(({ name, value }) => ({
          name,
          // === 0 is AggregationTypes.COUNT
          value: value * (idx === 0 ? 1 : 2)
        }))
      );

      Object.values(AggregationTypes).forEach((operation, idx) => {
        test(operation, () => {
          const groups = groupValuesByColumn({
            data: buildValidFeatures(COLUMN),
            valuesColumns: [`${COLUMN}_quantitative`, `${COLUMN}_quantitative_2`],
            joinOperation: AggregationTypes.SUM,
            keysColumn: `${COLUMN}_qualitative`,
            operation
          });
          expect(groups).toEqual(RESULTS_FOR_MULTIPLE[idx]);
        });
      });
    });
  });

  describe('invalid features', () => {
    test('should count nulls when operation is COUNT', () => {
      const groups = groupValuesByColumn({
        data: buildInvalidFeatures(COLUMN),
        valuesColumns: [`${COLUMN}_quantitative`],
        keysColumn: `${COLUMN}_qualitative`,
        operation: AggregationTypes.COUNT
      });
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
      const groups = groupValuesByColumn({
        data: buildInvalidFeatures(COLUMN),
        valuesColumns: [`${COLUMN}_quantitative`],
        keysColumn: `${COLUMN}_qualitative`,
        operation: AggregationTypes.SUM
      });
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
