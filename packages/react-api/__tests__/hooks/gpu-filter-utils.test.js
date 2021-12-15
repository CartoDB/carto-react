// import { DataFilterExtension } from '@deck.gl/extensions';
// import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
// import { renderHook } from '@testing-library/react-hooks';
// import useCartoLayerProps from '../../src/hooks/useCartoLayerProps';
// import { mockReduxHooks, mockClear } from '../mockReduxHooks';

import { getGpuFilter, MAX_GPU_FILTERS } from '../../src/hooks/gpu-filter-utils';

describe('gpu-filter-utils', () => {
  test('correct GPU filter size', () => {
    expect(MAX_GPU_FILTERS).toEqual(4);
  });

  test('correct values with not time filter', () => {
    const filters = {
      storetype: {
        in: {
          values: ['Supermarket'],
          owner: 'revenueByStoreType'
        }
      },
      revenue: {
        closed_open: {
          values: [[1400000, 1500000]],
          owner: 'storesByRevenue'
        }
      }
    };
    const featurePassFilter = {
      properties: {
        storetype: 'Supermarket',
        revenue: 1400001
      }
    };
    const featureNotFilter = {
      properties: {
        storetype: 'Supermarket',
        revenue: 100
      }
    };
    const { filterRange, filterValueUpdateTriggers, getFilterValue } = getGpuFilter(
      filters
    );

    expect(filterRange.length).toEqual(MAX_GPU_FILTERS);
    filterRange.forEach((range, index) => {
      const valueExpected = index === 0 ? [1, 1] : [0, 0];
      expect(range).toEqual(valueExpected);
    });

    expect(filterValueUpdateTriggers).toEqual(JSON.stringify(filters));

    expect(getFilterValue(featurePassFilter)).toEqual([1, 0, 0, 0]);
    expect(getFilterValue(featureNotFilter)).toEqual([0, 0, 0, 0]);
  });

  test.only('correct values with time filter', () => {
    const filters = {
      storetype: {
        in: {
          values: ['Supermarket'],
          owner: 'revenueByStoreType'
        }
      },
      dateTime: {
        time: {
          values: [[473385600000, 504921600000]],
          owner: 'storesByRevenue'
        }
      }
    };

    const feature = {
      properties: {
        storetype: 'Supermarket',
        dateTime: 473385600001
      }
    };

    const { filterRange, filterValueUpdateTriggers, getFilterValue } = getGpuFilter(
      filters
    );

    filterRange.forEach((range, index) => {
      if (index === 0) {
        expect(range).toEqual([1, 1]);
      } else if (index === 1) {
        expect(range).toEqual(filters.dateTime.time.values[0]);
      } else {
        expect(range).toEqual([0, 0]);
      }
    });

    filters.dateTime.time = {};
    expect(filterValueUpdateTriggers).toEqual(JSON.stringify(filters));
    expect(getFilterValue(feature)).toEqual([1, feature.properties.dateTime, 0, 0]);
  });
});
