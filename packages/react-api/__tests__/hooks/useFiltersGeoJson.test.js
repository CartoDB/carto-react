import { renderHook } from '@testing-library/react-hooks';
import useFiltersGeoJson from '../../src/hooks/geojson/useFiltersGeoJson';
import * as redux from 'react-redux';

const spy = jest.spyOn(redux, 'useSelector');

const SOURCE = {
  id: 'sourceId'
};

const FEATURES = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.0643, 42.35392]
    },
    properties: { cartodb_id: 302 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.57506, 44.49876]
    },
    properties: { cartodb_id: 444 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-76.98689, 41.22844]
    },
    properties: { cartodb_id: 1993 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-79.17348, 34.81043]
    },
    properties: { cartodb_id: 3300 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.67071, 34.7753]
    },
    properties: { cartodb_id: 5387 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-86.11238, 42.80297]
    },
    properties: { cartodb_id: 7615 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-96.66324, 35.75362]
    },
    properties: { cartodb_id: 10236 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-117.20269, 32.89341]
    },
    properties: { cartodb_id: 12921 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.01792, 35.63505]
    },
    properties: {
      cartodb_id: 5566
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-96.68754, 43.52982]
    },
    properties: { cartodb_id: 7919 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-116.21464, 43.59429]
    },
    properties: { cartodb_id: 11713 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-92.99341, 43.6801]
    },
    properties: { cartodb_id: 7847 }
  }
].map((feature, idx) => ({
  ...feature,
  properties: {
    ...feature.properties,
    timeCol: idx
  }
}));

const FILTERING_GEOMETRY = {
  type: 'Polygon',
  coordinates: [
    [
      [-70.9643, 41.95392],
      [-71.0643, 42.35392],
      [-70.9643, 41.95392]
    ]
  ]
};

describe('useFiltersGeoJson', () => {
  beforeEach(() => {
    spy.mockReturnValue(null);
  });

  test('should return a function', () => {
    expect(typeof callUseFiltersGeoJson({ source: SOURCE })).toBe('function');
  });

  describe('getFilterValue', () => {
    test('should filter spatially correctly', () => {
      spy.mockReturnValue(FILTERING_GEOMETRY);

      const getFilterValue = callUseFiltersGeoJson({ source: SOURCE });
      // Only the first element pass the spatial filter
      FEATURES.slice(0, 1).forEach((feature) =>
        expect(getFilterValue(feature)).toEqual([1, 0, 0, 0])
      );
      FEATURES.slice(1, FEATURES.length).forEach((feature) =>
        expect(getFilterValue(feature)).toEqual([0, 0, 0, 0])
      );
    });

    test('should return time column correctly', () => {
      const sourceWithFilter = {
        ...SOURCE,
        filters: { timeCol: { time: { values: [[0, 2]] } } }
      };
      const getFilterValue = callUseFiltersGeoJson({ source: sourceWithFilter });
      FEATURES.forEach((feature) => {
        expect(getFilterValue(feature)).toEqual([1, feature.properties.timeCol, 0, 0]);
      });
    });

    test('should filter correctly using C4R filters (no time filter)', () => {
      const SELECTED_CARTODB_ID = 7919;
      const sourceWithFilter = {
        ...SOURCE,
        filters: { cartodb_id: { in: { values: [SELECTED_CARTODB_ID] } } }
      };
      const getFilterValue = callUseFiltersGeoJson({ source: sourceWithFilter });
      FEATURES.forEach((feature) =>
        expect(getFilterValue(feature)).toEqual([
          Number(feature.properties.cartodb_id === SELECTED_CARTODB_ID),
          0,
          0,
          0
        ])
      );
    });

    test('should filter correctly (using spatial filter, C4R filters and time filter)', () => {
      spy.mockReturnValue(FILTERING_GEOMETRY);
      const SELECTED_CARTODB_ID = 7919;
      const sourceWithFilters = {
        ...SOURCE,
        filters: {
          cartodb_id: { in: { values: [SELECTED_CARTODB_ID] } },
          timeCol: { time: { values: [[0, 2]] } }
        }
      };
      const getFilterValue = callUseFiltersGeoJson({ source: sourceWithFilters });
      FEATURES.forEach((feature, idx) =>
        expect(getFilterValue(feature)).toEqual([
          // Only the first element pass the spatial filter
          Number(idx === 0 && feature.properties.cartodb_id === SELECTED_CARTODB_ID),
          feature.properties.timeCol,
          0,
          0
        ])
      );
    });

    test('should pass all features if no filter is present', () => {
      const getFilterValue = callUseFiltersGeoJson({ source: SOURCE });
      FEATURES.forEach((feature) =>
        expect(getFilterValue(feature)).toEqual([1, 0, 0, 0])
      );
    });
  });
});

// Aux
function callUseFiltersGeoJson(...args) {
  const {
    result: { current: getFilterValue }
  } = renderHook(() => useFiltersGeoJson(...args));
  return getFilterValue;
}
