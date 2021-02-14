import { BASEMAPS } from 'src/basemaps/basemaps';

describe('basemaps', () => {
  test('should export allowed basemaps', () => {
    expect(Object.keys(BASEMAPS)).toEqual([
      'positron',
      'voyager',
      'dark-matter',
      'roadmap',
      'satellite',
      'hybrid'
    ]);
  });

  test('should has a valid type', () => {
    for (const value of Object.values(BASEMAPS)) {
      expect(value.type === 'mapbox' || value.type === 'gmaps').toBe(true);
    }
  });

  describe('options', () => {
    for (const [key, value] of Object.entries(BASEMAPS)) {
      if ('mapStyle' in value.options) {
        test('carto basemaps should include a mapbox style json url', () => {
          expect(value.options.mapStyle).toEqual(
            `https://basemaps.cartocdn.com/gl/${key}-gl-style/style.json`
          );
        });
      }

      if ('mapTypeId' in value.options) {
        test('google basemaps should include a mapTypeId that matches own object key', () => {
          expect(value.options.mapTypeId).toEqual(key);
        });
      }
    }
  });
});
