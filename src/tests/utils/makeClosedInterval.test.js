import { makeClosedInterval } from 'src/utils/makeClosedInterval';

describe('make closed interval', () => {
  test('first value is undefined', () => {
    const DATA = [[undefined, 1]];
    expect(makeClosedInterval(DATA)).toEqual([[Number.MIN_SAFE_INTEGER, 1]]);
  });

  test('last value is undefined', () => {
    const DATA = [[1, undefined]];
    expect(makeClosedInterval(DATA)).toEqual([[1, Number.MAX_SAFE_INTEGER]]);
  });

  test('both values are not undefined', () => {
    const DATA = [[1, 1]];
    expect(makeClosedInterval(DATA)).toEqual([[1, 1]]);
  });
});
