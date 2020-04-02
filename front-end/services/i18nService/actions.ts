import * as actionTypes from './actionTypes';

export const locale = (locale: string) => {
  return {
    type: actionTypes.I18N_SERVICE_LOCALE,
    locale: locale
  };
};
