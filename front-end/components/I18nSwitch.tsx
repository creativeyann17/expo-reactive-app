import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js";
import { setLocale } from "../services/i18nService/actions";

interface Props {
  changeLocaleFR: () => void;
  changeLocaleEN: () => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  changeLocaleFR: () => dispatch(setLocale("fr-FR")),
  changeLocaleEN: () => dispatch(setLocale("en-US")),
});

const I18nSwitch = (props: Props) => {
  return (
    <View>
      <Text>
        {i18n.t("app.welcome", { defaultValue: "No Welcome message !!!" })}
      </Text>
      <Text>{i18n.t("app.withFallback")}</Text>
      <Button onPress={() => props.changeLocaleFR()} title="Français" />
      <Button onPress={() => props.changeLocaleEN()} title="English" />
    </View>
  );
};

export default connect(null, mapDispatchToProps)(I18nSwitch);
