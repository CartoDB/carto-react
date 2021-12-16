import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { renderHook } from '@testing-library/react-hooks';
import useCartoLayerProps from '../../src/hooks/useCartoLayerProps';
import { mockReduxHooks, mockClear } from '../mockReduxHooks';
import { MAX_GPU_FILTERS } from '../../src/hooks/dataFilterExtensionUtil';

describe('useCartoLayerProps', () => {
  mockReduxHooks();

  describe('return props', () => {
    const COMMON_PROPS = [
      'uniqueIdProperty',
      'data',
      'type',
      'connection',
      'credentials',
      'filterRange',
      'updateTriggers',
      'getFilterValue',
      'extensions'
    ];

    describe('when maps_api_version is V2', () => {
      test('should return correct props when source type is tileset', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.TILESET
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual([
          'binary',
          'onViewportLoad',
          'fetch',
          ...COMMON_PROPS
        ]);
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.QUERY
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual([
          'binary',
          'onViewportLoad',
          'fetch',
          ...COMMON_PROPS
        ]);
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.TABLE
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual([
          'binary',
          'onViewportLoad',
          'fetch',
          ...COMMON_PROPS
        ]);
      });
    });

    describe('when maps_api_version is V3', () => {
      test('should return correct props when source type is tileset', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.TILESET
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual([
          'binary',
          'onViewportLoad',
          'fetch',
          ...COMMON_PROPS
        ]);
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.QUERY
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual(['onDataLoad', ...COMMON_PROPS]);
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.TABLE
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current)).toEqual(['onDataLoad', ...COMMON_PROPS]);
      });
    });
  });

  describe('should has correct filter configurations', () => {
    test('uniqueIdProperty should be undefined', () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.uniqueIdProperty).toBeUndefined();
    });

    test('onViewportLoad should be a function', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V2
        },
        type: MAP_TYPES.TILESET
      };

      const { result } = renderHook(() => useCartoLayerProps({ source }));

      expect(result.current.onViewportLoad).toBeInstanceOf(Function);
    });

    test('binary should be true', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V2
        },
        type: MAP_TYPES.TILESET
      };

      const { result } = renderHook(() => useCartoLayerProps({ source }));

      expect(result.current.binary).toBe(true);
    });

    test('onDataLoad should be a function', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V3
        },
        type: MAP_TYPES.QUERY
      };

      const { result } = renderHook(() => useCartoLayerProps({ source }));

      expect(result.current.onDataLoad).toBeInstanceOf(Function);
    });

    test('getFilterValue should be a function', () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.getFilterValue).toBeInstanceOf(Function);
    });

    test('filter range should be between 1 and 1 for the first element of the array', () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.filterRange).toEqual([
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ]);
    });

    test('extensions should have an unique instance of DataFilterExtension', () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.extensions.length).toBe(1);
      expect(result.current.extensions[0]).toBeInstanceOf(DataFilterExtension);
    });

    test(`filter size should be ${MAX_GPU_FILTERS}`, () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.extensions[0].opts.filterSize).toEqual(MAX_GPU_FILTERS);
    });

    test('getFilterValue trigger should be present', () => {
      const { result } = renderHook(() => useCartoLayerProps({}));

      expect(result.current.updateTriggers).toHaveProperty('getFilterValue');
    });
  });

  mockClear();
});
