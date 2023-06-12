import { InvalidColumnError } from '@carto/react-core/';
import { DEFAULT_INVALID_COLUMN_ERR } from '../../src/widgets/utils/constants';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import useWidgetFetch, {
  selectGeometryToIntersect
} from '../../src/hooks/useWidgetFetch';
import { mockClear, mockSetup } from '../mockReduxHooks';
import { selectViewport } from '@carto/react-redux';
import bboxPolygon from '@turf/bbox-polygon';

const PARAMS_MOCK = {
  column: '__test__'
};

const SOURCE_MOCK = {
  id: 'test',
  data: 'testTable',
  type: 'table',
  credentials: {
    apiVersion: 'v3'
  }
};

const viewport = [-10, -5, 8, 9];
const viewportSpatialFilter = bboxPolygon([-10, -5, 8, 9]).geometry;
const globalViewport = [-180, -89, 180, 89];
const mask = bboxPolygon([-5, -5, 5, 5]);
const maskSpatialFilter = mask.geometry;

describe('selectGeometryToIntersect', () => {
  const tests = [
    { global: false, viewport: viewport, mask: null, expected: viewportSpatialFilter },
    { global: false, viewport: globalViewport, mask: null, expected: null },
    { global: false, viewport: viewport, mask: mask, expected: maskSpatialFilter },
    { global: true, viewport: viewport, mask: null, expected: null },
    { global: true, viewport: globalViewport, mask: null, expected: null },
    { global: true, viewport: viewport, mask: mask, expected: maskSpatialFilter }
  ];

  it.each(tests)('return the expected geometry %p', (p) => {
    const { global, viewport, mask, expected } = p;
    const result = selectGeometryToIntersect(global, viewport, mask);
    expect(result).toStrictEqual(expected);
  });
});

jest.mock('../../src/hooks/useWidgetSource', () => () => SOURCE_MOCK);

describe('useWidgetFetch', () => {
  beforeAll(() => {
    const { useDispatch, useSelector } = mockSetup();
    const defaultSelector = jest.fn();

    // We test with a viewport set and a mask not set

    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selector) => {
      if (selector === selectViewport) {
        return viewport;
      }
      return defaultSelector;
    });
  });

  afterAll(() => {
    mockClear();
  });

  it('should work correctly (no remote attempt)', async () => {
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
          attemptRemoteCalculation: false,
          onError
        }}
      />
    );

    // Test modelFn is called with the right params
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: false,
      remoteCalculation: false,
      spatialFilter: viewportSpatialFilter
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
          attemptRemoteCalculation: false,
          onError
        }}
      />
    );

    // After the update, modelFn should be called with the global as true
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: true,
      remoteCalculation: false,
      spatialFilter: null // never in global mode
    });

    expect(screen.getByText('loading')).toBeInTheDocument();
    await act(() => sleep(250));
    expect(screen.queryByText('loading')).not.toBeInTheDocument();

    expect(onError).toBeCalledTimes(1);

    modelFn.mockRejectedValue(new InvalidColumnError('Invalid column'));

    rerender(
      <TestComponent
        modelFn={modelFn}
        args={{
          id: 'test',
          dataSource: 'test',
          params: PARAMS_MOCK,
          global: false,
          remoteCalculation: false,
          onError
        }}
      />
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
    await act(() => sleep(250));
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
    expect(onError).toBeCalledTimes(1);
    expect(screen.queryByText(DEFAULT_INVALID_COLUMN_ERR)).toBeInTheDocument();
  });

  it('should work correctly (non-global, remote attempt)', async () => {
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
          attemptRemoteCalculation: true,
          onError
        }}
      />
    );

    // Test modelFn is called with the right params
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: false,
      remoteCalculation: true,
      spatialFilter: viewportSpatialFilter
    });
  });

  it('should work correctly (global, remote attempt)', async () => {
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
          global: true,
          attemptRemoteCalculation: true,
          onError
        }}
      />
    );

    // Test modelFn is called with the right params
    expect(modelFn).toBeCalledWith({
      source: SOURCE_MOCK,
      ...PARAMS_MOCK,
      global: true,
      remoteCalculation: true,
      spatialFilter: null // no spatial filter for glboal case
    });
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
