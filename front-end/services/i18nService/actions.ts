import * as actionTypes from "./actionTypes";

export const setLocale = (locale: string) => {
  return {
    type: actionTypes.I18N_SERVICE_SET_LOCALE,
    locale: locale
  };
};
