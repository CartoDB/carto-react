import { createSlice } from '@reduxjs/toolkit';
import { WebMercatorViewport } from '@deck.gl/core';
import { removeWorker } from '@carto/react-workers';
import {
  FEATURE_SELECTION_MODES,
  FiltersLogicalOperators,
  debounce
} from '@carto/react-core';

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
      spatialFilter: null,
      featureSelectionMode: FEATURE_SELECTION_MODES.POLYGON,
      featureSelectionEnabled: false,
      featuresReady: {},
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
      setFeaturesReady: (state, action) => {
        const { sourceId, ready } = action.payload;

        state.featuresReady = {
          ...state.featuresReady,
          [sourceId]: ready
        };
      },
      updateLayer: (state, action) => {
        const layer = state.layers[action.payload.id];
        if (layer) {
          const newLayer = { ...layer, ...action.payload.layerAttributes };
          const hasLegendUpdate = layer.legend && newLayer.legend;
          // Merge legend object if it's not an array (for the case of multiple legend objects per layer)
          if (hasLegendUpdate && !Array.isArray(newLayer.legend)) {
            newLayer.legend = { ...layer.legend, ...newLayer.legend };
          }

          // TODO: Study if we should use a deepmerge fn
          state.layers[action.payload.id] = {
            ...newLayer
          };
        }
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
      addSpatialFilter: (state, action) => {
        const { sourceId, geometry } = action.payload;
        if (sourceId) {
          const source = state.dataSources[sourceId];

          if (source) {
            source.spatialFilter = geometry;
          }
        } else {
          state.spatialFilter = geometry;
        }
      },
      removeSpatialFilter: (state, action) => {
        const sourceId = action.payload;
        if (sourceId) {
          const source = state.dataSources[sourceId];

          if (source) {
            source.spatialFilter = null;
          }
        } else {
          state.spatialFilter = null;
        }
      },
      addFilter: (state, action) => {
        const { id, column, type, values, owner, params, ignore } = action.payload;
        const source = state.dataSources[id];

        if (source) {
          if (!source.filters) {
            source.filters = {};
          }

          if (!source.filters[column]) {
            source.filters[column] = {};
          }

          source.filters[column][type] = { values, owner, params, ignore };
        }
      },
      removeFilter: (state, action) => {
        const { id, column, owner } = action.payload;
        const source = state.dataSources[id];

        if (source && source.filters && source.filters[column]) {
          const typeToDelete = Object.entries(source.filters[column])
            .filter(([_, filter]) => filter.owner === owner)
            .map(([filterType]) => filterType);

          typeToDelete.forEach((type) => delete source.filters[column][type]);

          if (!owner || Object.keys(source.filters[column]).length === 0) {
            delete source.filters[column];
          }
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
      setCredentials: (state, action) => {
        state.credentials = {
          ...state.credentials,
          ...action.payload
        };
      },
      setFeatureSelectionMode: (state, action) => {
        state.featureSelectionMode = action.payload;
      },
      setFeatureSelectionEnabled: (state, action) => {
        state.featureSelectionEnabled = action.payload;
      }
    }
  });

  return slice.reducer;
};

/**
 * Action to add a source to the store.
 *
 * @param {object} data
 * @param {string} data.id - unique id for the source.
 * @param {string} data.data - data definition for the source. Query for SQL dataset or the name of the tileset for BigQuery Tileset.
 * @param {string} data.type - type of source. Possible values are sql or bigquery.
 * @param {object=} data.credentials - (optional) Custom credentials to be used in the source.
 * @param {string} data.connection - connection name for CARTO 3 source.
 * @param {import('../types').SourceFilters=} data.filters - logical operator that defines how filters for different columns are joined together.
 * @param {FiltersLogicalOperators=} data.filtersLogicalOperator - logical operator that defines how filters for different columns are joined together.
 * @param {import('@deck.gl/carto').QueryParameters} data.queryParameters - SQL query parameters.
 * @param {string=} data.geoColumn - (optional) name of column containing geometries or spatial index data.
 * @param {string=} data.aggregationExp - (optional) for spatial index data.
 * @param {number=} data.aggregationResLevel - (optional) for spatial index data.
 * @param {string=} data.provider - (optional) type of the data warehouse.
 */
export const addSource = ({
  id,
  data,
  type,
  credentials,
  connection,
  filters = undefined,
  filtersLogicalOperator = FiltersLogicalOperators.AND,
  queryParameters = [],
  geoColumn,
  spatialDataType,
  spatialDataColumn,
  aggregationExp,
  aggregationResLevel,
  provider
}) => ({
  type: 'carto/addSource',
  payload: {
    id,
    data,
    type,
    credentials,
    connection,
    ...(filters && { filters }),
    filtersLogicalOperator,
    queryParameters,
    geoColumn,
    aggregationResLevel,
    spatialDataType,
    spatialDataColumn,
    aggregationExp,
    provider
  }
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
 * Action to add a Layer to the store.
 * @param {object} data
 * @param {string} data.id - unique id for the layer.
 * @param {string} data.source - id of the source of the layer.
 * @param {object} data.layerAttributes - custom attributes to pass to the layer.
 */
export const addLayer = ({ id, source, layerAttributes = {} }) => ({
  type: 'carto/addLayer',
  payload: { id, source, visible: true, ...layerAttributes }
});

/**
 * Action to update a Layer in the store.
 * @param {object} data
 * @param {string} data.id - id of the layer to update.
 * @param {object} data.layerAttributes - layer attributes to update (source, or other custom attributes).
 */
export const updateLayer = ({ id, layerAttributes }) => ({
  type: 'carto/updateLayer',
  payload: { id, layerAttributes }
});

/**
 * Action to remove a layer from the store.
 * @param {string} id - id of the layer to remove.
 */
export const removeLayer = (id) => ({ type: 'carto/removeLayer', payload: id });

/**
 * Action to set a basemap.
 * @param {string} basemap - the new basemap to add.
 */
export const setBasemap = (basemap) => ({ type: 'carto/setBasemap', payload: basemap });

/**
 * Action to add a spatial filter.
 * @param {object} data
 * @param {string=} data.sourceId - if indicated, mask is applied to that source. If not, it's applied to every source.
 * @param {GeoJSON} data.geometry - valid geojson object.
 */
export const addSpatialFilter = ({ sourceId, geometry }) => ({
  type: 'carto/addSpatialFilter',
  payload: { sourceId, geometry }
});

/**
 * Action to remove a spatial filter on a given source.
 * @param {string=} sourceId - sourceId of the source to apply the filter on. If missing, root spatial filter is removed.
 */
export const removeSpatialFilter = (sourceId) => ({
  type: 'carto/removeSpatialFilter',
  payload: sourceId
});

/**
 * Action to add a filter on a given source and column.
 * @param {object} data
 * @param {string} data.id - sourceId of the source to apply the filter on.
 * @param {string} data.column - column to use by the filter at the source.
 * @param {import('@carto/react-core')._FilterTypes} data.type - FilterTypes.IN, FilterTypes.BETWEEN, FilterTypes.CLOSED_OPEN and FilterTypes.TIME
 * @param {array} data.values -  values for the filter (eg: ['a', 'b'] for IN or [10, 20] for BETWEEN).
 * @param {string} data.owner - (optional) id of the widget triggering the filter (to be excluded).
 * @param {object=} data.params - (optional) additional filter parameters.
 * * @param {string} data.ignore - (optional) boolean indicating that it should be ignored by other widgets.
 */
export const addFilter = ({ id, column, type, values, owner, params, ignore }) => ({
  type: 'carto/addFilter',
  payload: { id, column, type, values, owner, params, ignore }
});

/**
 * Action to remove a column filter from a source.
 * @param {object} data
 * @param {string} data.id - sourceId of the filter to remove.
 * @param {string} data.column - column of the filter to remove.
 * @param {string=} data.owner - (optional) id of the widget triggering the filter.
 */
export const removeFilter = ({ id, column, owner }) => ({
  type: 'carto/removeFilter',
  payload: { id, column, owner }
});

/**
 * Action to remove all filters from a source.
 * @param {string} id - sourceId.
 */
export const clearFilters = (id) => ({ type: 'carto/clearFilters', payload: { id } });

const _setViewState = (payload) => ({ type: 'carto/setViewState', payload });
const _setViewPort = (payload) => ({ type: 'carto/setViewPort', payload });

/**
 * Redux selector to get a source by ID
 */
export const selectSourceById = (state, id) => state.carto.dataSources[id];

/**
 * Redux selector to select the active viewport
 */
export const selectViewport = (state) => {
  return state.carto.viewport ? state.carto.viewport : null;
};

/**
 * Redux selector to select the spatial filter of a given sourceId or the root one
 */
export const selectSpatialFilter = (state, sourceId) => {
  let spatialFilterGeometry = state.carto.spatialFilter;
  if (spatialFilterGeometry?.properties?.disabled) {
    spatialFilterGeometry = null;
  }
  return sourceId
    ? state.carto.dataSources[sourceId]?.spatialFilter || spatialFilterGeometry
    : spatialFilterGeometry;
};

/**
 * Redux selector to select the spatial filter of a given sourceId or the root one.
 * This selector returns null if the spatial filter is invalid (if it intersetcs itself)
 */
export const selectValidSpatialFilter = (state, sourceId) => {
  const spatialFilter = selectSpatialFilter(state, sourceId);
  return spatialFilter?.properties?.invalid ? null : spatialFilter;
};

/**
 * Redux selector to select the feature selection mode based on if it's enabled
 */
export const selectFeatureSelectionMode = (state) =>
  (state.carto.featureSelectionEnabled && state.carto.featureSelectionMode) || null;

/**
 * Redux selector to know if features from a certain source are ready
 */
export const selectAreFeaturesReadyForSource = (state, id) =>
  !!state.carto.featuresReady[id];

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
 * Action to set the current ViewState.
 *
 * Requires redux-thunk middleware, also invokes debounced `setViewPort`.
 * @param {object} viewState
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
 * Action to set the current ViewState.
 *
 * Doesn't refresh widgets immetiately, requires user to call `setViewPort` once all updates are ready.
 * @param {object} viewState
 */
export const setViewStateDirect = (viewState) => ({
  type: 'carto/setViewState',
  payload: viewState
});

/**
 * Sync current viewport state deriving it from `viewState`.
 *
 * Causes widgets in remote mode to refresh its data.
 */
export const setViewPort = () => ({
  type: 'carto/setViewPort'
});

/**
 * Action to set the ready features state of a layer.
 * @param {object} data
 * @param {object} data.sourceId - the id of the source.
 * @param {object} data.ready - viewport features have been calculated.
 */
export const setFeaturesReady = (data) => ({
  type: 'carto/setFeaturesReady',
  payload: data
});

/**
 * Action to set credentials.
 * @param {object} credentials - credentials props to ovewrite.
 */
export const setCredentials = (credentials) => ({
  type: 'carto/setCredentials',
  payload: credentials
});

/**
 * Action to set feature selection mode.
 * @param {boolean} mode
 */
export const setFeatureSelectionMode = (mode) => ({
  type: 'carto/setFeatureSelectionMode',
  payload: mode
});

/**
 * Action to set if feature selection tool is enabled.
 * @param {boolean} enabled
 */
export const setFeatureSelectionEnabled = (enabled) => ({
  type: 'carto/setFeatureSelectionEnabled',
  payload: enabled
});
