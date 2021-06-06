import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {loadState} from './localstorage.store';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const persistedStore = loadState()
export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  persistedStore, 
  applyMiddleware(sagaMiddleware,routerMiddleware(history),logger), 
)


sagaMiddleware.run(rootSaga)
