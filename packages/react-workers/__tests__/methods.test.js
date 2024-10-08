import {
  getFormula,
  getHistogram,
  getGeojsonFeatures,
  loadGeoJSONFeatures,
  getRawFeatures
} from '../src/workers/methods';
import { sampleGeoJson } from './sampleGeojson';

describe('Worker Methods', () => {
  beforeEach(() => {
    loadGeoJSONFeatures({ geojson: sampleGeoJson });
    getGeojsonFeatures({
      viewport: [
        -119.8541879250893, 19.66738891368218, -61.31673251486329, 54.38309840045979
      ],
      geometry: null,
      uniqueIdProperty: undefined
    });
  });
  describe('getFormula', () => {
    it('counts features', () => {
      expect(
        getFormula({
          operation: 'count',
          column: undefined,
          filters: {},
          filtersLogicalOperator: undefined,
          joinOperation: undefined
        })
      ).toEqual({ value: 6 });
    });
    it('counts features with filter', () => {
      expect(
        getFormula({
          filters: {
            city: {
              in: {
                owner: 'widgetId1',
                values: ['BOSTON']
              }
            }
          },
          filtersLogicalOperator: undefined,
          column: undefined,
          joinOperation: undefined,
          operation: 'count'
        })
      ).toEqual({
        value: 3
      });
    });
  });
  describe('getHistogram', () => {
    it('creates histogram', () => {
      expect(
        getHistogram({
          column: 'revenue',
          operation: 'count',
          ticks: [997472.3, 1716077, 2056468.7],
          filters: {},
          filtersLogicalOperator: undefined,
          joinOperation: undefined
        })
      ).toEqual([0, 4, 2, 0]);
    });
  });
  describe('getRawFeatures', () => {
    it('returns all features properties in unspecified order', () => {
      expect(
        getRawFeatures({
          filters: {},
          filtersLogicalOperator: undefined,
          sortBy: undefined,
          sortByDirection: undefined,
          sortByColumnType: undefined
        })
      ).toEqual({
        totalCount: 6,
        hasData: true,
        rows: sampleGeoJson.features.map((f) => f.properties)
      });
    });
    it('returns all features properties in specified order', () => {
      expect(
        getRawFeatures({
          filters: {},
          filtersLogicalOperator: undefined,
          sortBy: 'size_m2',
          sortByDirection: 'desc',
          sortByColumnType: 'number'
        })
      ).toEqual({
        totalCount: 6,
        hasData: true,
        rows: sampleGeoJson.features
          .map((f) => f.properties)
          .sort((a, b) => b.size_m2 - a.size_m2)
      });
    });

    it('should not filter when searchFilterColumn is provided, but searchFilterText is not', () => {
      expect(
        getRawFeatures({
          searchFilterColumn: Object.keys(sampleGeoJson.features[0].properties)[0],
          searchFilterText: null
        })
      ).toEqual({
        totalCount: 6,
        hasData: true,
        rows: sampleGeoJson.features.map((f) => f.properties)
      });
    });

    it('should not filter when searchFilterText is provided, but searchFilterColumn is not', () => {
      expect(
        getRawFeatures({
          searchFilterColumn: null,
          searchFilterText: 'any-text'
        })
      ).toEqual({
        totalCount: 6,
        hasData: true,
        rows: sampleGeoJson.features.map((f) => f.properties)
      });
    });

    it('should filter when searchFilterColumn and searchFilterText are provided', () => {
      const searchFilterColumn = Object.keys(sampleGeoJson.features[0].properties)[0];

      const result = getRawFeatures({
        searchFilterColumn,
        searchFilterText: sampleGeoJson.features[0].properties[searchFilterColumn]
      });

      expect(result).toEqual({
        totalCount: 1,
        hasData: true,
        rows: [sampleGeoJson.features.map((f) => f.properties)[0]]
      });
    });
  });
});
