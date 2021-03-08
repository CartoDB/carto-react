module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      forceAllTransforms: true, // es5
    }],
    '@babel/preset-react'
  ],
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    '@babel/plugin-transform-runtime'
  ]
};
