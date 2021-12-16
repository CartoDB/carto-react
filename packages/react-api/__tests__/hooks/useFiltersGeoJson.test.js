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
    properties: { cartodb_id: 302, timeCol: 0 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.57506, 44.49876]
    },
    properties: { cartodb_id: 444, timeCol: 1 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-76.98689, 41.22844]
    },
    properties: { cartodb_id: 1993, timeCol: 2 }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-79.17348, 34.81043]
    },
    properties: { cartodb_id: 3300, timeCol: 3 }
  }
];

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
