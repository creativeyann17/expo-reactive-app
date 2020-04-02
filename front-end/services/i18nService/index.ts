import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import { SetLocaleAction } from "./types";
import { setLocale } from "./helper";

export function* watchSetLocale(action: SetLocaleAction) {
  // setLocale(action.locale);
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.I18N_SERVICE_SET_LOCALE, watchSetLocale);
}
