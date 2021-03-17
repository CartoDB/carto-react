import { DataFilterExtension } from '@deck.gl/extensions';
import { renderHook } from '@testing-library/react-hooks';
import useCartoLayerProps from '../../src/hooks/useCartoLayerProps';
import { mockReduxHooks, mockClear } from '../mockReduxHooks';

describe('useCartoLayerProps', () => {
  mockReduxHooks();

  const { result } = renderHook(() => useCartoLayerProps());

  test('should return correct filter props', () => {
    expect(Object.keys(result.current)).toEqual([
      'binary',
      'uniqueIdProperty',
      'onViewportLoad',
      'getFilterValue',
      'filterRange',
      'extensions',
      'updateTriggers'
    ]);
  });

  describe('should has correct filter configurations', () => {
    test('uniqueIdProperty should be a string', () => {
      expect(typeof result.current.uniqueIdProperty === 'string').toBe(true);
    });

    test('onViewporLoad should be a function', () => {
      expect(result.current.onViewportLoad).toBeInstanceOf(Function);
    });

    test('getFilterValue should be a function', () => {
      expect(result.current.getFilterValue).toBeInstanceOf(Function);
    });

    test('filter range should be between 1 and 1', () => {
      expect(result.current.filterRange).toEqual([1, 1]);
    });

    test('extensions should have an unique instance of DataFilterExtension', () => {
      expect(result.current.extensions.length).toBe(1);
      expect(result.current.extensions[0]).toBeInstanceOf(DataFilterExtension);
    });

    test('filter size should be 1', () => {
      expect(result.current.extensions[0].opts.filterSize).toEqual(1);
    });

    test('getFilterValue trigger should be present', () => {
      expect(result.current.updateTriggers).toHaveProperty('getFilterValue');
    });
  });

  mockClear();
});
