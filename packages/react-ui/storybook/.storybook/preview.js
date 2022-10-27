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

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: '320px',
      height: '599px'
    }
  },
  sm: {
    name: 'sm',
    styles: {
      width: '600px',
      height: '959px'
    }
  },
  md: {
    name: 'md',
    styles: {
      width: '960px',
      height: '1279px'
    }
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1280',
      height: '1599px'
    }
  },
  xl: {
    name: 'xl',
    styles: {
      width: '1600',
      height: '100%'
    }
  }
};

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
  viewMode: 'story',
  docs: {
    source: {
      type: 'code'
    }
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Foundations',
        ['Palette', 'Typography', 'Spacing', 'Borders', 'Elevations', 'Breakpoints'],
        'Atoms',
        'Molecules',
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
  decorators: [withDesign],
  viewport: {
    viewports: customViewports
  }
};
