import React from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme
} from '@mui/material';
import { cartoThemeOptions } from '../../src/theme/carto-theme';

let theme = createTheme(adaptV4Theme(cartoThemeOptions));
theme = responsiveFontSizes(theme, {
  breakpoints: cartoThemeOptions.breakpoints.keys,
  disableAlign: false,
  factor: 2,
  variants: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline'
  ]
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
  }
};
