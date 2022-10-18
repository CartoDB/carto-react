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
