// ./storybook/manager.ts
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { version } from '../../package.json';

const theme = create({
  base: 'light',

  // Brand
  brandTitle: `CARTO DS ${version}`,
  brandImage: undefined
});

addons.setConfig({
  theme
});
