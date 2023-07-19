import { hasFlag, setFlags, clearFlags } from '../../src/utils/featureFlags';

describe('Feature flags', () => {
  afterEach(() => {
    clearFlags();
  });

  test('are not set initially', () => {
    expect(hasFlag('A')).toStrictEqual(false);
    expect(hasFlag('B')).toStrictEqual(false);
    expect(hasFlag('C')).toStrictEqual(false);
  });

  test('can be set using an array of strings', () => {
    setFlags(['A', 'B']);
    expect(hasFlag('A')).toStrictEqual(true);
    expect(hasFlag('B')).toStrictEqual(true);
    expect(hasFlag('C')).toStrictEqual(false);

    setFlags([]);
    expect(hasFlag('A')).toStrictEqual(false);
    expect(hasFlag('B')).toStrictEqual(false);
    expect(hasFlag('C')).toStrictEqual(false);
  });

  test('can be set using an object', () => {
    setFlags({
      A: 10,
      B: true,
      C: false,
      D: undefined,
      E: null,
      F: [],
      G: {}
    });
    expect(hasFlag('A')).toStrictEqual(true);
    expect(hasFlag('B')).toStrictEqual(true);
    expect(hasFlag('C')).toStrictEqual(false);
    expect(hasFlag('D')).toStrictEqual(false);
    expect(hasFlag('E')).toStrictEqual(false);
    expect(hasFlag('F')).toStrictEqual(true);
    expect(hasFlag('G')).toStrictEqual(true);

    setFlags({});
    expect(hasFlag('A')).toStrictEqual(false);
    expect(hasFlag('B')).toStrictEqual(false);
    expect(hasFlag('C')).toStrictEqual(false);
  });

  test('are cleared', () => {
    setFlags(['A']);
    expect(hasFlag('A')).toStrictEqual(true);
    clearFlags();
    expect(hasFlag('A')).toStrictEqual(false);
  });

  const invaild = [10, '', 'A', false, { '': 10 }, ['A', '']];
  test.each(invaild)('fail in case of invalid flags %p', (x) => {
    const t = () => {
      setFlags(x);
    };
    expect(t).toThrow();
  });
});
