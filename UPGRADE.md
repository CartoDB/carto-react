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

We have a `Typography` component that uses `Mui Typography` and extends it with some useful props:

- weight
- italic

This we can be more flexible regarding text styles without adding too many variants to the Mui component.

In short, instead of Mui Typography, the component you should use to add text is this one:
`react-ui/src/atoms/Typography`

So `import { Typography } from '@carto/react-ui';`.

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
