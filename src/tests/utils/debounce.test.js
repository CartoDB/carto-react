import { debounce } from 'src/utils/debounce';

describe('debounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should be executed after timeout', () => {
    const TIMEOUT = 100;

    const mockedFunction = jest.fn();
    const debouncedFn = debounce(mockedFunction, TIMEOUT);
    debouncedFn();

    expect(mockedFunction).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(TIMEOUT);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
