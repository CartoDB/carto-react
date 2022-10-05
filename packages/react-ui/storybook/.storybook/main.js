module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5'
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true }
  },
  // It solves the fully specified breaking change: https://github.com/storybookjs/storybook/issues/15335
  async webpackFinal(config) {
    config.module.rules.push({
      resolve: { fullySpecified: false }
    });
    return config;
  }
};
