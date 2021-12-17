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
      'extensions'
    ];

    const MVT_LAYER_PROPS = ['binary', 'onViewportLoad', 'fetch'];

    const GEOJSON_LAYER_PROPS = ['onDataLoad', 'updateTriggers', 'getFilterValue'];

    describe('when maps_api_version is V2', () => {
      test('should return correct props when source type is tileset', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.TILESET
        };

        const keys = getUseCartoLayerPropsKeys({ source });

        compareKeys(keys, [...MVT_LAYER_PROPS, ...COMMON_PROPS]);
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.QUERY
        };

        const keys = getUseCartoLayerPropsKeys({ source });

        compareKeys(keys, [...MVT_LAYER_PROPS, ...COMMON_PROPS]);
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V2
          },
          type: MAP_TYPES.TABLE
        };

        const keys = getUseCartoLayerPropsKeys({ source });

        compareKeys(keys, [...MVT_LAYER_PROPS, ...COMMON_PROPS]);
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

        const keys = getUseCartoLayerPropsKeys({ source });

        compareKeys(keys, [...MVT_LAYER_PROPS, ...COMMON_PROPS]);
      });

      test('should return correct props when source type is sql', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.QUERY
        };

        const props = callUseCartoLayerProps({ source });

        compareKeys(Object.keys(props), [...GEOJSON_LAYER_PROPS, ...COMMON_PROPS]);
        expect(props.getFilterValue).toBeInstanceOf(Function);
        expect(props.updateTriggers).toHaveProperty('getFilterValue');
      });

      test('should return correct props when source type is table', () => {
        const source = {
          credentials: {
            apiVersion: API_VERSIONS.V3
          },
          type: MAP_TYPES.TABLE
        };

        const props = callUseCartoLayerProps({ source });

        compareKeys(Object.keys(props), [...GEOJSON_LAYER_PROPS, ...COMMON_PROPS]);
        expect(props.getFilterValue).toBeInstanceOf(Function);
        expect(props.updateTriggers).toHaveProperty('getFilterValue');
      });
    });
  });

  describe('should has correct filter configurations', () => {
    test('uniqueIdProperty should be undefined', () => {
      const props = callUseCartoLayerProps({});

      expect(props.uniqueIdProperty).toBeUndefined();
    });

    test('onViewportLoad should be a function', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V2
        },
        type: MAP_TYPES.TILESET
      };

      const props = callUseCartoLayerProps({ source });

      expect(props.onViewportLoad).toBeInstanceOf(Function);
    });

    test('binary should be true', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V2
        },
        type: MAP_TYPES.TILESET
      };

      const props = callUseCartoLayerProps({ source });

      expect(props.binary).toBe(true);
    });

    test('onDataLoad should be a function', () => {
      const source = {
        credentials: {
          apiVersion: API_VERSIONS.V3
        },
        type: MAP_TYPES.QUERY
      };

      const props = callUseCartoLayerProps({ source });

      expect(props.onDataLoad).toBeInstanceOf(Function);
    });

    test('filter range should be between 1 and 1 for the first element of the array', () => {
      const props = callUseCartoLayerProps({});

      expect(props.filterRange).toEqual([
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0]
      ]);
    });

    test('extensions should have an unique instance of DataFilterExtension', () => {
      const props = callUseCartoLayerProps({});

      expect(props.extensions.length).toBe(1);
      expect(props.extensions[0]).toBeInstanceOf(DataFilterExtension);
    });

    test(`filter size should be ${MAX_GPU_FILTERS}`, () => {
      const props = callUseCartoLayerProps({});

      expect(props.extensions[0].opts.filterSize).toEqual(MAX_GPU_FILTERS);
    });
  });

  mockClear();
});

// Aux
function callUseCartoLayerProps(...args) {
  const {
    result: { current }
  } = renderHook(() => useCartoLayerProps(...args));
  return current;
}

function getUseCartoLayerPropsKeys(...args) {
  const res = callUseCartoLayerProps(...args);
  return Object.keys(res);
}

function compareKeys(firstKeys, secondKeys) {
  expect(firstKeys.sort()).toEqual(secondKeys.sort());
}
