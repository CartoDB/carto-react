import React from 'react';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme
} from '@mui/material';
import * as echarts from 'echarts';

import { cartoThemeOptions } from '../../src/theme/carto-theme';

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

// export function getMaterialUIContext(children) {
//   return (
//     <StyledEngineProvider injectFirst>
//       <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
//     </StyledEngineProvider>
//   );
// }

export const mockEcharts = {
  init() {
    jest.spyOn(echarts, 'getInstanceByDom').mockImplementation(() => ({
      dispatchAction: jest.fn(),
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
