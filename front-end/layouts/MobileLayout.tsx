import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import I18nSwitch from '../components/I18nSwitch';
import { View, Text } from 'react-native';

const MobileLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Mobile View</Text>
      <I18nSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: Constants.statusBarHeight, // 0 on web, I could use the same layout
  },
});

export default MobileLayout;
