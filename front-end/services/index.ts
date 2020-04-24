import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import i18nServiceReducer from './i18nService/reducer';
import wsServiceReducer from './wsService/reducer';
import { Reducer as i18nServiceReducerType } from './i18nService/types';
import i18ServiceSaga from './i18nService';
import wsServiceSaga from './wsService';
import { Platform } from 'react-native';

export interface State {
  i18nServiceReducer: i18nServiceReducerType;
  wsServiceReducer: any;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    i18nServiceReducer,
    wsServiceReducer,
  });

  function* rootSaga() {
    yield all([i18ServiceSaga(), wsServiceSaga()]);
  }

  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  let composeEnhancer = compose;

  if (__DEV__ && Platform.OS === 'web') {
    const { logger } = require('redux-logger');
    middlewares = [...middlewares, logger];
    composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
