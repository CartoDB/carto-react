import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline
} from '@mui/material';
import { cartoThemeOptions, theme } from '../../src/theme/carto-theme';
import { BREAKPOINTS } from '../../src/theme/themeConstants';

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

const componentsStatus = {
  deprecated: {
    background: '#C1300B', // Error/Main
    color: '#ffffff',
    description: 'Do not use'
  },
  inDevelopment: {
    background: '#F29E02', // Warning/Main
    color: '#ffffff',
    description: 'Work in progress'
  },
  readyToReview: {
    background: '#024388', // Info/Main
    color: '#ffffff',
    description: 'Ready to review and validation'
  },
  validated: {
    background: '#709F1D', // Success/Main
    color: '#ffffff',
    description: 'Validated and ready to use'
  },
  needUpdate: {
    background: '#E1E3E4', // Default/Main
    color: '#2C3032',
    description: 'Need an update, but can be used in this state'
  }
};

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      method: 'alphabetical',
      order: [
        'Introduction',
        'Foundations',
        ['Palette', 'Typography', 'Spacing', 'Borders', 'Elevations', 'Breakpoints'],
        'Atoms',
        'Molecules',
        'Organisms'
      ]
    }
  },
  decorators: [withDesign],
  viewport: {
    viewports: customViewports
  },
  status: {
    statuses: componentsStatus
  }
};
