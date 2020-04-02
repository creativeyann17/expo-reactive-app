import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import i18nServiceReducer from './i18nService/reducer';

const rootReducer = combineReducers({
  i18nServiceReducer
});

function* rootSaga() {
    yield all([]);
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (__DEV__) {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);