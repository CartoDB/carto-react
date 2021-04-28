import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as cartoSlice from '../../../../react-redux/src/slices/cartoSlice';

const MOCKED_SOURCE = {
  credentials: {
    username: 'public',
    apiKey: 'default_public'
  },
  id: 'sb-data-source',
  type: 'sql',
  data: 'data'
};

let mockedStore = {};

function mockReducerManagerCreation(initialReducers) {
  const reducers = { ...initialReducers };
  let combinedReducer = Object.keys(reducers).length
    ? combineReducers(reducers)
    : () => {};

  return {
    reduce: (state, action) => {
      return combinedReducer(state, action);
    },
    add: (key, reducer) => {
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
      mockedStore.replaceReducer(combinedReducer);
    }
  };
}

export function mockAppStoreConfiguration() {
  const reducerManager = mockReducerManagerCreation();
  mockedStore = configureStore({
    reducer: reducerManager.reduce
  });

  mockedStore.reducerManager = reducerManager;
  mockedStore.reducerManager.add('carto', cartoSlice.createCartoSlice({}));
  mockedStore.dispatch(cartoSlice.addSource(MOCKED_SOURCE));

  return mockedStore;
}
