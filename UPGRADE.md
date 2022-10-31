# Upgrade to the new design system

## Breaking changes in Mui v5

Please, follow the Mui guides related to breaking changes in components and styles:

- [Styles](https://mui.com/material-ui/migration/v5-style-changes/)
- [Components](https://mui.com/material-ui/migration/v5-component-changes/)

## MUI theme

[carto-theme.js](https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/theme/carto-theme.js) file splitted in sections:

- CSS baseline
- Color palette
- Typography
- Shadows
- Components overrides

Also added some files for shared constants (`themeConstants.js`) and useful functions (`themeUtils.js`).

Removed unused custom `createTheme` function in `carto-theme.js`.

We have a new custom spacing constant in carto-theme, `spacingValue`, which you should use instead of the common `theme.spacing()` function in cases where you need to do value calculations, because since Mui v5, theme.spacing is no longer a number, but a string in this format: `number + px`.

Note that if you're using `calc()` in your styles, you can keep using `theme.spacing()` as usual.

## Typography

`responsiveFontSizes` simplified due we want to resize only a few variants through the theme.

Added a few custom variants to the typography set:

- overlineDelicate
- code1
- code2
- code3

`Open Sans` and `Montserrat` families have been replaced by `Inter` and `Overpass Mono`, you have an example of this in the [`preview-head.html`](https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/storybook/.storybook/preview-head.html) file.

We have a `Typography` component that uses `Mui Typography` and extends it with some useful props:

- weight
- italic

This way we can be more flexible regarding text styles without adding too many variants to the Mui component.

In short, instead of Mui Typography, the component you should use to add text is this one:
`react-ui/src/atoms/Typography`

So `import { Typography } from '@carto/react-ui';`.

## Colors

Some keys have been removed from [color palette](https://github.com/CartoDB/carto-react/tree/master/packages/react-ui/src/theme) due they are unused:

- activatedOpacity
- hoverOpacity
- disabledOpacity
- selectedOpacity
- focusOpacity
- other, all removed but divider, which is moved to first level

Some others have been moved or replaced because they aren't native MUI keys and are so specific to some components, these are:

- charts (replaced by `theme.palette.black[%]`)

`grey palette` is not used to design (and therefore not for style) components directly. We have a set of neutral colors to use in the custom `default` variant.

We also have a set of `shade` colors (with transparency):

- black
- white

Important: `primary.relatedLight` and `secondary.relatedLight` has to be replaced by `primary.background` and `secondary.background`.

## Spacing

Design is restringed to a few specific values for spacing, which are:

`0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 12, 15`.

## Shapes

Design is restringed to a few specific values for border radius, which are:

`0.5, 1, 1.5, 2`.

Use: `borderRadius: theme.spacing(x)`

## Shadows / Elevations

Design is restringed to a few specific values for shadows, which are:

`0, 1, 2, 4, 6, 8, 16, 24`.
