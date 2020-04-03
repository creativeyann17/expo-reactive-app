import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Platform } from "react-native";
import { store } from "./services";
import LoadingLayout from "./layouts/LoadingLayout";
import I18nLayout from "./layouts/I18nLayout";

const WebLayout = React.lazy(() => import("./layouts/WebLayout"));
const MobileLayout = React.lazy(() => import("./layouts/MobileLayout"));

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingLayout />}>
        <I18nLayout>
          {Platform.OS === "web" ? <WebLayout /> : <MobileLayout />}
        </I18nLayout>
      </Suspense>
    </Provider>
  );
}
