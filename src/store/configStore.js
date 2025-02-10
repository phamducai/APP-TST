import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
// defaults to localStorage for web
const sagaMiddleware = createSagaMiddleware();

import allReducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'ROOT_STORAGE',
  storage: AsyncStorage,
  whitelist: [
    'audioStorageReducers',
    'bookCollectionReducers',
    'audioCategoryReducers',
  ],
};

const persistedReducer = persistReducer(persistConfig, allReducers);
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export default () => {
  let persistor = persistStore(store);

  return {store, persistor};
};

sagaMiddleware.run(rootSaga);
