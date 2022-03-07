import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';
import { GroupDateTypes } from '../../src/operations/constants/GroupDateTypes';
import { groupValuesByDateColumn } from '../../src/operations/groupByDate';

const REVENUE = 50;

const DATES_VALUES = [
  Date.UTC(1970, 0, 1, 0, 0),
  Date.UTC(1970, 0, 1, 0, 30),
  Date.UTC(1970, 1, 1, 0, 0),
  Date.UTC(1970, 1, 1, 0, 30),
  Date.UTC(1971, 0, 1, 1, 0)
];

const DATE_COLUMN = 'test_date';
const OPERATION_COLUMN = 'test_revenue';
const OPERATION_COLUMN_2 = 'test_revenue_2';

const FEATURES = DATES_VALUES.map((value) => ({
  [DATE_COLUMN]: value,
  [OPERATION_COLUMN]: REVENUE,
  [OPERATION_COLUMN_2]: REVENUE
}));

describe('groupValuesByDateColumn', () => {
  test('should return null due to empty data array', () => {
    expect(groupValuesByDateColumn({ data: [] })).toEqual(null);
  });

  describe('valid features', () => {
    test('should return null due to invalid grouping operation', () => {
      expect(
        groupValuesByDateColumn({
          data: FEATURES,
          valuesColumns: [OPERATION_COLUMN],
          keysColumn: DATE_COLUMN,
          // @ts-ignore
          groupType: '__fake_group_type__',
          operation: AggregationTypes.COUNT
        })
      ).toEqual(null);
    });

    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByDateColumn({
          data: FEATURES,
          valuesColumns: [OPERATION_COLUMN],
          keysColumn: DATE_COLUMN,
          groupType: GroupDateTypes.DAYS,
          // @ts-ignore
          operation: '__fake_operation__'
        })
      ).toEqual([]);
    });

    describe('grouping operation tests', () => {
      const COMMON_PARAMS = {
        data: FEATURES,
        valuesColumns: [OPERATION_COLUMN],
        keysColumn: DATE_COLUMN
      };

      const RESULTS = {
        [GroupDateTypes.YEARS]: [
          { name: Date.UTC(1970, 0, 1), value: 4 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ],
        [GroupDateTypes.MONTHS]: [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ],
        [GroupDateTypes.WEEKS]: [
          { name: Date.UTC(1969, 11, 29), value: 2 },
          { name: Date.UTC(1970, 0, 26), value: 2 },
          { name: Date.UTC(1970, 11, 28), value: 1 }
        ],
        [GroupDateTypes.DAYS]: [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ],
        [GroupDateTypes.HOURS]: [
          { name: Date.UTC(1970, 0, 1, 0, 0), value: 2 },
          { name: Date.UTC(1970, 1, 1, 0, 0), value: 2 },
          { name: Date.UTC(1971, 0, 1, 1, 0), value: 1 }
        ],
        [GroupDateTypes.MINUTES]: DATES_VALUES.map((dateValue) => ({
          name: dateValue,
          value: 1
        }))
      };

      describe('one valuesColumns', () => {
        Object.entries(RESULTS).forEach(([groupType, result]) => {
          test(groupType, () => {
            executeGroupByDateFnTests({ ...COMMON_PARAMS, groupType }, result);
          });
        });
      });

      describe('multiple valuesColumns', () => {
        const COMMON_PARAMS_FOR_MULTIPLE = {
          ...COMMON_PARAMS,
          valuesColumns: [OPERATION_COLUMN, OPERATION_COLUMN_2],
          joinOperation: AggregationTypes.SUM
        };

        Object.entries(RESULTS).forEach(([groupType, result]) => {
          describe(groupType, () => {
            test(AggregationTypes.COUNT, () =>
              expect(
                groupValuesByDateColumn({
                  ...COMMON_PARAMS_FOR_MULTIPLE,
                  // @ts-ignore
                  groupType,
                  operation: AggregationTypes.COUNT
                })
              ).toEqual(result)
            );

            test(AggregationTypes.SUM, () =>
              expect(
                groupValuesByDateColumn({
                  ...COMMON_PARAMS_FOR_MULTIPLE,
                  // @ts-ignore
                  groupType,
                  operation: AggregationTypes.SUM
                })
              ).toEqual(
                result.map((item) => ({
                  ...item,
                  value: item.value * REVENUE * 2
                }))
              )
            );
          });
        });
      });
    });
  });

  describe('invalid features', () => {
    test('invalid date columns are not taken into consideration', () => {
      const h = groupValuesByDateColumn({
        data: [{ [DATE_COLUMN]: '__non_number__', [OPERATION_COLUMN]: 100 }],
        valuesColumns: [OPERATION_COLUMN],
        keysColumn: DATE_COLUMN,
        groupType: GroupDateTypes.DAYS
      });
      expect(h).toEqual([]);
    });
  });
});

// Aux
function executeGroupByDateFnTests(args, result) {
  const sumResult = result.map((item) => ({
    ...item,
    value: item.value * REVENUE
  }));

  [AggregationTypes.COUNT, AggregationTypes.SUM].forEach((operation, idx) =>
    expect(groupValuesByDateColumn({ ...args, operation })).toEqual(
      idx ? sumResult : result
    )
  );
}
