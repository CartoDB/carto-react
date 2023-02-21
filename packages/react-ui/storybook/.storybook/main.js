module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    '@storybook/addon-viewport',
    'storybook-vscode-component/register',
    '@etchteam/storybook-addon-status'
  ],
  staticDirs: ['../assets']
};
