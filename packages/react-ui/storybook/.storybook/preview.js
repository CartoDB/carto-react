import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { createTheme, responsiveFontSizes, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { cartoThemeOptions } from '../../src/theme/carto-theme';
import { BREAKPOINTS } from '../../src/theme/themeConstants';

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
      width: `${BREAKPOINTS.XS}px`,
      height: `${BREAKPOINTS.SM - 1}px`
    }
  },
  sm: {
    name: 'sm',
    styles: {
      width: `${BREAKPOINTS.SM}px`,
      height: `${BREAKPOINTS.MD - 1}px`
    }
  },
  md: {
    name: 'md',
    styles: {
      width: `${BREAKPOINTS.MD}px`,
      height: `${BREAKPOINTS.LG - 1}px`
    }
  },
  lg: {
    name: 'lg',
    styles: {
      width: `${BREAKPOINTS.LG}px`,
      height: `${BREAKPOINTS.XL - 1}px`
    }
  },
  xl: {
    name: 'xl',
    styles: {
      width: `${BREAKPOINTS.XL}px`,
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
        'Foundations',
        ['Palette', 'Typography', 'Spacing', 'Borders', 'Elevations', 'Breakpoints'],
        'Atoms',
        'Molecules',
        'Organisms',
        ['InputFile'],
        'Common',
        'Custom Components',
        [
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
