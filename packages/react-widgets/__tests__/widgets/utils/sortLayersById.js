import sortLayersById from '../../../src/widgets/utils/sortLayersById';

describe('sortLayersById', () => {
  let ELEMENTS = [];
  beforeAll(() => {
    ELEMENTS = [
      {
        id: 'storesLayer0',
        source: 'storesSource',
        title: 'Store types 0'
      },
      {
        id: 'storesLayer1',
        source: 'storesSource',
        title: 'Store types 1'
      },
      {
        id: 'storesLayer2',
        source: 'storesSource',
        title: 'Store types 2'
      },
      {
        id: 'storesLayer3',
        source: 'storesSource',
        title: 'Store types 3'
      }
    ];
  });

  test('should ignore not existing ids', () => {
    const ORDER = [
      'not_existing_value',
      'storesLayer3',
      'storesLayer1',
      'storesLayer2',
      'storesLayer0'
    ];
    expect(ORDER.slice(1)).toStrictEqual(
      sortLayersById(ELEMENTS, ORDER)
        .map(({ id }) => id)
        .reverse()
    );
  });

  test('should add missing ids at end', () => {
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0'];
    const ORDERED_ELEMENTS = sortLayersById(ELEMENTS, ORDER)
      .map(({ id }) => id)
      .slice(ORDER.length);
    expect(ORDERED_ELEMENTS.every((id) => ORDER.indexOf(id) === -1)).toBeTruthy();
    expect(ORDERED_ELEMENTS.length).toBe(1);
  });
  test('should throw an error when elements have no id property', () => {
    const ELEMENT_WITH_NO_PROP = [
      ...ELEMENTS,
      {
        source: 'storesSource',
        title: 'Store types 4'
      }
    ];
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0'];
    expect(() => sortLayersById(ELEMENT_WITH_NO_PROP, ORDER)).toThrowError(
      'Layers must have an id property'
    );
  });

  test('should sort in reverse order', () => {
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0', 'storesLayer3'];
    const ORDERED_ELEMENTS = sortLayersById(ELEMENTS, ORDER).map(({ id }) => id);
    expect(ORDER).toStrictEqual(ORDERED_ELEMENTS.reverse());
  });
});
