import * as cartoSlice from '../src/slices/cartoSlice';
import { setDefaultCredentials } from '@deck.gl/carto';
import { mockAppStoreConfiguration } from './mockReducerManager';
import { VOYAGER } from '@carto/react-basemaps';

const INITIAL_STATE = {
  viewState: {
    latitude: 0,
    longitude: 0,
    zoom: 1,
    pitch: 0,
    bearing: 0,
    dragRotate: false
  },
  credentials: {
    apiVersion: 'v2',
    username: 'public',
    apiKey: 'default_public',
    mapsUrl: 'https://maps-api-v2.{region}.carto.com/user/{user}'
  }
};

jest.mock('@deck.gl/carto', () => ({
  setDefaultCredentials: jest.fn()
}));

describe('carto slice', () => {
  const store = mockAppStoreConfiguration();
  store.reducerManager.add('carto', cartoSlice.createCartoSlice(INITIAL_STATE));

  describe('source actions', () => {
    const sourceInfo = {
      id: 'source-test-id',
      data: 'SELECT * FROM stores',
      type: 'sql'
    };

    test('should add a source', () => {
      store.dispatch(cartoSlice.addSource(sourceInfo));
      const { carto } = store.getState();
      expect(carto.dataSources[sourceInfo.id]).toMatchObject(sourceInfo);
    });

    test('should add a source with a connection', () => {
      const sourceInfoWithConnnection = {
        ...sourceInfo,
        connection: 'whatever-connection-name'
      };
      store.dispatch(cartoSlice.addSource(sourceInfoWithConnnection));
      const { carto } = store.getState();
      expect(carto.dataSources[sourceInfo.id]).toMatchObject(sourceInfoWithConnnection);
    });

    test('should remove a source', () => {
      store.dispatch(cartoSlice.removeSource(sourceInfo.id));
      const { carto } = store.getState();
      expect(carto.dataSources).not.toHaveProperty(sourceInfo.id);
    });
  });

  describe('layer actions', () => {
    const layerInfo = {
      id: 'whatever-id',
      source: 'whatever-source-id',
      visible: true
    };

    const extraInfo = {
      id: layerInfo.id,
      layerAttributes: { a: 1 }
    };

    test('should not update a layer info if there is no layer', () => {
      store.dispatch(cartoSlice.updateLayer(extraInfo));
      const { carto } = store.getState();
      expect(carto.layers).not.toHaveProperty(layerInfo.id);
    });

    test('should add a new layer', () => {
      store.dispatch(cartoSlice.addLayer(layerInfo));
      const { carto } = store.getState();
      expect(carto.layers[layerInfo.id]).toEqual(layerInfo);
    });

    test('should update a layer with extra layerAttributes info', () => {
      store.dispatch(cartoSlice.updateLayer(extraInfo));
      const { carto } = store.getState();
      const expected = {
        ...layerInfo,
        ...extraInfo.layerAttributes
      };
      expect(carto.layers[layerInfo.id]).toEqual(expected);
    });

    test('should remove a layer', () => {
      store.dispatch(cartoSlice.removeLayer(layerInfo.id));
      const { carto } = store.getState();
      expect(carto.layers).not.toHaveProperty(layerInfo.id);
    });
  });

  describe('basemap actions', () => {
    test('should update with a new basemap', () => {
      store.dispatch(cartoSlice.setBasemap(VOYAGER));
      const { carto } = store.getState();
      expect(carto.basemap).toBe(VOYAGER);
    });
  });

  describe('view actions', () => {
    test('should update with a new viewState', () => {
      store.dispatch(cartoSlice.setViewState({ zoom: 3 }));
      const { carto } = store.getState();
      expect(carto.viewState.zoom).toBe(3);
    });
  });

  describe('spatial filter actions', () => {
    const spatialFilter = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [1, 1]
          ]
        ]
      },
      properties: {}
    };

    const sourceId = 'theSource';

    test('should add/remove a spatial filter to a source', () => {
      store.dispatch(cartoSlice.addSource({ id: sourceId }));
      store.dispatch(
        cartoSlice.addSpatialFilter({
          sourceId,
          geometry: spatialFilter
        })
      );
      let state = store.getState();
      expect(state.carto.dataSources[sourceId].spatialFilter).toEqual(spatialFilter);
      // Now with the selector
      expect(cartoSlice.selectSpatialFilter(state, sourceId)).toEqual(spatialFilter);
      // Once it's added, remove it
      store.dispatch(cartoSlice.removeSpatialFilter(sourceId));
      state = store.getState();
      expect(state.carto.dataSources[sourceId].spatialFilter).toBe(null);
    });

    test('should add/remove a spatial filter to root state for applying it to every source', () => {
      store.dispatch(
        cartoSlice.addSpatialFilter({
          geometry: spatialFilter
        })
      );
      let state = store.getState();
      expect(state.carto.spatialFilter).toEqual(spatialFilter);
      // Now with the selector
      expect(cartoSlice.selectSpatialFilter(state)).toEqual(spatialFilter);
      // Once it's added, remove it
      store.dispatch(cartoSlice.removeSpatialFilter());
      state = store.getState();
      expect(state.carto.spatialFilter).toBe(null);
    });

    test("selector shouldn't return root spatial filter geometry if disabled", () => {
      store.dispatch(
        cartoSlice.addSpatialFilter({
          geometry: {
            ...spatialFilter,
            properties: {
              ...spatialFilter.properties,
              disabled: true
            }
          }
        })
      );
      const state = store.getState();
      expect(cartoSlice.selectSpatialFilter(state)).toBe(null);
    });
  });

  describe('drawing tool mode', () => {
    test('should set drawing tool mode', () => {
      const MODE = 'abracadabra';
      store.dispatch(cartoSlice.setDrawingToolMode(MODE));
      const state = store.getState();
      expect(state.carto.drawingToolMode).toEqual(MODE);
    });
  });

  describe('filters actions', () => {
    const filter = {
      id: 'source-test-id-2',
      column: 'test-column',
      type: 'sql',
      values: [1, 2],
      owner: 'widgetId'
    };

    test('should not add a filter if there is no source', () => {
      store.dispatch(cartoSlice.addFilter(filter));
      const { carto } = store.getState();
      expect(carto.dataSources[filter.id]).toBe(undefined);
    });

    test('should add a filter', () => {
      store.dispatch(cartoSlice.addSource({ id: filter.id }));
      store.dispatch(cartoSlice.addFilter(filter));
      const { carto } = store.getState();
      expect(carto.dataSources[filter.id].filters[filter.column][filter.type]).toEqual({
        values: filter.values,
        owner: filter.owner
      });
    });

    test('should remove a filter', () => {
      store.dispatch(cartoSlice.removeFilter({ id: filter.id, column: filter.column }));
      const { carto } = store.getState();
      expect(carto.dataSources[filter.id].filters).not.toHaveProperty(filter.column);
    });

    test('should clear a filter', () => {
      const sourceId = 'source-test-id-3';
      store.dispatch(cartoSlice.addSource({ id: sourceId }));
      store.dispatch(cartoSlice.addFilter({ ...filter, id: sourceId }));
      store.dispatch(cartoSlice.clearFilters(sourceId));
      const { carto } = store.getState();
      expect(carto.dataSources[sourceId]).not.toHaveProperty('filters');
    });
  });

  describe('viewport features actions', () => {
    const featuresInfo = {
      sourceId: 'whatever-source-id',
      features: [{ a: 1 }]
    };

    test('worker calculations should be finished', () => {
      const sourceInfo = {
        sourceId: 'whatever-source-id',
        ready: true
      };
      store.dispatch(cartoSlice.setFeaturesReady(sourceInfo));
      const { carto } = store.getState();
      expect(carto.featuresReady[sourceInfo.sourceId]).toBe(true);
    });
  });

  describe('credentials actions', () => {
    test('should override default credentials', () => {
      store.dispatch(cartoSlice.setCredentials({ updatedProp: 'update' }));

      const { carto: state } = store.getState();
      expect(state.credentials).toEqual({
        ...INITIAL_STATE.credentials,
        updatedProp: 'update'
      });
    });

    test('should call setDefaultCredentials', () => {
      store.dispatch(cartoSlice.setCredentials({ updatedProp: 'update' }));

      const { carto: state } = store.getState();
      expect(setDefaultCredentials).toHaveBeenCalledWith(state.credentials);
    });
  });
});
