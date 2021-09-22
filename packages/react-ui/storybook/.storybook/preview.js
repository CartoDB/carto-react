import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { cartoThemeOptions } from '../../src/theme/carto-theme';
import reactElementToJSXString from 'react-element-to-jsx-string';

let theme = createMuiTheme(cartoThemeOptions);
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
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  docs: {
    source: {
      type: 'dynamic'
    }
  },
  jsx: {
    showFunctions: true,
    functionValue: (fn) => {
      try {
        const jsx = reactElementToJSXString(fn(), { displayName });
        return `() => ${jsx}`;
      } catch {
        return fn.toString();
      }
    },
    filterProps: (value) => {
      if (typeof value === 'function') {
        return (
          !value.toString().includes('() {}') &&
          !value.toString().includes('function actionHandler')
        );
      }
      return true;
    },
    displayName
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'CARTO Theme',
        ['Palette', 'Typography'],
        'Common',
        'Widgets',
        ['CategoryWidget', 'FormulaWidget', , 'HistogramWidget', 'PieWidget'],
        'Widgets UI',
        [
          'CategoryWidgetUI',
          'FormulaWidgetUI',
          'HistogramWidgetUI',
          'PieWidgetUI',
          'WrapperWidgetUI'
        ]
      ]
    }
  }
};

// Aux
function formatDisplayName(displayName) {
  const firstTry = displayName.match(/WithStyles\(ForwardRef\(([\w]*)/);
  if (firstTry) {
    return firstTry[1]?.replace('Mui', '');
  }

  const secondTry = displayName.match(/Styled\(([\w]*)/);
  if (secondTry) {
    return secondTry[1]?.replace('Mui', '');
  }

  if (displayName.includes('Mui')) {
    return displayName.replace('Mui', '');
  }

  return displayName;
}

function displayName(el) {
  if (el.type.displayName) {
    const { displayName } = el.type;
    return formatDisplayName(displayName);
  }

  if (el.type.options) {
    return formatDisplayName(el.type.options.name);
  }

  if (el.type.name) {
    return formatDisplayName(el.type.name);
  }

  if (el.type.type?.render?.displayName) {
    return formatDisplayName(el.type.type?.render?.displayName);
  }

  if (typeof el.type === 'string') {
    return el.type;
  }

  return 'Element';
}
