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
