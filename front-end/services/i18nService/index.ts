import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { setLocale } from './actions';
import { init } from './helper';

export function* watchInit() {
  yield put(setLocale(init()));
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.I18N_SERVICE_INIT, watchInit);
}
