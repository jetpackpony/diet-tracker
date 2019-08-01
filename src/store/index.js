import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

const initStore = () => createStore(reducer, applyMiddleware(logger));

export default initStore;