# CARTO React Library

<p>

  <a href="https://npmjs.org/package/@carto/react-core">
    <img src="https://img.shields.io/npm/v/@carto/react-api.svg?style=flat-square" alt="version" />
  </a>

  <a href="https://npmjs.org/package/@carto/react-core">
    <img src="https://img.shields.io/npm/dt/@carto/react-api.svg?style=flat-square" alt="downloads" />
  </a>

  <a href="https://coveralls.io/github/CartoDB/carto-react-lib?branch=master">
    <img src="https://coveralls.io/repos/github/CartoDB/carto-react-lib/badge.svg?branch=master" alt="coverage status" />
  </a>

</p>
<br/>

This is the official "CARTO for React" library. It is organized as a set of **npm packages** (`@carto/react-*`), that work together providing widgets and utilities to build Location Intelligence applications with React, Redux & Material-UI.

The packages are:

- [@carto/react-api](packages/react-api/README.md)
- [@carto/react-auth](packages/react-auth/README.md)
- [@carto/react-basemaps](packages/react-basemaps/README.md)
- [@carto/react-core](packages/react-core/README.md)
- [@carto/react-redux](packages/react-redux/README.md)
- [@carto/react-ui](packages/react-ui/README.md)
- [@carto/react-widgets](packages/react-widgets/README.md)
- [@carto/react-workers](packages/react-workers/README.md)

To work in the code, see [developers](DEVELOPERS.md).

These packages are used by the [CARTO for React](https://github.com/CartoDB/cra-template-carto) templates, made with CRA (Create React App).

There is a Storybook guide with the main UI components and how to use them at [CARTO for React - UI Components](https://storybook-react.carto.com/)

### How to install the library

If you are using the CARTO CRA templates, everything is already setup, so no further configuration is needed!

In case you want to use this set of packages in a different context, then you would need to install them as usual, with something like:

```
  yarn add @carto/react-api
  yarn add @carto/react-auth
  yarn add @carto/react-basemaps
  yarn add @carto/react-core
  yarn add @carto/react-redux
  yarn add @carto/react-ui
  yarn add @carto/react-widgets
  yarn add @carto/react-workers
```

Notice that to avoid issues within host projects, most of the base libraries are declared as **peer dependencies**. That means that you would need to add them explicitly to your project, if you are still not using them (keep an eye on the console warnings on peer dependencies).
