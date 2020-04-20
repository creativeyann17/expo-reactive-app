import * as actionTypes from './actionTypes';
import { i18nServiceActionTypes } from './types';

export const setLocaleRequest = (locale: string): i18nServiceActionTypes => {
  return {
    type: actionTypes.I18N_SERVICE_SET_LOCALE_REQUEST,
    locale: locale,
  };
};

export const setLocaleSuccess = (locale: string): i18nServiceActionTypes => {
  return {
    type: actionTypes.I18N_SERVICE_SET_LOCALE_SUCCESS,
    locale: locale,
  };
};

export const setLocaleFailure = (locale: string, error: string): i18nServiceActionTypes => {
  return {
    type: actionTypes.I18N_SERVICE_SET_LOCALE_FAILURE,
    locale: locale,
    error: error,
  };
};
