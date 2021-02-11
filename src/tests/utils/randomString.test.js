import { randomString } from 'src/utils/randomString';

describe('make closed interval', () => {
  test('should return a string', () => {
    expect(typeof randomString(0) === 'string').toBe(true);
  });

  test('should return an empty string', () => {
    expect(randomString(0)).toBe('');
  });

  test('should return a string of length 100', () => {
    expect(randomString(100).length).toBe(100);
  });
});
