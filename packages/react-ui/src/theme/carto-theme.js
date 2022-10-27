import { themeComponentsOverrides, themeComponentsProps } from './sections/components';
import { CssBaseline } from './sections/cssBaseline';
import { commonPalette } from './sections/palette';
import { themeShadows } from './sections/shadows';
import { themeTypography } from './sections/typography';
import { SPACING } from './themeConstants';

export const cartoThemeOptions = {
  themeName: 'CARTO',
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 320, // 320 - 599
      sm: 600, // 600 - 959
      md: 960, // 960 - 1279
      lg: 1280, // 1280 - 1599
      xl: 1600 // 1600+
    },
    unit: 'px',
    step: 5
    // For more information about use this helper functions: hhttps://mui.com/material-ui/customization/breakpoints/#css-media-queries
    // up: f d(),
    // down: f down(),
    // between: f p(),
    // only: f only(),
    // width: f width(),
  },
  direction: 'ltr',
  mixins: {
    // gutters: f gutters(),
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48
      },
      '@media (min-width:600px)': {
        minHeight: 56
      }
    }
  },
  palette: {
    mode: 'light',
    contrastThreshold: 3,
    tonalOffset: 0.2,
    common: { ...commonPalette.common },
    primary: { ...commonPalette.primary },
    secondary: { ...commonPalette.secondary },
    error: { ...commonPalette.error },
    warning: { ...commonPalette.warning },
    info: { ...commonPalette.info },
    success: { ...commonPalette.success },
    text: { ...commonPalette.text },
    divider: commonPalette.divider,
    background: { ...commonPalette.background },
    grey: { ...commonPalette.grey },
    action: { ...commonPalette.action },
    // props: Object => Research,
    /* Custom Colors palette */
    qualitative: { ...commonPalette.qualitative },
    default: { ...commonPalette.default },
    white: { ...commonPalette.white },
    black: { ...commonPalette.black },
    brand: { ...commonPalette.brand }
  },
  shadows: [...themeShadows],
  typography: {
    ...themeTypography
  },
  spacing: SPACING, // For custom spacing: https://material-ui.com/customization/spacing/#custom-spacing
  shape: {
    borderRadius: 4
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
    // create: f create(), => Research
    // getAutoHeightDuration: f getAutoHeightDuration(), => Research
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  overrides: {
    MuiCssBaseline: {
      ...CssBaseline
    },
    ...themeComponentsOverrides
  },

  // Props
  props: { ...themeComponentsProps }
};
