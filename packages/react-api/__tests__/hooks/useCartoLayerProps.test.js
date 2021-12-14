import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { renderHook } from '@testing-library/react-hooks';
import useCartoLayerProps from '../../src/hooks/useCartoLayerProps';
import { mockReduxHooks, mockClear } from '../mockReduxHooks';

describe('useCartoLayerProps', () => {
  mockReduxHooks();

  const SOURCE_WITH_FILTERS = {
    filters: { cartodb_id: { values: [1] } },
    credentials: { apiVersion: 'v3' }
  };

  describe('return props', () => {
    const COMMON_PROPS = [
      'uniqueIdProperty',
      'data',
      'type',
      'connection',
      'credentials',
      'filterRange',
      'extensions',
      'dataComparator'
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

        expect(Object.keys(result.current).sort()).toEqual(
          ['binary', 'onViewportLoad', 'fetch', 'renderSubLayers', ...COMMON_PROPS].sort()
        );
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.QUERY
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current).sort()).toEqual(
          ['binary', 'onViewportLoad', 'fetch', 'renderSubLayers', ...COMMON_PROPS].sort()
        );
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.TABLE
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current).sort()).toEqual(
          ['binary', 'onViewportLoad', 'fetch', 'renderSubLayers', ...COMMON_PROPS].sort()
        );
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

        expect(Object.keys(result.current).sort()).toEqual(
          ['binary', 'onViewportLoad', 'fetch', 'renderSubLayers', ...COMMON_PROPS].sort()
        );
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.QUERY
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current).sort()).toEqual(
          ['onDataLoad', 'getFilterValue', 'updateTriggers', ...COMMON_PROPS].sort()
        );
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.TABLE
        };

        const { result } = renderHook(() => useCartoLayerProps({ source }));

        expect(Object.keys(result.current).sort()).toEqual(
          ['onDataLoad', 'getFilterValue', 'updateTriggers', ...COMMON_PROPS].sort()
        );
      });
    });

    test('getFilterValue should be a function using sql or table', () => {
      const sourceWithTable = {
        credentials: {
          apiVersion: API_VERSIONS.V3
        },
        type: MAP_TYPES.TABLE
      };
      const sourceWithQuery = {
        credentials: {
          apiVersion: API_VERSIONS.V3
        },
        type: MAP_TYPES.QUERY
      };

      const { result: resultWithTable } = renderHook(() =>
        useCartoLayerProps({ source: sourceWithTable })
      );
      const { result: resultWithQuery } = renderHook(() =>
        useCartoLayerProps({ source: sourceWithQuery })
      );

      expect(resultWithTable.current.getFilterValue).toBeInstanceOf(Function);
      expect(resultWithQuery.current.getFilterValue).toBeInstanceOf(Function);
    });

    test('getFilterValue should not be present when source is tileset', () => {
      const { result } = renderHook(() =>
        useCartoLayerProps({ source: SOURCE_WITH_FILTERS })
      );

      expect(result.current.getFilterValue).toBe(undefined);
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

    test('filter range should be between 1 and 1', () => {
      const { result } = renderHook(() =>
        useCartoLayerProps({ source: SOURCE_WITH_FILTERS })
      );

      expect(result.current.filterRange).toEqual([1, 1]);
    });

    test('extensions should have an unique instance of DataFilterExtension', () => {
      const { result } = renderHook(() =>
        useCartoLayerProps({ source: SOURCE_WITH_FILTERS })
      );

      expect(result.current.extensions.length).toBe(1);
      expect(result.current.extensions[0]).toBeInstanceOf(DataFilterExtension);
    });

    test('filter size should be 1', () => {
      const { result } = renderHook(() =>
        useCartoLayerProps({ source: SOURCE_WITH_FILTERS })
      );

      expect(result.current.extensions[0].opts.filterSize).toEqual(1);
    });
  });

  mockClear();
});
