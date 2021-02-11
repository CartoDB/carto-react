import * as redux from 'react-redux';

const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
const useSelectorSpy = jest.spyOn(redux, 'useSelector');

export function mockReduxHooks(dispatchValue, selectorValue) {
  const mockDispatchFn = jest.fn(dispatchValue);
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  const mockSelectorFn = jest.fn(selectorValue);
  useSelectorSpy.mockReturnValue(mockSelectorFn);
}

export function mockClear() {
  useDispatchSpy.mockClear();
  useSelectorSpy.mockClear();
}
