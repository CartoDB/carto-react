import { combineReducers, configureStore } from '@reduxjs/toolkit';

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

  return mockedStore;
}
