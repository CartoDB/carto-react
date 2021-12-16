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
    properties: {
      cartodb_id: 302,
      storetype: 'Drugstore',
      address: '146 TREMONT ST',
      city: 'BOSTON',
      state: 'MA',
      zip: '2111',
      store_id: 439,
      revenue: 1301427,
      size_m2: 846
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.57506, 44.49876]
    },
    properties: {
      cartodb_id: 444,
      storetype: 'Supermarket',
      address: '258  MAIN STREET',
      city: 'LANCASTER',
      state: 'NH',
      zip: '3584',
      store_id: 2158,
      revenue: 1404681,
      size_m2: 767
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-76.98689, 41.22844]
    },
    properties: {
      cartodb_id: 1993,
      storetype: 'Supermarket',
      address: '180 MONTGOMERY RD',
      city: 'SOUTH WILLIAMSPORT',
      state: 'PA',
      zip: '17702',
      store_id: 3260,
      revenue: 1492546,
      size_m2: 109
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-79.17348, 34.81043]
    },
    properties: {
      cartodb_id: 3300,
      storetype: 'Supermarket',
      address: '613 E 4TH AVE',
      city: 'RED SPRINGS',
      state: 'NC',
      zip: '28377',
      store_id: 4224,
      revenue: 1357003,
      size_m2: 783
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.67071, 34.7753]
    },
    properties: {
      cartodb_id: 5387,
      storetype: 'Supermarket',
      address: '4201 JACKSON HWY',
      city: 'SHEFFIELD',
      state: 'AL',
      zip: '35660',
      store_id: 5711,
      revenue: 1523344,
      size_m2: 376
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-86.11238, 42.80297]
    },
    properties: {
      cartodb_id: 7615,
      storetype: 'Supermarket',
      address: '213 N RIVER AVE',
      city: 'HOLLAND',
      state: 'MI',
      zip: '49424',
      store_id: 7458,
      revenue: 1424545,
      size_m2: 520
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-96.66324, 35.75362]
    },
    properties: {
      cartodb_id: 10236,
      storetype: 'Supermarket',
      address: '801 ADA WEBB DR',
      city: 'STROUD',
      state: 'OK',
      zip: '74079',
      store_id: 9381,
      revenue: 1583047,
      size_m2: 760
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-117.20269, 32.89341]
    },
    properties: {
      cartodb_id: 12921,
      storetype: 'Supermarket',
      address: '9440 SCRANTON RD',
      city: 'SAN DIEGO',
      state: 'CA',
      zip: '92121',
      store_id: 11064,
      revenue: 1851285,
      size_m2: 442
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.01792, 35.63505]
    },
    properties: {
      cartodb_id: 5566,
      storetype: 'Supermarket',
      address: '110 BEAR CREEK PIKE',
      city: 'COLUMBIA',
      state: 'TN',
      zip: '38401-2261',
      store_id: 5839,
      revenue: 1510718,
      size_m2: 650
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-96.68754, 43.52982]
    },
    properties: {
      cartodb_id: 7919,
      storetype: 'Supermarket',
      address: '3101 E 26TH ST',
      city: 'SIOUX FALLS',
      state: 'SD',
      zip: '57103-4033',
      store_id: 7686,
      revenue: 1831190,
      size_m2: 258
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-116.21464, 43.59429]
    },
    properties: {
      cartodb_id: 11713,
      storetype: 'Supermarket',
      address: '1185 VISTA AVE',
      city: 'BOISE',
      state: 'ID',
      zip: '83705-2430',
      store_id: 10298,
      revenue: 1588175,
      size_m2: 886
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-92.99341, 43.6801]
    },
    properties: {
      cartodb_id: 7847,
      storetype: 'Discount Store',
      address: '1402 14TH ST NW',
      city: 'AUSTIN',
      state: 'MN',
      zip: '55912',
      store_id: 967,
      revenue: 1548809,
      size_m2: 673
    }
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
