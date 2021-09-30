import { createSlice } from '@reduxjs/toolkit';
import { WebMercatorViewport } from '@deck.gl/core';
import { debounce } from '@carto/react-core';
import { removeWorker } from '@carto/react-workers';
import { setDefaultCredentials } from '@deck.gl/carto';

/**
 *
 * A function that accepts an initialState, setup the state and creates
 * the CARTO reducers that support CARTO for React achitecture.
 *
 *  export const initialState = {
 *    viewState: {
 *      latitude: 31.802892,
 *      longitude: -103.007813,
 *      zoom: 2,
 *      pitch: 0,
 *      bearing: 0,
 *      dragRotate: false,
 *    },
 *    basemap: POSITRON,
 *    credentials: {
 *      username: 'public',
 *      apiKey: 'default_public',
 *      serverUrlTemplate: 'https://{user}.carto.com',
 *    },
 *    googleApiKey: '', // only required when using a Google Basemap
 *  }
 * @param  {object} initialState - the initial state of the state
 */
export const createCartoSlice = (initialState) => {
  const slice = createSlice({
    name: 'carto',
    initialState: {
      viewState: {
        ...initialState.viewState,
        latitude: 0,
        longitude: 0,
        zoom: 0
      },
      viewport: undefined,
      geocoderResult: null,
      error: null,
      basemap: 'positron',
      layers: {
        // Auto import layers
      },
      dataSources: {
        // Auto import dataSources
      },
      viewportFeatures: {},
      viewportFeaturesReady: {},
      ...initialState
    },
    reducers: {
      addSource: (state, action) => {
        action.payload.credentials = action.payload.credentials || state.credentials;
        state.dataSources[action.payload.id] = action.payload;
      },
      removeSource: (state, action) => {
        delete state.dataSources[action.payload];
        removeWorker(action.payload);
      },
      addLayer: (state, action) => {
        state.layers[action.payload.id] = action.payload;
      },
      setViewportFeaturesReady: (state, action) => {
        const { sourceId, ready } = action.payload;

        state.viewportFeaturesReady = {
          ...state.viewportFeaturesReady,
          [sourceId]: ready
        };
      },
      updateLayer: (state, action) => {
        const layer = state.layers[action.payload.id];
        if (layer)
          state.layers[action.payload.id] = {
            ...layer,
            ...action.payload.layerAttributes
          };
      },
      removeLayer: (state, action) => {
        delete state.layers[action.payload];
      },
      setBasemap: (state, action) => {
        state.basemap = action.payload;
      },
      setViewState: (state, action) => {
        const viewState = action.payload;
        state.viewState = { ...state.viewState, ...viewState };
      },
      setViewPort: (state) => {
        state.viewport = new WebMercatorViewport(state.viewState).getBounds();
      },
      addFilter: (state, action) => {
        const { id, column, type, values, owner } = action.payload;
        const source = state.dataSources[id];

        if (source) {
          if (!source.filters) {
            source.filters = {};
          }

          if (!source.filters[column]) {
            source.filters[column] = {};
          }

          source.filters[column][type] = { values, owner };
        }
      },
      removeFilter: (state, action) => {
        const { id, column } = action.payload;
        const source = state.dataSources[id];

        if (source && source.filters && source.filters[column]) {
          delete source.filters[column];
        }
      },
      clearFilters: (state, action) => {
        const { id } = action.payload;
        const source = state.dataSources[id];

        if (source && source.filters) {
          delete source.filters;
        }
      },
      setGeocoderResult: (state, action) => {
        state.geocoderResult = action.payload;
      },
      setViewportFeatures: (state, action) => {
        const { sourceId, features } = action.payload;

        state.viewportFeatures = {
          ...state.viewportFeatures,
          [sourceId]: features
        };
      },
      removeViewportFeatures: (state, action) => {
        const sourceId = action.payload;

        if (state.viewportFeatures[sourceId]) {
          delete state.viewportFeatures[sourceId];
        }
      },
      setCredentials: (state, action) => {
        state.credentials = {
          ...state.credentials,
          ...action.payload
        };
        setDefaultCredentials(state.credentials);
      }
    }
  });

  return slice.reducer;
};
/**
 * Action to add a source to the store
 *
 * @param {string} id - unique id for the source
 * @param {string} data - data definition for the source. Query for SQL dataset or the name of the tileset for BigQuery Tileset
 * @param {string} type - type of source. Posible values are sql or bigquery
 * @param {Object} credentials - (optional) Custom credentials to be used in the source
 */
export const addSource = ({ id, data, type, credentials, connection }) => ({
  type: 'carto/addSource',
  payload: { id, data, type, credentials, connection }
});

/**
 * Action to remove a source from the store
 * @param {string} sourceId - id of the source to remove
 */
export const removeSource = (sourceId) => ({
  type: 'carto/removeSource',
  payload: sourceId
});

/**
 * Action to add a Layer to the store
 * @param {string} id - unique id for the layer
 * @param {string} source - id of the source of the layer
 * @param {object} layerAttributes - custom attributes to pass to the layer
 */
export const addLayer = ({ id, source, layerAttributes = {} }) => ({
  type: 'carto/addLayer',
  payload: { id, source, visible: true, ...layerAttributes }
});

/**
 * Action to update a Layer in the store
 * @param {string} id - id of the layer to update
 * @param {object} layerAttributes - layer attributes to update (source, or other custom attributes)
 */
export const updateLayer = ({ id, layerAttributes }) => ({
  type: 'carto/updateLayer',
  payload: { id, layerAttributes }
});

/**
 * Action to remove a layer from the store
 * @param {string} id - id of the layer to remove
 */
export const removeLayer = (id) => ({ type: 'carto/removeLayer', payload: id });

/**
 * Action to set a basemap
 * @param {String} basemap - the new basemap to add
 */
export const setBasemap = (basemap) => ({ type: 'carto/setBasemap', payload: basemap });

/**
 * Action to add a filter on a given source and column
 * @param {string} id - sourceId of the source to apply the filter on
 * @param {string} column - column to use by the filter at the source
 * @param {FilterType} type - FilterTypes.IN and FilterTypes.BETWEEN
 * @param {array} values -  Values for the filter (eg: ['a', 'b'] for IN or [10, 20] for BETWEEN)
 * @param {string} owner - (optional) id of the widget triggering the filter (to be excluded)
 */
export const addFilter = ({ id, column, type, values, owner }) => ({
  type: 'carto/addFilter',
  payload: { id, column, type, values, owner }
});

/**
 * Action to remove a column filter from a source
 * @param {id} - sourceId of the filter to remove
 * @param {column} - column of the filter to remove
 */
export const removeFilter = ({ id, column }) => ({
  type: 'carto/removeFilter',
  payload: { id, column }
});

/**
 * Action to remove all filters from a source
 * @param {id} - sourceId
 */
export const clearFilters = (id) => ({ type: 'carto/clearFilters', payload: { id } });

const _setViewState = (payload) => ({ type: 'carto/setViewState', payload });
const _setViewPort = (payload) => ({ type: 'carto/setViewPort', payload });
/**
 * Redux selector to get a source by ID
 */
export const selectSourceById = (state, id) => state.carto.dataSources[id];

/**
 * Redux selector to know if viewport features from a certain source are ready
 */
export const selectIsViewportFeaturesReadyForSource = (state, id) =>
  !!state.carto.viewportFeaturesReady[id];

const debouncedSetViewPort = debounce((dispatch, setViewPort) => {
  dispatch(setViewPort());
}, 200);

const NOT_ALLOWED_DECK_PROPS = [
  'transitionDuration',
  'transitionEasing',
  'transitionInterpolator',
  'transitionInterruption'
];

/**
 * Action to set the current ViewState
 * @param {Object} viewState
 */
export const setViewState = (viewState) => {
  return (dispatch) => {
    /**
     * "transition" deck props contain non-serializable values, like:
     *  - transitionInterpolator: instance of LinearInterpolator
     *  - transitionEasing: function
     * To prevent the Redux checker from failing: removing all "transition" properties in the state
     * If need it, transitions should be handled in layer components
     */
    for (const viewProp of NOT_ALLOWED_DECK_PROPS) {
      delete viewState[viewProp];
    }

    dispatch(_setViewState(viewState));
    debouncedSetViewPort(dispatch, _setViewPort);
  };
};

/**
 * Action to set the source features of a layer
 * @param {object} sourceId - the id of the source
 * @param {object} feature - the viewport features
 */
export const setViewportFeatures = (data) => ({
  type: 'carto/setViewportFeatures',
  payload: data
});

/**
 * Action to remove the source features of a layer
 * @param {String} sourceId - the source id to remove
 */
export const removeViewportFeatures = (data) => ({
  type: 'carto/removeViewportFeatures',
  payload: data
});

/**
 * Action to set the ready features state of a layer
 * @param {object} sourceId - the id of the source
 * @param {object} ready - Viewport features have been calculated
 */
export const setViewportFeaturesReady = (data) => ({
  type: 'carto/setViewportFeaturesReady',
  payload: data
});

/**
 * Action to set credentials
 * @param {object} credentials - credentials props to ovewrite
 */
export const setCredentials = (data) => ({
  type: 'carto/setCredentials',
  payload: data
});
