# Redux

## CARTO Slice

### createCartoSlice

A function that accepts an initialState, setup the state and creates
the CARTO reducers that support CARTO for React achitecture.

```javascript
export const initialState = {
  viewState: {
    latitude: 31.802892,
    longitude: -103.007813,
    zoom: 2,
    pitch: 0,
    bearing: 0,
    dragRotate: false
  },
  basemap: POSITRON,
  credentials: {
    username: 'public',
    apiKey: 'default_public',
    serverUrlTemplate: 'https://{user}.carto.com'
  },
  googleApiKey: ''
};
```

| Param        | Type                | Description       |
| ------------ | ------------------- | ----------------- |
| initialState | <code>object</code> | the initial state |

### addSource

Action to add a source to the store

Parameters are in the form of destructuring arguments.

| Param  | Type                | Description                                                                                           |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------- |
| {id}   | <code>string</code> | unique id for the source                                                                              |
| {data} | <code>string</code> | data definition for the source. Query for SQL dataset or the name of the tileset for BigQuery Tileset |
| {type} | <code>string</code> | type of source. Posible values are 'sql' or 'bigquery'                                                |

### removeSource

Action to remove a source from the store

| Param    | Type                | Description                |
| -------- | ------------------- | -------------------------- |
| sourceId | <code>string</code> | id of the source to remove |

### addLayer

Action to add a Layer to the store

| Param           | Type                | Description                                       |
| --------------- | ------------------- | ------------------------------------------------- |
| id              | <code>string</code> | unique id for the layer                           |
| source          | <code>string</code> | id of the source of the layer                     |
| layerAttributes | <code>object</code> | (optional) custom attributes to pass to the layer |

### updateLayer

Action to update a Layer in the store

| Param           | Type                | Description                            |
| --------------- | ------------------- | -------------------------------------- |
| id              | <code>string</code> | unique id for the layer                |
| layerAttributes | <code>object</code> | custom attributes to pass to the layer |

### removeLayer

Action to remove a layer from the store

| Param | Type                | Description               |
| ----- | ------------------- | ------------------------- |
| id    | <code>string</code> | id of the layer to remove |

### setBasemap

Action to set a basemap

| Param   | Type                | Description            |
| ------- | ------------------- | ---------------------- |
| basemap | <code>String</code> | the new basemap to add |

### addFilter

Action to add a filter on a given source and column

| Param    | Type                    | Description                                |
| -------- | ----------------------- | ------------------------------------------ |
| {id}     | <code>string</code>     | sourceId of the source to apply the filter |
| {column} | <code>string</code>     | column to filter at the source             |
| {type}   | <code>FilterType</code> | `FilterTypes.IN` and `FilterTypes.BETWEEN` |

### removeFilter

Action to remove a column filter from a source

| Type                | Description                      |
| ------------------- | -------------------------------- |
| <code>id</code>     | sourceId of the filter to remove |
| <code>column</code> | column of the filter to remove   |

### clearFilters

Action to remove all filters from a source

| Type            | Description                                       |
| --------------- | ------------------------------------------------- |
| <code>id</code> | sourceId of the source to remove all filters from |

### selectSourceById

Redux selector to get a source by ID

### setViewState

Action to set the current ViewState

| Param     | Type                |
| --------- | ------------------- |
| viewState | <code>Object</code> |

### setViewportFeatures

Action to set the viewport features to a specific source

| Param      | Type                | Description       |
| ---------- | ------------------- | ----------------- |
| {sourceId} | <code>string</code> | id of the source  |
| {features} | <code>Array</code>  | viewport features |

### removeViewportFeatures

Action to remove the viewport features to a specific source

| Param      | Type                | Description                                           |
| ---------- | ------------------- | ----------------------------------------------------- |
| {sourceId} | <code>string</code> | id of the source to remove the viewport features from |

## OAuth Slice

### createOauthCartoSlice

A function that accepts an initialState, setup the state and creates
reducers to manage OAuth with CARTO platform.

```javascript
export const oauthInitialState = {
  oauthApp: {
    clientId: 'CARTO OAUTH APP clienID'
    scopes: [
      'user:profile', // to load avatar photo
      'datasets:metadata', // to list all your datasets,
      'dataservices:geocoding', // to use geocoding through Data Services API
      'dataservices:isolines', // to launch isochrones or isodistances through Data Services API
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize',
  }
};
```

| Param        | Type                | Description       |
| ------------ | ------------------- | ----------------- |
| initialState | <code>object</code> | the initial state |

### setOAuthApp

Action to set the OAuthApp

| Param             | Type                | Description                                                                                                   |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| clientId          | <code>string</code> | unique OAuth App identifier                                                                                   |
| scopes            | <code>array</code>  | array of valid scopes for the App.                                                                            |
| authorizeEndPoint | <code>string</code> | URL of CARTO authorization endpoint. Except for on-premise, it should be 'https://carto.com/oauth2/authorize' |

### setTokenAndUserInfoAsync

Action to get the userInfo once there is a valid token, and set them both into state

### logout

Action to logout an user

### selectOAuthCredentials

Selector to fetch the current OAuth credentials from the storage
