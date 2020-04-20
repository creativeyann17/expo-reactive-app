import { State } from '../index';

export const locale = (state: State) => state.i18nServiceReducer.locale;
export const isLocaleRefreshing = (state: State) => state.i18nServiceReducer.isLocaleRefreshing;
