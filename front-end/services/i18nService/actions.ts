import * as actionTypes from "./actionTypes";
import { i18nServiceActionTypes } from "./types";

export const initI18n = () => {
  return {
    type: actionTypes.I18N_SERVICE_INIT,
  };
};

export const setLocale = (locale: string) => {
  return {
    type: actionTypes.I18N_SERVICE_SET_LOCALE,
    locale: locale,
  };
};
