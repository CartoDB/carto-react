# CARTO React Library

TODO: adapt to multipackage

<p>
  <a href="https://npmjs.org/package/@carto/react">
    <img src="https://img.shields.io/npm/v/@carto/react.svg?style=flat-square" alt="version" />
  </a>

  <a href="https://npmjs.org/package/@carto/react">
    <img src="https://img.shields.io/npm/dt/@carto/react.svg?style=flat-square" alt="downloads" />
  </a>

  <a href="https://coveralls.io/github/CartoDB/carto-react-lib?branch=master">
    <img src="https://coveralls.io/repos/github/CartoDB/carto-react-lib/badge.svg?branch=master" alt="coverage status" />
  </a>

</p>
<br/>

This is the official "CARTO library for React". It is organized as a set of **npm packages** (`@carto/react-*`), that work together providing widgets and utilities to build Location Intelligence applications with React, Redux & Material-UI.

These packages are used by the [CARTO for React](https://github.com/CartoDB/cra-template-carto) templates, made with CRA (Create React App). 

There is a Storybook guide with the main UI components and how to use them at [CARTO for React - UI Components](https://storybook-react.carto.com/)

### How to install the library

If you are using the CARTO CRA templates, everything is already setup, so no further configuration is needed!

In case you want to use this set of packages in a different context, then you would need to install the as usual, with something like:

```
  yarn add @carto/react-api
  yarn add @carto/react-auth
  yarn add @carto/react-basemaps
  yarn add @carto/react-core
  yarn add @carto/react-redux
  yarn add @carto/react-ui
  yarn add @carto/react-widgets
```

Notice that to avoid issues within host projects, most of the base libraries are declared as **peer dependencies**. That means that you would need to add them explicitly to your project, if you are still not using them (keep an eye on the console warnings on peer dependencies).
