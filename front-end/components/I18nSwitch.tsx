import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { setLocaleRequest } from '../services/i18nService/actions';
import { isLocaleRefreshing } from '../services/i18nService/selectors';
import { State } from '../services';
import { Header, Input } from 'react-native-elements';
import { withTheme } from 'react-native-elements';

interface Props {
  theme: any;
  updateTheme: (style: any) => void;
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
    // fontFamily: 'space-mono',
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
  inputs: {
    flexDirection: 'column',
  },
  button: {
    width: '10rem',
  },
  header: { marginTop: 0 },
  marginRight: {
    marginRight: '1rem',
  },
});

const I18nSwitch = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: props.theme.colors.secondary }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
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
      <View style={styles.inputs}>
        <Input
          label="Login"
          placeholder="username or email"
          errorStyle={{ color: 'red' }}
          errorMessage="invalid username or email"
        />
        <Input placeholder="password" secureTextEntry={true} keyboardType="numeric" />
        <Button
          title="Primary dark"
          onPress={() =>
            props.updateTheme({
              colors: { primary: '#333' },
              Button: { titleStyle: { color: '#fff' } },
            })
          }
        />
        <Button
          title="Primary light"
          onPress={() =>
            props.updateTheme({
              colors: { primary: '#eee' },
              Button: { titleStyle: { color: '#000' } },
            })
          }
        />
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(I18nSwitch));
