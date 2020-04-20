import * as actionTypes from './actionTypes';

interface SetLocaleRequestAction {
  type: typeof actionTypes.I18N_SERVICE_SET_LOCALE_REQUEST;
  locale: string;
}

interface SetLocaleSuccessAction {
  type: typeof actionTypes.I18N_SERVICE_SET_LOCALE_SUCCESS;
  locale: string;
}

interface SetLocaleFailureAction {
  type: typeof actionTypes.I18N_SERVICE_SET_LOCALE_FAILURE;
  locale: string;
  error: string;
}

export interface Reducer {
  locale: string;
  isLocaleRefreshing: boolean;
  error: string | null;
}

export type i18nServiceActionTypes =
  | SetLocaleRequestAction
  | SetLocaleSuccessAction
  | SetLocaleFailureAction;
