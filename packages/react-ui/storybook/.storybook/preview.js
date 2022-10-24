import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material';
import { cartoThemeOptions } from '../../src/theme/carto-theme';

let theme = createTheme(cartoThemeOptions);
theme = responsiveFontSizes(theme, {
  breakpoints: ['sm'],
  disableAlign: false,
  factor: 2
});

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </StyledEngineProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    source: {
      type: 'code'
    }
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'CARTO Theme',
        ['Palette', 'Typography'],
        'Common',
        'Custom Components',
        [
          'InputFile',
          'CategoryWidgetUI',
          'FormulaWidgetUI',
          'HistogramWidgetUI',
          'BarWidgetUI',
          'PieWidgetUI',
          'WrapperWidgetUI'
        ]
      ]
    }
  },
  decorators: [withDesign]
};
