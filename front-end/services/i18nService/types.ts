import * as actionTypes from './actionTypes';

export interface InitI18n {
  type: typeof actionTypes.I18N_SERVICE_INIT;
}

export interface SetLocaleAction {
  type: typeof actionTypes.I18N_SERVICE_SET_LOCALE;
  locale: string;
}

export interface Reducer {
  locale: string;
}

export type i18nServiceActionTypes = SetLocaleAction | InitI18n;
