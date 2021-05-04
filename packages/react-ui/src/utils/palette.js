import * as cartoColors from 'cartocolor';

export const DEFAULT_PALETTE = 'PurpOr';
export const NULL_COLOR = [204, 204, 204];
export const OTHERS_COLOR = [119, 119, 119];

export function getPaletteFromCartoColors (name, domainSize) {
  const palette = cartoColors[name];
  let paletteIndex = domainSize;

  if (!palette) {
    throw new Error (`Palette "${name}" not found. Expected a CARTOColors string`)
  }

  const palettesColorVariants = Object.keys(palette)
    .filter(p => p !== 'tags')
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
    return getPaletteFromCartoColors(colors, domainSize.length)
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
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
