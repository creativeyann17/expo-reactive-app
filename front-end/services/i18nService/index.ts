import { put, takeLatest } from 'redux-saga/effects';
import toString from 'lodash/toString';
import * as actionTypes from './actionTypes';
import { i18nServiceActionTypes } from './types';
import { setLocaleSuccess, setLocaleFailure } from './actions';
import { setLocale } from './helper';

export function* watchSetLocale({ locale }: i18nServiceActionTypes) {
  try {
    yield put(setLocaleSuccess(setLocale(locale)));
  } catch (e) {
    yield put(setLocaleFailure(locale, e));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.I18N_SERVICE_SET_LOCALE_REQUEST, watchSetLocale);
}
