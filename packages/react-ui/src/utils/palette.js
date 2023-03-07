import * as cartoColors from 'cartocolor';
import { commonPalette } from '../theme/sections/palette';

export const DEFAULT_PALETTE = 'PurpOr';
export const NULL_COLOR = [204, 204, 204];
export const OTHERS_COLOR = [119, 119, 119];

export function getPaletteFromCartoColors(name, domainSize) {
  const palette = cartoColors[name];
  let paletteIndex = domainSize;

  if (!palette) {
    throw new Error(`Palette "${name}" not found. Expected a CARTOColors string`);
  }

  const palettesColorVariants = Object.keys(palette)
    .filter((p) => p !== 'tags')
    .map(Number);

  const longestPaletteIndex = Math.max(...palettesColorVariants);
  const smallestPaletteIndex = Math.min(...palettesColorVariants);

  if (!Number.isInteger(domainSize) || domainSize > longestPaletteIndex) {
    paletteIndex = longestPaletteIndex;
  } else if (domainSize < smallestPaletteIndex) {
    paletteIndex = smallestPaletteIndex;
  }

  let colors = palette[paletteIndex];

  if (palette.tags && palette.tags.includes('qualitative')) {
    colors = colors.slice(0, -1);
  }

  return colors;
}

export function getPalette(colors, domainSize) {
  if (typeof colors === 'string') {
    return getPaletteFromCartoColors(colors, domainSize);
  } else {
    return colors.map((c) => {
      if (Array.isArray(c)) {
        return rgbToHex(...c);
      } else {
        return c;
      }
    });
  }
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// https://stackoverflow.com/a/42429333/3978662
const hexToRgbArray = (hex) => hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));

// http://stackoverflow.com/a/3943023/112731
function getLuminance(color) {
  const rgb = hexToRgbArray(color);

  let i, x;
  const a = []; // so we don't mutate
  for (i = 0; i < rgb.length; i++) {
    x = rgb[i] / 255;
    a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Calculate an optimal contrasting color based on another one
export function getContrastColor(color) {
  const black = commonPalette.common.black;
  const white = commonPalette.common.white;
  const limit = 0.179; // W3C recommendation https://github.com/w3c/wcag/issues/695

  return getLuminance(color) > limit ? black : white;
}

// Return a carto color qualitative bold and its contrast color
export function getNextCartoColor(index) {
  const palette = commonPalette.qualitative.bold;
  const colorsValues = Object.values(palette);

  const colors = {
    backgroundColor: colorsValues[index],
    color: getContrastColor(colorsValues[index])
  };
  colorsValues.push(palette[index]);

  return colors;
}

// Return a carto color qualitative bold and its contrast color
export function getCartoColorQualitativeBold(index, colors) {
  colors = colors || commonPalette.qualitative.bold;

  /*   const colorAndContrastColor = [
    { backgroundColor: colors[0], color: getContrastColor(colors[0]) },
    { backgroundColor: colors[1], color: getContrastColor(colors[1]) },
    { backgroundColor: colors[2], color: getContrastColor(colors[2]) },
    { backgroundColor: colors[3], color: getContrastColor(colors[3]) },
    { backgroundColor: colors[4], color: getContrastColor(colors[4]) },
    { backgroundColor: colors[5], color: getContrastColor(colors[5]) },
    { backgroundColor: colors[6], color: getContrastColor(colors[6]) },
    { backgroundColor: colors[7], color: getContrastColor(colors[7]) },
    { backgroundColor: colors[8], color: getContrastColor(colors[8]) },
    { backgroundColor: colors[9], color: getContrastColor(colors[9]) },
    { backgroundColor: colors[10], color: getContrastColor(colors[10]) },
    { backgroundColor: colors[11], color: getContrastColor(colors[11]) }
  ]; */

  const colorsValues = Object.values(colors);

  const mapColors = colorsValues.map((c, i) => ({
    backgroundColor: c[i],
    color: getContrastColor(c[i])
  }));

  /*   if (
    index === colorAndContrastColor.length ||
    index > colorAndContrastColor.length - 1
  ) {
    index = 0;
  }
  if (index < colorAndContrastColor.length) {
    index++;
  } */

  return mapColors;
}
