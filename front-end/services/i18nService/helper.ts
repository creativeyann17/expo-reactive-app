import * as Localization from 'expo-localization';
import get from 'lodash/get';

import i18n from 'i18n-js';

import en_US from './i18n/en_US';
import fr_FR from './i18n/fr_FR';

import { debug } from '../../utils/logger';

const DEFAULT_LOCALE = 'en-US';

export const init = (): string => {
  i18n.translations = {
    // generic
    en: en_US,
    fr: fr_FR,
    // specific
    'en-US': en_US,
    'fr-FR': fr_FR,
  };
  i18n.defaultLocale = DEFAULT_LOCALE;
  i18n.locale = getSystemLocale();
  i18n.fallbacks = true;

  debug('Init i18n locale:', i18n.locale);

  return i18n.currentLocale();
};

export const setLocale = (locale: string) => {
  i18n.locale = locale;
  return i18n.currentLocale();
};

export const getSystemLocale = () => {
  return get(Localization, 'locale', DEFAULT_LOCALE);
};
