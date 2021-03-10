import { randomString } from '../../src/utils/randomString';

describe('randomString', () => {
  test('should return a string', () => {
    expect(typeof randomString(0) === 'string').toBe(true);
  });

  test('should return an empty string', () => {
    expect(randomString(0)).toBe('');
  });

  test('should return a string of required length', () => {
    expect(randomString(100).length).toBe(100);
  });
});
