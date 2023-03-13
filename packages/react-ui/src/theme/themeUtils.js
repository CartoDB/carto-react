import ReactDOMServer from 'react-dom/server';
import { createSpacing } from '@mui/system';
import { SPACING } from './themeConstants';

// Create spacing for theming
export const getSpacing = createSpacing(SPACING);

// Convert pixels to rem
export function getPixelToRem(px) {
  const fontBase = 16;
  const rem = (1 / fontBase) * px + 'rem';

  return rem;
}

// Get the icon path from a given Mui icon
export function getIconPath(icon) {
  const iconString = ReactDOMServer.renderToString(icon);
  const parser = new DOMParser();
  const svg = parser.parseFromString(iconString, 'image/svg+xml');
  const iconPath = svg.querySelector('path').getAttribute('d');

  return iconPath;
}
