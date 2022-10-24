import {
  areChartPropsEqual,
  applyChartFilter
} from '../../../src/widgets/utils/chartUtils';

describe('chart utils', () => {
  describe('isDataEqual', () => {
    const buildMockedData = (value) => ({
      series: [{ data: [{ value }] }]
    });

    test('should be equal', () => {
      const prevData = buildMockedData(1);
      const nextData = buildMockedData(1);
      expect(areChartPropsEqual(prevData, nextData)).toBe(true);
    });

    test('should not be equal', () => {
      const prevData = buildMockedData(1);
      const nextData = buildMockedData(2);
      expect(areChartPropsEqual(prevData, nextData)).toBe(false);
    });
  });

  describe('applyChartFilter', () => {
    const mockedTheme = {
      palette: { common: { black: { color: '#000' } } }
    };

    test('should enable a clicked item', () => {
      const serie = { data: [{ disabled: true }] };
      applyChartFilter(serie, 0, mockedTheme);
      expect(serie.data[0].disabled).toBe(false);
    });

    test('clicked item should remains disabled', () => {
      const serie = { data: [{ disabled: false }] };
      applyChartFilter(serie, 0, mockedTheme);
      expect(serie.data[0].disabled).toBe(false);
    });

    test('should disable a non-clicked item', () => {
      const serie = { data: [{ disabled: false }, { disabled: false }] };
      applyChartFilter(serie, 0, mockedTheme);
      expect(serie.data[1].disabled).toBe(true);
    });

    test('should enable all items', () => {
      const serie = {
        data: [{ disabled: true }, { disabled: false }, { disabled: true }]
      };
      applyChartFilter(serie, 1, mockedTheme);
      expect(serie.data.every((d) => !d.disabled)).toBe(true);
    });
  });
});
