import {
  areChartPropsEqual,
  applyChartFilter,
  defaultTooltipFormatter
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
    const mockedTheme = { palette: { charts: { disabled: { color: '#fff' } } } };

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

  describe('defaultTooltipFormatter', () => {
    const DOT_COLOR = '#47db99';
    const VALUE = 500;
    const PARAMS = [
      {
        componentType: 'series',
        componentSubType: 'bar',
        componentIndex: 0,
        seriesType: 'bar',
        seriesIndex: 0,
        seriesId: '\u0000\u00000',
        seriesName: '',
        name: '300',
        dataIndex: 2,
        data: {
          value: VALUE
        },
        value: VALUE,
        color: DOT_COLOR,
        dimensionNames: ['x', 'y', null, null],
        encode: {
          x: [0],
          y: [1]
        },
        $vars: ['seriesName', 'name', 'value'],
        axisDim: 'x',
        axisIndex: 0,
        axisType: 'xAxis.category',
        axisId: '\u0000series\u00000\u00000',
        axisValue: '300',
        axisValueLabel: '300',
        marker:
          '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#47db99;"></span>'
      }
    ];

    const X_AXIS_FORMATTER = (value) => '$' + value;
    const Y_AXIS_FORMATTER = (value) => '€' + value;

    test('should render color dot', () => {
      const tooltipHtml = defaultTooltipFormatter(
        X_AXIS_FORMATTER,
        Y_AXIS_FORMATTER,
        PARAMS
      );
      expect(tooltipHtml?.includes(DOT_COLOR)).toBe(true);
    });

    test('should show value applying yAxisFormatter', () => {
      const tooltipHtml = defaultTooltipFormatter(
        X_AXIS_FORMATTER,
        Y_AXIS_FORMATTER,
        PARAMS
      );
      expect(tooltipHtml?.includes(Y_AXIS_FORMATTER(VALUE))).toBe(true);
    });

    test('should show value', () => {
      const tooltipHtml = defaultTooltipFormatter(
        X_AXIS_FORMATTER,
        Y_AXIS_FORMATTER,
        null
      );

      const tooltipHtml2 = defaultTooltipFormatter(
        X_AXIS_FORMATTER,
        Y_AXIS_FORMATTER,
        []
      );

      expect(tooltipHtml).toBe(null);
      expect(tooltipHtml2).toBe(null);
    });
  });
});
