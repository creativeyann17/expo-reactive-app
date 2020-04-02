import React from 'react';
import { Provider } from 'react-redux';
import { store } from './services';
import AppI18n from './AppI18n';

export default function App () {
  return (
    <Provider store={store}>
      <AppI18n />
    </Provider>
  );
}
