import { alpha } from '@mui/material';

const COLOR_BLACK = '#2C3032';
const COLOR_WHITE = '#FFFFFF';

const baseColors = {
  common: {
    black: COLOR_BLACK,
    white: COLOR_WHITE
  },
  neutral: {
    50: '#f8f9f9',
    100: '#e1e3e4',
    200: '#cbcdcf',
    300: '#b4b8ba',
    400: '#9da2a6',
    500: '#868d91',
    600: '#6f777c',
    700: '#595f63',
    800: '#43474a',
    900: COLOR_BLACK,
    A100: '#ddddde',
    A200: '#b9babb',
    A400: '#7c7e7f',
    A700: '#16191A'
  },
  blue: {
    100: '#B9DAF9',
    200: '#5DB2F6',
    300: '#358BE7',
    400: '#036FE2',
    500: '#024D9E'
  },
  green: {
    300: '#6BE2AD',
    400: '#47DB99',
    500: '#31996B'
  },
  lightGreen: {
    300: '#8CB24A',
    400: '#709F1D',
    500: '#435F11'
  },
  indigo: {
    300: '#34689F',
    400: '#024388',
    500: '#012C5A'
  },
  orange: {
    300: '#F4B134',
    400: '#F29E02',
    500: '#A96E01'
  },
  red: {
    300: '#CD593B',
    400: '#C1300B',
    500: '#872107'
  },
  qualitative: {
    // CARTO colors
    // TODO: Related discussion https://app.shortcut.com/cartoteam/story/264834/
    bold: {
      0: '#7F3C8D',
      1: '#11A579',
      2: '#3969AC',
      3: '#F2B701',
      4: '#E73F74',
      5: '#80BA5A',
      6: '#E68310',
      7: '#008695',
      8: '#CF1C90',
      9: '#f97b72',
      10: '#4b4b8f',
      11: '#A5AA99'
    }
  },
  shades: {
    dark: {
      90: alpha(COLOR_BLACK, 0.9),
      60: alpha(COLOR_BLACK, 0.6),
      40: alpha(COLOR_BLACK, 0.4),
      25: alpha(COLOR_BLACK, 0.25),
      12: alpha(COLOR_BLACK, 0.12),
      8: alpha(COLOR_BLACK, 0.08),
      4: alpha(COLOR_BLACK, 0.04)
    },
    light: {
      90: alpha(COLOR_WHITE, 0.9),
      60: alpha(COLOR_WHITE, 0.6),
      40: alpha(COLOR_WHITE, 0.4),
      25: alpha(COLOR_WHITE, 0.25),
      12: alpha(COLOR_WHITE, 0.12),
      8: alpha(COLOR_WHITE, 0.08),
      4: alpha(COLOR_WHITE, 0.04)
    }
  }
};

export const commonPalette = {
  common: { ...baseColors.common },
  primary: {
    main: baseColors.blue[400],
    dark: baseColors.blue[500],
    light: baseColors.blue[300],
    contrastText: baseColors.common.white,
    background: alpha(baseColors.blue[400], 0.08),
    relatedLight: '#EAF2FC'
  },
  secondary: {
    main: baseColors.green[400],
    dark: baseColors.green[500],
    light: baseColors.green[300],
    contrastText: baseColors.common.black,
    background: alpha(baseColors.green[400], 0.08),
    relatedLight: '#EFFCF5'
  },
  text: {
    primary: baseColors.common.black,
    secondary: baseColors.shades.dark[60],
    disabled: baseColors.shades.dark[25],
    hint: baseColors.shades.dark[40]
  },
  background: {
    paper: baseColors.common.white,
    default: baseColors.neutral[50]
  },
  action: {
    active: baseColors.shades.dark[40],
    hover: baseColors.shades.dark[8],
    disabledBackground: baseColors.neutral[100],
    disabled: baseColors.shades.dark[25],
    selected: baseColors.shades.dark[12],
    focus: baseColors.shades.dark[12]
  },
  info: {
    main: baseColors.indigo[400],
    dark: baseColors.indigo[500],
    light: baseColors.indigo[300],
    contrastText: baseColors.common.white,
    relatedDark: '#0D2B4A',
    relatedLight: '#E9EEF4'
  },
  success: {
    main: baseColors.lightGreen[400],
    dark: baseColors.lightGreen[500],
    light: baseColors.lightGreen[300],
    contrastText: baseColors.common.white,
    relatedDark: '#3D541A',
    relatedLight: '#F2F5EB'
  },
  warning: {
    main: baseColors.orange[400],
    dark: baseColors.orange[500],
    light: baseColors.orange[300],
    contrastText: baseColors.common.black,
    relatedDark: '#78540F',
    relatedLight: '#FEF6EA'
  },
  error: {
    main: baseColors.red[400],
    light: baseColors.red[300],
    dark: baseColors.red[500],
    contrastText: baseColors.common.white,
    relatedDark: '#622215',
    relatedLight: '#F9EDEA'
  },
  grey: {
    ...baseColors.neutral
  },
  divider: baseColors.shades.dark[12],

  // Custom common colors
  default: {
    main: baseColors.neutral[100],
    dark: baseColors.neutral[200],
    light: baseColors.neutral[50],
    outlinedBorder: baseColors.shades.dark[25],
    background: baseColors.shades.dark[4]
  },
  brand: {
    navyBlue: '#162945',
    locationRed: '#EB1510',
    predictionBlue: '#1785FB',
    softBlue: '#F2F6F9'
  },
  white: {
    ...baseColors.shades.light
  },
  black: {
    ...baseColors.shades.dark
  },
  qualitative: {
    ...baseColors.qualitative
  }
};
