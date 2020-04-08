import React from "react";
import { Text } from "react-native";
import i18n from "i18n-js";

const LoadingLayout = () => {
  return <Text>{i18n.t("app.loading")}</Text>;
};

export default LoadingLayout;
