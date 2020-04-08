import * as actionTypes from "./actionTypes";
import { init, setLocale } from "./helper";
import { i18nServiceActionTypes, Reducer } from "./types";

const initialState: Reducer = {
  locale: init(),
};

export default function (state = initialState, action: i18nServiceActionTypes) {
  switch (action.type) {
    case actionTypes.I18N_SERVICE_SET_LOCALE:
      setLocale(action.locale);
      return { ...state, locale: action.locale };
    default:
      return state;
  }
}
