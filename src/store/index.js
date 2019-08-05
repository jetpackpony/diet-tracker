import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const pReducer = persistReducer(persistConfig, reducer);

const initStore = () => {
  const store = createStore(pReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
}

export default initStore;