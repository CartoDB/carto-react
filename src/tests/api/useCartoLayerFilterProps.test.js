import { renderHook } from '@testing-library/react-hooks';
import { useCartoLayerFilterProps } from 'src/api';
import { mockReduxHooks, mockClear } from '../utils/mockReduxHooks';
import { DataFilterExtension } from '@deck.gl/extensions';

describe('useCartoLayerFilterProps', () => {
  mockReduxHooks();

  const { result } = renderHook(() => useCartoLayerFilterProps());

  it('should return correct filter props', () => {
    expect(Object.keys(result.current)).toEqual([
      'onViewportLoad',
      'getFilterValue',
      'filterRange',
      'extensions',
      'updateTriggers'
    ]);
  });

  describe('should have correct filter configurations', () => {
    it('onViewporLoad should be a function', () => {
      expect(result.current.onViewportLoad).toBeInstanceOf(Function);
    });

    it('getFilterValue should be a function', () => {
      expect(result.current.getFilterValue).toBeInstanceOf(Function);
    });

    it('filter range should be between 1 and 1', () => {
      expect(result.current.filterRange).toEqual([1, 1]);
    });

    it('extensions should have an unique instance of DataFilterExtension', () => {
      expect(result.current.extensions.length).toBe(1);
      expect(result.current.extensions[0]).toBeInstanceOf(DataFilterExtension);
    });

    it('filter size should be 1', () => {
      expect(result.current.extensions[0].opts.filterSize).toEqual(1);
    });

    it('getFilterValue trigger should be present', () => {
      expect(result.current.updateTriggers).toHaveProperty('getFilterValue');
    });
  });

  mockClear();
});
