import React, { useContext } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { theme } from '../../src/theme/carto-theme';
import { BREAKPOINTS } from '../../src/theme/themeConstants';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
  DocsContext
} from '@storybook/addon-docs';

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
    description:
      'Legacy component that might be currently in use, but shouldn`t be used in new projects'
  },
  inDevelopment: {
    background: '#F29E02', // Warning/Main
    color: '#ffffff',
    description: 'Work in progress or experimental. Not ready to use in production yet'
  },
  readyToReview: {
    background: '#024388', // Info/Main
    color: '#ffffff',
    description: 'Ready to review and validation by design and other stakeholders'
  },
  validated: {
    background: '#709F1D', // Success/Main
    color: '#ffffff',
    description: 'Fully validated and ready-to-use implementation'
  },
  needsUpdate: {
    background: '#E1E3E4', // Default/Main
    color: '#2C3032',
    description:
      'Needs an update due to some design changes, but can be used in this state'
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

function CustomDescription() {
  const context = useContext(DocsContext);
  try {
    const jsdoc = context.parameters.docs.extractComponentDescription(context.component);
    const excerpt = jsdoc?.split('@param')[0];
    return excerpt || null;
  } catch {
    return null;
  }
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    source: {
      type: 'code'
    },
    page: () => (
      <>
        <Title />
        <Subtitle />
        <CustomDescription />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </>
    )
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        'Foundations',
        ['Palette', 'Typography', 'Spacing', 'Borders', 'Elevations', 'Breakpoints'],
        'Icons',
        ['Introduction', 'Carto Icons'],
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
