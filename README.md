# CARTO React Library

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

This is the official CARTO library for working with React. It is used by the [CARTO for React](https://github.com/CartoDB/cra-template-carto) templates, made with CRA (Create React App).

There is a Storybook guide with the main UI components and how to use them at [CARTO for React - UI Components](https://storybook-react.carto.com/)

### How to install the library

If you are using the CARTO CRA templates, everything is already setup, so no further configuration is needed.

In case you want to use this library in a different context, then you need to install it with:

```
yarn add @carto/react
```

Notice that to avoid issues within host projects, most of the relevant libraries are declared as **peer dependencies**. That means that you would need to add them if you are still not using them (keep an eye on the console warnings on peer dependencies).

This is the full list, in case you need it:

```
yarn add \
  @deck.gl/core@^8.4.0 \
  @deck.gl/extensions@^8.4.0 \
  @deck.gl/google-maps@^8.4.0 \
  @material-ui/core \
  @material-ui/icons \
  @material-ui/lab  \
  @reduxjs/toolkit \
  @turf/bbox-polygon \
  @turf/boolean-contains \
  @turf/boolean-intersects \
  echarts@^4.9.0 \
  echarts-for-react@^2.0.16 \
  prop-types \
  react@^17.0.1 \
  react-dom@^17.0.1 \
  react-is@^17.0.1 \
  react-redux@^7.2.2
```
