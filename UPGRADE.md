# Upgrade to the new design system

## MUI theme

[carto-theme.js](https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/theme/carto-theme.js) file splitted in sections:

- CSS baseline
- Color palette
- Typography
- Shadows
- Components overrides

Also added some files for shared constants (`themeConstants.js`) and useful functions (`themeUtils.js`).

Removed unused custom `createTheme` function in `carto-theme.js`.

# Typography

`responsiveFontSizes` simplified due we want to resize only a few variants through the theme.

Added several custom variants to the typography set. Note that MUI v5 is needed to register them properly.

## Colors

Keys renamed:

- filterInput by filledInput (typo fixed)

Some keys have been removed from [color palette](https://github.com/CartoDB/carto-react/tree/master/packages/react-ui/src/theme) due they are unused:

- activatedOpacity
- hoverOpacity
- disabledOpacity
- selectedOpacity
- focusOpacity
- other, all removed but tooltip and divider

Some others have been moved because they aren't native MUI keys and are so specific to some components, these are:

- charts
- other

These sets of keys are now in: `componentsPalette`.

## Spacing

Design is restringed to a few specific sizes for spacing, which are:

`0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 12, 15`.
