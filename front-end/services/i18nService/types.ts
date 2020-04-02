import * as actionTypes from "./actionTypes";

export interface SetLocaleAction {
  type: typeof actionTypes.I18N_SERVICE_SET_LOCALE;
  locale: string;
}

export interface Reducer {
  locale: string;
}

export type i18nServiceActionTypes = SetLocaleAction;
