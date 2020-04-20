import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { setLocaleRequest } from '../services/i18nService/actions';
import { isLocaleRefreshing } from '../services/i18nService/selectors';
import { State } from '../services';

interface Props {
  isLocaleRefreshing: boolean;
  changeLocaleFR: () => void;
  changeLocaleEN: () => void;
}

const mapStateToProps = (state: State) => ({
  isLocaleRefreshing: isLocaleRefreshing(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeLocaleFR: () => dispatch(setLocaleRequest('fr-FR')),
  changeLocaleEN: () => dispatch(setLocaleRequest('en-US')),
});

const styles = EStyleSheet.create({
  thin: {
    fontFamily: 'space-mono',
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: '0.5rem',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flexDirection: 'column',
  },
  actions: {
    flexDirection: 'row',
    paddingTop: '1rem',
  },
  button: {
    width: '10rem',
  },
  marginRight: {
    marginRight: '1rem',
  },
});

const I18nSwitch = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text h1>{i18n.t('app.welcome', { defaultValue: 'No Welcome message !!!' })}</Text>
      <Text style={styles.thin}>{i18n.t('app.withFallback')}</Text>
      <View style={styles.actions}>
        <Button
          loading={props.isLocaleRefreshing}
          buttonStyle={[styles.button, styles.marginRight]}
          title="Français"
          onPress={() => props.changeLocaleFR()}
        />
        <Button
          loading={props.isLocaleRefreshing}
          buttonStyle={[styles.button]}
          title="English"
          onPress={() => props.changeLocaleEN()}
        />
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(I18nSwitch);
