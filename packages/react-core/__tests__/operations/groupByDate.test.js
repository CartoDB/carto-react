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

const FEATURES = DATES_VALUES.map((value) => ({
  [DATE_COLUMN]: value,
  [OPERATION_COLUMN]: REVENUE
}));

describe('groupValuesByDateColumn', () => {
  test('should return null due to empty data array', () => {
    expect(groupValuesByDateColumn([])).toEqual(null);
  });

  describe('valid features', () => {
    test('should return null due to invalid grouping operation', () => {
      expect(
        groupValuesByDateColumn(
          FEATURES,
          OPERATION_COLUMN,
          DATE_COLUMN,
          '__fake_group_type__',
          AggregationTypes.COUNT
        )
      ).toEqual(null);
    });

    test('should return an empty array due to invalid operation', () => {
      expect(
        groupValuesByDateColumn(
          FEATURES,
          OPERATION_COLUMN,
          DATE_COLUMN,
          GroupDateTypes.DAYS,
          '__fake_operation__'
        )
      ).toEqual([]);
    });

    describe('grouping operation tests', () => {
      const ARGS = [FEATURES, OPERATION_COLUMN, DATE_COLUMN, GroupDateTypes.YEARS];

      test(GroupDateTypes.YEARS, () => {
        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 4 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(ARGS, RESULT);
      });

      test(GroupDateTypes.MONTHS, () => {
        ARGS[3] = GroupDateTypes.MONTHS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(ARGS, RESULT);
      });

      test(GroupDateTypes.WEEKS, () => {
        ARGS[3] = GroupDateTypes.WEEKS;

        const RESULT = [
          { name: Date.UTC(1969, 11, 29), value: 2 },
          { name: Date.UTC(1970, 0, 26), value: 2 },
          { name: Date.UTC(1970, 11, 28), value: 1 }
        ];

        executeGroupByDateFnTests(ARGS, RESULT);
      });

      test(GroupDateTypes.DAYS, () => {
        ARGS[3] = GroupDateTypes.DAYS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(ARGS, RESULT);
      });

      test(GroupDateTypes.HOURS, () => {
        ARGS[3] = GroupDateTypes.HOURS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1, 0, 0), value: 2 },
          { name: Date.UTC(1970, 1, 1, 0, 0), value: 2 },
          { name: Date.UTC(1971, 0, 1, 1, 0), value: 1 }
        ];

        executeGroupByDateFnTests(ARGS, RESULT);
      });

      test(GroupDateTypes.MINUTES, () => {
        ARGS[3] = GroupDateTypes.MINUTES;

        const RESULT = DATES_VALUES.map((dateValue) => ({ name: dateValue, value: 1 }));

        executeGroupByDateFnTests(ARGS, RESULT);
      });
    });
  });

  describe('invalid features', () => {
    test('invalid date columns are not taken into consideration', () => {
      const h = groupValuesByDateColumn(
        [{ [DATE_COLUMN]: '__non_number__', [OPERATION_COLUMN]: 100 }],
        OPERATION_COLUMN,
        DATE_COLUMN,
        GroupDateTypes.DAYS,
        AggregationTypes.COUNT
      );
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

  [AggregationTypes.COUNT, AggregationTypes.SUM].forEach((aggregation, idx) =>
    expect(groupValuesByDateColumn(...args, aggregation)).toEqual(
      idx ? sumResult : result
    )
  );
}
