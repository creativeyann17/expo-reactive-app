import * as actionTypes from './actionTypes';
import {init, setLocale} from './helper';

const initialState = {
  locale: init(),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.I18N_SERVICE_LOCALE:
      setLocale(action.locale);
      return {...state, locale: action.locale}
    default:
      return state;
  }
}
