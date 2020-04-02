import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js";
import * as intlSelectors from "./services/i18nService/selectors";
import { setLocale } from "./services/i18nService/actions";
import { State } from "./services";
import { debug } from "./utils/logger";

interface Props {
  locale: string;
  changeLocaleFR: () => void;
  changeLocaleEN: () => void;
}

const mapStateToProps = (state: State) => {
  return {
    locale: intlSelectors.locale(state)
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeLocaleFR: () => dispatch(setLocale("fr-FR")),
  changeLocaleEN: () => dispatch(setLocale("en-US"))
});

const AppI18n = (props: Props) => {
  debug("Current locale:", props.locale);

  return (
    <View style={styles.container}>
      <Text>
        {i18n.t("app.welcome", { defaultValue: "No Welcome message !!!" })}
      </Text>
      <Text>{i18n.t("app.withFllback")}</Text>
      <Button onPress={() => props.changeLocaleFR()} title="Français" />
      <Button onPress={() => props.changeLocaleEN()} title="English" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppI18n);
