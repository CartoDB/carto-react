// https://testing-library.com/docs/react-testing-library/setup/

import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material';

import { cartoThemeOptions } from '../../../src/theme/carto-theme';

const theme = getTheme(); // for now we don't need real theme for tests

function getTheme() {
  let theme = createTheme(cartoThemeOptions);
  theme = responsiveFontSizes(theme, {
    breakpoints: ['sm'],
    disableAlign: false,
    factor: 2
  });
  return theme;
}

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
