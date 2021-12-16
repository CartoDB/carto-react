import { applyFiltersToTileContent } from '../../src/filters/applyFiltersToTileContent';
import {
  EMPTY_LINES_BINARY_DATA,
  EMPTY_POINTS_BINARY_DATA,
  POLYGONS_BINARY_DATA
} from './constants';

const FILTERS = {
  cartodb_id: {
    in: {
      values: [78]
    }
  },
  name: {
    in: {
      values: ['North Dakota']
    }
  }
};

const TILE_CONTENT = {
  byteLength: 0,
  polygons: POLYGONS_BINARY_DATA,
  points: EMPTY_POINTS_BINARY_DATA,
  lines: EMPTY_LINES_BINARY_DATA
};

describe('applyFiltersToTileContent', () => {
  test('should add getFilterValue binary attribute', () => {
    const tileContentWithGetFilterValue = applyFiltersToTileContent(
      TILE_CONTENT,
      FILTERS
    );

    ['points', 'lines', 'polygons'].forEach((key) => {
      expect(tileContentWithGetFilterValue[key]).toHaveProperty('attributes');
      expect(tileContentWithGetFilterValue[key].attributes).toHaveProperty(
        'getFilterValue'
      );
    });
  });

  test('should consider previous getFilterValue values', () => {
    const polygonsBinaryWithDataAttributes = {
      ...POLYGONS_BINARY_DATA,
      attributes: {
        getFilterValue: {
          value: Uint16Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        }
      }
    };

    const tileContentWithGetFilterValue = applyFiltersToTileContent(
      { ...TILE_CONTENT, polygons: polygonsBinaryWithDataAttributes },
      FILTERS
    );

    // Since previous getFilterValue value is full of 0,
    // after applying C4R filters, the value will remain 0
    tileContentWithGetFilterValue.polygons.attributes.getFilterValue.value.forEach((el) =>
      expect(el).toEqual(0)
    );
  });

  test('should apply filters correctly', () => {
    const tileContentWithGetFilterValue = applyFiltersToTileContent(
      TILE_CONTENT,
      FILTERS
    );

    // First feature from 0 to 4
    tileContentWithGetFilterValue.polygons.attributes.getFilterValue.value
      .subarray(0, 5)
      .forEach((doesPassed) => expect(doesPassed).toBe(1));

    // Second feature from 5 to 10
    tileContentWithGetFilterValue.polygons.attributes.getFilterValue.value
      .subarray(5, 10)
      .forEach((doesPassed) => expect(doesPassed).toBe(0));
  });

  test('should return same tile content if arguments are invalid (filters is null, empty or tile content is empty)', () => {
    const tileContentWithGetFilterValue1 = applyFiltersToTileContent(TILE_CONTENT, null);
    const tileContentWithGetFilterValue2 = applyFiltersToTileContent(TILE_CONTENT, {});
    const tileContentWithGetFilterValue3 = applyFiltersToTileContent(null, FILTERS);

    expect(tileContentWithGetFilterValue1).toBe(TILE_CONTENT);
    expect(tileContentWithGetFilterValue2).toBe(TILE_CONTENT);
    expect(tileContentWithGetFilterValue3).toBe(null);
  });
});
