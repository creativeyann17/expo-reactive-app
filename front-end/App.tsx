import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { View, Platform, StyleSheet } from "react-native";
import { store } from "./services";
import LoadingLayout from "./layouts/LoadingLayout";
import I18nLayout from "./layouts/I18nLayout";

const WebLayout = React.lazy(() => import("./layouts/WebLayout"));
const MobileLayout = React.lazy(() => import("./layouts/MobileLayout"));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Suspense fallback={<LoadingLayout />}>
          <I18nLayout>
            {Platform.OS === "web" ? <WebLayout /> : <MobileLayout />}
          </I18nLayout>
        </Suspense>
      </View>
    </Provider>
  );
}
