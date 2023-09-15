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

// Returns style props for an item ({ backgroundColor, color}) using qualitative bold palette.
// It re-iterates over the palette if index is greater than palette's size (repeated colors)
export function getCartoColorStylePropsForItem(theme, index) {
  const palette = commonPalette.qualitative.bold;
  const colors = Object.values(palette);

  let chosenIndex = index % colors.length;

  return {
    backgroundColor: colors[chosenIndex],
    color: theme.palette.getContrastText(colors[chosenIndex])
  };
}

/**
 * Get color by category.
 *
 * Each new category gets new color from `palette` if specified.
 *
 * Palette state is kept in `colorMapping`
 */
export function getColorByCategory(category, { palette, fallbackColor, colorMapping }) {
  const assignedColor = colorMapping[category];
  if (assignedColor) {
    return colorMapping[category];
  }

  if (!palette || palette.length === 0) {
    return fallbackColor;
  }

  const nextFreeColorIndex = Math.min(
    Object.keys(colorMapping).length,
    palette.length - 1
  );
  const newColor = palette[nextFreeColorIndex];
  colorMapping[category] = newColor;
  return newColor;
}
