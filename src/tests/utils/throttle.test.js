import { throttle } from 'src/utils/throttle';

describe('throttle', () => {
  test('should be executed once', () => {
    const mockedFunction = jest.fn();
    const throttledFn = throttle(mockedFunction, 100);
    throttledFn();
    throttledFn();

    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
