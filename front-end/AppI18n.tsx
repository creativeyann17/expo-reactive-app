import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import * as intlSelectors from './services/i18nService/selectors';
import { locale } from './services/i18nService/actions';

interface Props {
  locale: string
  changeLocaleFR: () => void
  changeLocaleEN: () => void
}

const mapStateToProps = state => {
  return {
    locale: intlSelectors.locale(state),
  };
};

const mapDispatchToProps = dispatch => ({
  changeLocaleFR: () => dispatch(locale('fr-FR')),
  changeLocaleEN: () => dispatch(locale('en-US')),
});

const AppI18n = (props: Props) => {

  if(__DEV__){
    console.info("Current locale:", props.locale);
  }
  
  return (
    <View style={styles.container} >
      <Text>{i18n.t('app.welcome', {defaultValue: 'No Welcome message !!!'})}</Text>
      <Text>{i18n.t('app.withFllback')}</Text>
      <Button
        onPress={() => props.changeLocaleFR()}
        title="fr-FR"
      />
            <Button
        onPress={() => props.changeLocaleEN()}
        title="en-US"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppI18n);


