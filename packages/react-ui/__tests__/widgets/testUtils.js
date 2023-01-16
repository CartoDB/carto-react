import * as echarts from 'echarts';

export function currencyFormatter(value) {
  return {
    prefix: '$',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(isNaN(value) ? 0 : value)
  };
}

export const mockEcharts = {
  init() {
    jest.spyOn(echarts, 'getInstanceByDom').mockImplementation(() => ({
      hideLoading: jest.fn(),
      getOption: jest.fn(() => ({
        series: [
          {
            data: [
              {
                disabled: true,
                itemStyle: {}
              }
            ]
          }
        ]
      })),
      setOption: jest.fn(() => ({
        disabled: true,
        itemStyle: {}
      })),
      showLoading: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      getZr: jest.fn()
    }));
  },
  destroy() {
    jest.restoreAllMocks();
  }
};
