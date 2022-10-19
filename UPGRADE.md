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

`grey palette` is not used to design (and therefore not for style) components directly. We have a set of neutral colors to use in the custom `default` variant.
