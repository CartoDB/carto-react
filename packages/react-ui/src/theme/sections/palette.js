import { alpha, darken, lighten } from '@material-ui/core';

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
    // legacy ?
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
      100: COLOR_BLACK,
      90: alpha(COLOR_BLACK, 0.9),
      60: alpha(COLOR_BLACK, 0.6),
      40: alpha(COLOR_BLACK, 0.4),
      25: alpha(COLOR_BLACK, 0.25),
      12: alpha(COLOR_BLACK, 0.12),
      8: alpha(COLOR_BLACK, 0.08),
      5: alpha(COLOR_BLACK, 0.05), // not defined in the palette but in use in designs (line 144)
      4: alpha(COLOR_BLACK, 0.04)
    },
    light: {
      100: COLOR_WHITE,
      90: alpha(COLOR_WHITE, 0.9),
      60: alpha(COLOR_WHITE, 0.6),
      40: alpha(COLOR_WHITE, 0.4),
      25: alpha(COLOR_WHITE, 0.25),
      12: alpha(COLOR_WHITE, 0.12),
      8: alpha(COLOR_WHITE, 0.08),
      5: alpha(COLOR_WHITE, 0.05), // legacy ?
      4: alpha(COLOR_WHITE, 0.04)
    }
  }
};

export const themePalette = {
  common: { ...baseColors.common },
  primary: {
    light: baseColors.blue[300],
    main: baseColors.blue[400],
    dark: baseColors.blue[500],
    contrastText: baseColors.common.white,
    relatedLight: 'rgba(3, 111, 226, 0.08)', // Legacy ?
    background: alpha(baseColors.blue[400], 0.08)
  },
  secondary: {
    light: baseColors.green[300],
    main: baseColors.green[400],
    dark: baseColors.green[500],
    contrastText: baseColors.common.black,
    relatedLight: 'rgba(71, 219, 153, 0.08)', // Legacy ?
    background: alpha(baseColors.green[400], 0.08)
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
    disabledBackground: baseColors.shades.dark[12],
    disabled: baseColors.shades.dark[25],
    selected: baseColors.shades.dark[12],
    focus: baseColors.shades.dark[12],
    activatedOpacity: 0.12, // Legacy ?
    hoverOpacity: 0.08, // Legacy ?
    disabledOpacity: 0.38, // Legacy ?
    selectedOpacity: 0.08, // Legacy ?
    focusOpacity: 0.12 // Legacy ?
  },
  other: {
    // what is this for?
    divider: baseColors.shades.dark[12],
    outliner: baseColors.shades.dark[25],
    filterInput: baseColors.shades.dark[5],
    backdrop: baseColors.shades.dark[60],
    tooltip: baseColors.shades.dark[90],
    snackbar: baseColors.shades.dark[100],
    rating: baseColors.green[400] // fix name in figma
  },
  info: {
    light: baseColors.indigo[300],
    main: baseColors.indigo[400],
    dark: baseColors.indigo[500],
    contrastText: baseColors.common.white,
    relatedDark: darken(baseColors.indigo[400], 0.6),
    relatedLight: lighten(baseColors.indigo[400], 0.9)
  },
  success: {
    light: baseColors.green[300],
    main: baseColors.green[400],
    dark: baseColors.green[500],
    contrastText: baseColors.common.white,
    relatedDark: darken(baseColors.green[400], 0.6),
    relatedLight: lighten(baseColors.green[400], 0.9)
  },
  warning: {
    light: baseColors.orange[300],
    main: baseColors.orange[400],
    dark: baseColors.orange[500],
    contrastText: baseColors.common.black,
    relatedDark: darken(baseColors.orange[400], 0.6),
    relatedLight: lighten(baseColors.orange[400], 0.9)
  },
  error: {
    light: baseColors.red[300],
    main: baseColors.red[400],
    dark: baseColors.red[500],
    contrastText: baseColors.common.white,
    relatedDark: darken(baseColors.red[400], 0.6),
    relatedLight: lighten(baseColors.red[400], 0)
  },
  grey: {
    ...baseColors.neutral
  },
  qualitative: {
    ...baseColors.qualitative // Legacy ?
  },
  charts: {
    // Legacy ?
    axisLine: baseColors.shades.dark[5],
    maxLabel: baseColors.shades.dark[60],
    disabled: baseColors.shades.dark[25],
    axisPointer: baseColors.shades.dark[40]
  }
};
