import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import i18nServiceReducer from "./i18nService/reducer";
import { Reducer } from "./i18nService/types";
import i18ServiceSaga from "./i18nService";

export interface State {
  i18nServiceReducer: Reducer;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    i18nServiceReducer,
  });

  function* rootSaga() {
    yield all([i18ServiceSaga()]);
  }

  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  let composeEnhancer = compose;

  if (__DEV__) {
    const { logger } = require("redux-logger");
    middlewares = [...middlewares, logger];
    composeEnhancer =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
