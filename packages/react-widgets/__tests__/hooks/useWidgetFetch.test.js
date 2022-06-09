import { InvalidColumnError } from '@carto/react-core/';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import useWidgetFetch from '../../src/hooks/useWidgetFetch';
import { mockReduxHooks } from '../mockReduxHooks';

const PARAMS_MOCK = {
  column: '__test__'
};

const SOURCE_MOCK = {
  id: 'test',
  data: 'testTable'
};

jest.mock('../../src/hooks/useWidgetSource', () => () => SOURCE_MOCK);

describe('useWidgetFetch', () => {
  mockReduxHooks();

  test('should work correctly', async () => {
    const onError = jest.fn();
    const modelFn = jest
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve('data'), 100))
      );

    const { rerender } = render(
      <TestComponent
        modelFn={modelFn}
        args={{
          id: 'test',
          dataSource: 'test',
          params: PARAMS_MOCK,
          global: false,
          onError
        }}
      />
    );

    // Test modelFn is called with the right params
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: false
    });

    expect(screen.getByText('loading')).toBeInTheDocument();

    await act(() => sleep(250));

    expect(screen.getByText('data')).toBeInTheDocument();

    modelFn.mockImplementation(
      () => new Promise((resolve, reject) => setTimeout(() => reject('ERROR'), 100))
    );

    rerender(
      <TestComponent
        modelFn={modelFn}
        args={{
          id: 'test',
          dataSource: 'test',
          params: PARAMS_MOCK,
          global: true,
          onError
        }}
      />
    );

    // After the update, modelFn should be called with the global as true
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: true
    });

    expect(screen.getByText('loading')).toBeInTheDocument();
    await act(() => sleep(250));
    expect(screen.queryByText('loading')).not.toBeInTheDocument();

    expect(onError).toBeCalledTimes(1);

    modelFn.mockRejectedValue(
      new InvalidColumnError('Uncaught InvalidColumnError: Invalid column')
    );

    rerender(
      <TestComponent
        modelFn={modelFn}
        args={{
          id: 'test',
          dataSource: 'test',
          params: PARAMS_MOCK,
          global: false,
          onError
        }}
      />
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
    await act(() => sleep(250));
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
    expect(onError).toBeCalledTimes(1);
    expect(screen.queryByText('Invalid column')).toBeInTheDocument();
  });
});

// Aux
function TestComponent({ modelFn, args }) {
  const { data, isLoading, warning } = useWidgetFetch(modelFn, args);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (warning) {
    return <div>{warning}</div>;
  }

  return <div>{data}</div>;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
