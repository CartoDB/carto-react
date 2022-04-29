import { histogram } from '../../src/operations/histogram';
import { AggregationTypes } from '../../src/operations/constants/AggregationTypes';

const VALUES = [1, 2, 2, 3, 3, 3, 4, 4, 5];

const COLUMN = 'test';

const VALID_DATA = [...Array(VALUES.length)].map((_, idx) => ({
  [COLUMN]: VALUES[idx],
  [COLUMN + '_2']: VALUES[idx]
}));

const INVALID_DATA = [{ [COLUMN]: null }, { [COLUMN]: undefined }];

const ticks = Array.from(new Set(VALUES));

const TICKS_RESULTS = {
  [AggregationTypes.COUNT]: [0, 1, 2, 3, 2, 1],
  [AggregationTypes.AVG]: [0, 1, 2, 3, 4, 5],
  [AggregationTypes.MIN]: [0, 1, 2, 3, 4, 5],
  [AggregationTypes.MAX]: [0, 1, 2, 3, 4, 5],
  [AggregationTypes.SUM]: [0, 1, 4, 9, 8, 5]
};

const DEFAULT_TICKS_RESULT = {
  min: Math.min(...VALUES),
  max: Math.max(...VALUES),
  ticks
};

const BINS_RESULTS = {
  [AggregationTypes.COUNT]: [1, 2, 3, 2, 1],
  [AggregationTypes.AVG]: [1, 2, 3, 4, 5],
  [AggregationTypes.MIN]: [1, 2, 3, 4, 5],
  [AggregationTypes.MAX]: [1, 2, 3, 4, 5],
  [AggregationTypes.SUM]: [1, 4, 9, 8, 5]
};

const DEFAULT_BINS_RESULT = {
  min: Math.min(...VALUES),
  max: Math.max(...VALUES),
  ticks: [1.8, 2.6, 3.4, 4.2]
};

describe('histogram', () => {
  test('should return an empty object due to empty features array', () => {
    expect(histogram({ data: [] })).toEqual({});
  });

  describe('valid features', () => {
    test('should return an empty object due to invalid operation', () => {
      expect(
        histogram({
          data: VALID_DATA,
          valuesColumns: [COLUMN],
          ticks,
          // @ts-ignore
          operation: 'pow'
        })
      ).toEqual({});
    });

    describe('should return an array of bins with same length as ticks plus one, due to the addition of extreme values', () => {
      test('using ticks', () => {
        const h = histogram({
          data: VALID_DATA,
          valuesColumns: [COLUMN],
          ticks,
          operation: AggregationTypes.COUNT
        });

        expect(h.data?.length).toBe(ticks.length + 1);
      });

      test('using bins', () => {
        const nBins = 15;

        const h = histogram({
          data: VALID_DATA,
          valuesColumns: [COLUMN],
          bins: nBins,
          operation: AggregationTypes.COUNT
        });

        expect(h.data?.length).toBe(nBins);
      });
    });

    describe('one valuesColumns', () => {
      describe('using manual ticks', () => {
        Object.entries(TICKS_RESULTS).forEach(([operation, result]) => {
          test(operation, () => {
            const groups = histogram({
              data: VALID_DATA,
              valuesColumns: [COLUMN],
              ticks,
              // @ts-ignore
              operation
            });
            expect(groups).toEqual({ data: result, ...DEFAULT_TICKS_RESULT });
          });
        });
      });

      describe('using bins', () => {
        Object.entries(BINS_RESULTS).forEach(([operation, result]) => {
          test(operation, () => {
            const groups = histogram({
              data: VALID_DATA,
              valuesColumns: [COLUMN],
              bins: 5,
              // @ts-ignore
              operation
            });
            expect(groups).toEqual({ data: result, ...DEFAULT_BINS_RESULT });
          });
        });
      });
    });

    describe('multiple valuesColumns', () => {
      describe('using manual ticks', () => {
        const defaultResult = {
          min: DEFAULT_TICKS_RESULT.min * 2,
          max: DEFAULT_TICKS_RESULT.max * 2,
          ticks: DEFAULT_TICKS_RESULT.ticks.map((tick) => tick * 2)
        };

        const RESULTS_FOR_MULTIPLE = Object.entries(TICKS_RESULTS).reduce(
          (acc, [operation, result], idx) => {
            acc[operation] = result.map(
              (value) =>
                // === 0 is AggregationTypes.COUNT
                value * (idx === 0 ? 1 : 2)
            );
            return acc;
          },
          {}
        );

        Object.entries(RESULTS_FOR_MULTIPLE).forEach(([operation, result]) => {
          test(operation, () => {
            const groups = histogram({
              data: VALID_DATA,
              valuesColumns: [COLUMN, `${COLUMN}_2`],
              joinOperation: AggregationTypes.SUM,
              ticks: defaultResult.ticks,
              // @ts-ignore
              operation
            });
            expect(groups).toEqual({ data: result, ...defaultResult });
          });
        });
      });

      describe('using bins', () => {
        const defaultResult = {
          min: DEFAULT_BINS_RESULT.min * 2,
          max: DEFAULT_BINS_RESULT.max * 2,
          ticks: DEFAULT_BINS_RESULT.ticks.map((tick) => tick * 2)
        };

        const RESULTS_FOR_MULTIPLE = Object.entries(BINS_RESULTS).reduce(
          (acc, [operation, result], idx) => {
            acc[operation] = result.map(
              (value) =>
                // === 0 is AggregationTypes.COUNT
                value * (idx === 0 ? 1 : 2)
            );
            return acc;
          },
          {}
        );

        Object.entries(RESULTS_FOR_MULTIPLE).forEach(([operation, result]) => {
          test(operation, () => {
            const groups = histogram({
              data: VALID_DATA,
              valuesColumns: [COLUMN, `${COLUMN}_2`],
              joinOperation: AggregationTypes.SUM,
              bins: 5,
              // @ts-ignore
              operation
            });
            expect(groups).toEqual({ data: result, ...defaultResult });
          });
        });
      });
    });

    describe('invalid features', () => {
      describe('should return all bins values to 0 due to invalid column data', () => {
        test('using manual ticks', () => {
          const h = histogram({
            data: INVALID_DATA,
            valuesColumns: [COLUMN],
            ticks,
            operation: AggregationTypes.COUNT
          });
          expect(h).toEqual({
            data: [0, 0, 0, 0, 0, 0],
            max: -9007199254740991,
            min: 9007199254740991,
            ticks: [1, 2, 3, 4, 5]
          });
        });
        test('using bins', () => {
          expect(() =>
            histogram({
              data: INVALID_DATA,
              valuesColumns: [COLUMN],
              bins: 6,
              operation: AggregationTypes.COUNT
            })
          ).toThrowError();
        });
      });
    });
  });
});
