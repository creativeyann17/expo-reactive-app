import * as actionTypes from './actionTypes';
import { init } from './helper';
import { i18nServiceActionTypes, Reducer } from './types';

const initialState: Reducer = {
  locale: init(),
  isLocaleRefreshing: false,
  error: null,
};

export default function (state = initialState, action: i18nServiceActionTypes): Reducer {
  switch (action.type) {
    case actionTypes.I18N_SERVICE_SET_LOCALE_REQUEST:
      return { ...state, isLocaleRefreshing: true };
    case actionTypes.I18N_SERVICE_SET_LOCALE_SUCCESS:
      return { ...state, isLocaleRefreshing: false, error: null, locale: action.locale };
    case actionTypes.I18N_SERVICE_SET_LOCALE_FAILURE:
      return { ...state, isLocaleRefreshing: false, error: action.error };
    default:
      return state;
  }
}
