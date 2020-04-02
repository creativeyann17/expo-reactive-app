import * as Localization from "expo-localization";
import get from "lodash/get";

import i18n from "i18n-js";

import en_US from "./i18n/en_US";
import fr_FR from "./i18n/fr_FR";

import { debug } from "../../utils/logger";

export const init = (): string => {
  i18n.translations = {
    "en-US": en_US,
    "fr-FR": fr_FR
  };
  i18n.defaultLocale = "en-US";
  i18n.locale = getDefaultLocale();
  i18n.fallbacks = true;

  debug("Init i18n locale:", i18n.locale);

  return i18n.locale;
};

export const setLocale = (locale: string) => {
  i18n.locale = locale;
};

export const getDefaultLocale = () => {
  return get(Localization, "locale", "en-US");
};
