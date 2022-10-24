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

`Open Sans` and `Montserrat` families have been replaced by `Inter` and `Overpass Mono`, you have an example of this in the [`preview-head.html`](https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/storybook/.storybook/preview-head.html) file.

## Colors

Some keys have been removed from [color palette](https://github.com/CartoDB/carto-react/tree/master/packages/react-ui/src/theme) due they are unused:

- activatedOpacity
- hoverOpacity
- disabledOpacity
- selectedOpacity
- focusOpacity
- other, all removed but divider

Some others have been moved or replaced because they aren't native MUI keys and are so specific to some components, these are:

- charts (replaced by `alpha(theme.palette.common.black, %)`)
- other (moved to `componentsPalette`)

`grey palette` is not used to design (and therefore not for style) components directly. We have a set of neutral colors to use in the custom `default` variant.
