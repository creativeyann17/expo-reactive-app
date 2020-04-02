import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import i18nServiceReducer from "./i18nService/reducer";
import { Reducer } from "./i18nService/types";
import i18ServiceSaga from "./i18nService";

const rootReducer = combineReducers({
  i18nServiceReducer
});

function* rootSaga() {
  yield all([i18ServiceSaga()]);
}

export interface State {
  i18nServiceReducer: Reducer;
}

const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware];

if (__DEV__) {
  const { Platform } = require("react-native");
  if (Platform.OS === "web") {
    const { logger } = require("redux-logger");
    middlewares = [...middlewares, logger];
  }
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
