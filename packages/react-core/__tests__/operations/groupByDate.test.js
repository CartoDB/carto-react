import { AggregationTypes } from '../../src/operations/aggregation/AggregationTypes';
import { GroupDateTypes } from '../../src/operations/GroupDateTypes';
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
      const params = {
        features: FEATURES,
        valuesColumn: OPERATION_COLUMN,
        keysColumn: DATE_COLUMN
      };

      test(GroupDateTypes.YEARS, () => {
        params.operation = GroupDateTypes.YEARS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 4 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(params, RESULT);
      });

      test(GroupDateTypes.MONTHS, () => {
        params.operation = GroupDateTypes.MONTHS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(params, RESULT);
      });

      test(GroupDateTypes.WEEKS, () => {
        params.operation = GroupDateTypes.WEEKS;

        const RESULT = [
          { name: Date.UTC(1969, 11, 29), value: 2 },
          { name: Date.UTC(1970, 0, 26), value: 2 },
          { name: Date.UTC(1970, 11, 28), value: 1 }
        ];

        executeGroupByDateFnTests(params, RESULT);
      });

      test(GroupDateTypes.DAYS, () => {
        params.operation = GroupDateTypes.DAYS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1), value: 2 },
          { name: Date.UTC(1970, 1, 1), value: 2 },
          { name: Date.UTC(1971, 0, 1), value: 1 }
        ];

        executeGroupByDateFnTests(params, RESULT);
      });

      test(GroupDateTypes.HOURS, () => {
        params.operation = GroupDateTypes.HOURS;

        const RESULT = [
          { name: Date.UTC(1970, 0, 1, 0, 0), value: 2 },
          { name: Date.UTC(1970, 1, 1, 0, 0), value: 2 },
          { name: Date.UTC(1971, 0, 1, 1, 0), value: 1 }
        ];

        executeGroupByDateFnTests(params, RESULT);
      });

      test(GroupDateTypes.MINUTES, () => {
        params.operation = GroupDateTypes.MINUTES;

        const RESULT = DATES_VALUES.map((dateValue) => ({ name: dateValue, value: 1 }));

        executeGroupByDateFnTests(params, RESULT);
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
    expect(groupValuesByDateColumn(...Object.values(args), aggregation)).toEqual(
      idx ? sumResult : result
    )
  );
}
