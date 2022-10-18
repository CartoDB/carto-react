export const baseColors = {
  common: {
    black: '#2c3032',
    white: '#fff'
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
    900: '#2c3032',
    A100: '#ddddde',
    A200: '#b9babb',
    A400: '#7c7e7f',
    A700: '#545759'
  },
  qualitative: {
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
      100: '#2c3032', // Neutral900
      90: 'rgba(44, 48, 50, 0.9)',
      60: 'rgba(44, 48, 50, 0.6)',
      40: 'rgba(44, 48, 50, 0.4)',
      25: 'rgba(44, 48, 50, 0.25)',
      12: 'rgba(44, 48, 50, 0.12)',
      5: 'rgba(44, 48, 50, 0.05)'
    },
    light: {
      100: '#fff', // White
      60: 'rgba(255, 255, 255, 0.6)',
      40: 'rgba(255, 255, 255, 0.4)',
      20: 'rgba(255, 255, 255, 0.2)',
      12: 'rgba(255, 255, 255, 0.12)',
      5: 'rgba(255, 255, 255, 0.05)'
    }
  }
};

export const themePalette = {
  common: { ...baseColors.common },
  primary: {
    light: '#358be7',
    main: '#036fe2',
    dark: '#024d9e',
    contrastText: baseColors.common.white,
    relatedLight: 'rgba(3, 111, 226, 0.08)'
  },
  secondary: {
    light: '#6be2ad',
    main: '#47db99',
    dark: '#31996b',
    contrastText: baseColors.common.black,
    relatedLight: 'rgba(71, 219, 153, 0.08)'
  },
  error: {
    light: '#cd593b',
    main: '#c1300b',
    dark: '#872107',
    contrastText: baseColors.common.white,
    relatedDark: '#4d1304',
    relatedLight: '#f9ebe7'
  },
  warning: {
    light: '#f4b134',
    main: '#f29e02',
    dark: '#a96e01',
    contrastText: baseColors.common.black,
    relatedDark: '#603f00',
    relatedLight: '#fef6e6'
  },
  info: {
    light: '#34689f',
    main: '#024388',
    dark: '#012e5f',
    contrastText: baseColors.common.white,
    relatedDark: '#001a36',
    relatedLight: '#e6edf4'
  },
  success: {
    light: '#8cb24a',
    main: '#709f1d',
    dark: '#4e6f14',
    contrastText: baseColors.common.white,
    relatedDark: '#2c3f0b',
    relatedLight: '#f1f6e9'
  },
  text: {
    primary: baseColors.shades.dark[100],
    secondary: baseColors.shades.dark[60],
    hint: baseColors.shades.dark[40],
    disabled: baseColors.shades.dark[25]
  },
  background: {
    default: baseColors.neutral[50],
    paper: baseColors.common.white
  },
  other: {
    tooltip: baseColors.shades.dark[90],
    snackbar: baseColors.shades.dark[100],
    backdrop: baseColors.shades.dark[60],
    divider: baseColors.shades.dark[12]
  },
  grey: {
    ...baseColors.neutral
  },
  action: {
    active: baseColors.shades.dark[40],
    hover: baseColors.shades.dark[5],
    hoverOpacity: 0.08,
    selected: baseColors.shades.dark[12],
    selectedOpacity: 0.08,
    disabled: baseColors.shades.dark[25],
    disabledBackground: baseColors.shades.dark[12],
    disabledOpacity: 0.38,
    focus: baseColors.shades.dark[12],
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  },
  qualitative: {
    ...baseColors.qualitative
  },
  charts: {
    axisLine: baseColors.shades.dark[5],
    maxLabel: baseColors.shades.dark[60],
    disabled: baseColors.shades.dark[25],
    axisPointer: baseColors.shades.dark[40]
  }
};
