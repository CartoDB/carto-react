import { ResultFormat } from '@carto/react-core';
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
      geometry: null
    });
  });
  describe('getFormula', () => {
    it('counts features', () => {
      expect(getFormula({ operation: 'count' })).toEqual({ value: 6 });
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
          ticks: [997472.3, 1716077, 2056468.7]
        })
      ).toEqual([0, 4, 2, 0]);
    });
  });
  describe('getRawFeatures', () => {
    it('returns all features properties', () => {
      expect(getRawFeatures({})).toEqual({
        currentPage: 0,
        pages: 1,
        totalCount: 6,
        data: sampleGeoJson.features.map((f) => f.properties)
      });
    });
    it('returns whole features with geometry resultFormat=GeoJsonFeature', () => {
      expect(getRawFeatures({ resultFormat: ResultFormat.GeoJsonFeature })).toEqual({
        currentPage: 0,
        pages: 1,
        totalCount: 6,
        data: sampleGeoJson.features
      });
    });
    it('supports limit and returns paging info', () => {
      expect(getRawFeatures({ limit: 3 })).toEqual({
        currentPage: 0,
        pages: 2,
        totalCount: 6,
        data: sampleGeoJson.features.slice(0, 3).map((f) => f.properties)
      });
    });
  });
});
