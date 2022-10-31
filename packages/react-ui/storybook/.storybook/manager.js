// ./storybook/manager.ts
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  // Brand
  brandTitle: 'CARTO Design System',
  brandImage: undefined
});

addons.setConfig({
  theme
});
