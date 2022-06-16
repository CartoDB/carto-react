import sortArrayByPropValues from '../../../src/widgets/utils/sortArrayByPropValues';

describe('sortArrayByPropValues', () => {
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

  test('should ignore not existing prop', () => {
    const ORDER = ['storesLayer3', 'storesLayer2', 'storesLayer1', 'storesLayer0'];
    sortArrayByPropValues(ELEMENTS, ORDER, 'not_existing_prop');
    expect(ELEMENTS).toStrictEqual(ELEMENTS);
  });
  test('should ignore not existing values', () => {
    const ORDER = [
      'not_existing_value',
      'storesLayer3',
      'storesLayer1',
      'storesLayer2',
      'storesLayer0'
    ];
    const [, ...EXISTING_VALUES] = ORDER;
    expect(EXISTING_VALUES).toStrictEqual(
      sortArrayByPropValues(ELEMENTS, ORDER, 'id')
        .map(({ id }) => id)
        .splice(0, EXISTING_VALUES.length)
        .reverse()
    );
  });

  test('should add missing values at start', () => {
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0'];
    const ORDERED_ELEMENTS = sortArrayByPropValues(ELEMENTS, ORDER, 'id')
      .map(({ id }) => id)
      .splice(0, 1);
    expect(ORDERED_ELEMENTS.every((id) => ORDER.indexOf(id) === -1)).toBeTruthy();
    expect(ORDERED_ELEMENTS.length).toBe(1);
  });
  test('should add element without prop at start', () => {
    const ELEMENT_WITH_NO_PROP = [
      ...ELEMENTS,
      {
        source: 'storesSource',
        title: 'Store types 4'
      }
    ];
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0'];
    const ORDERED_ELEMENTS = sortArrayByPropValues(
      ELEMENT_WITH_NO_PROP,
      ORDER,
      'id'
    ).splice(0, 1);
    expect(ORDERED_ELEMENTS.every((el) => !el.hasOwnProperty('id'))).toBeTruthy();
    expect(ORDERED_ELEMENTS.length).toBe(1);
  });

  test('should sort in reverse order', () => {
    const ORDER = ['storesLayer1', 'storesLayer2', 'storesLayer0', 'storesLayer3'];
    const ORDERED_ELEMENTS = sortArrayByPropValues(ELEMENTS, ORDER, 'id').map(
      ({ id }) => id
    );
    expect(ORDER).toStrictEqual(ORDERED_ELEMENTS.reverse());
  });
});
