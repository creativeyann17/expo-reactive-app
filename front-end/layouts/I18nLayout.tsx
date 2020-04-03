import React, { Children } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import * as intlSelectors from "../services/i18nService/selectors";
import { State } from "../services";
import { debug } from "../utils/logger";

interface Props {
  locale: string;
  children: any;
}

const mapStateToProps = (state: State) => {
  return {
    locale: intlSelectors.locale(state)
  };
};

const I18nLayout = (props: Props) => {
  debug("Current locale:", props.locale);

  return (
    <View key={props.locale} style={styles.container}>
      {props.children}
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

export default connect(mapStateToProps)(I18nLayout);
