//InitialScreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { scale, verticalScale, moderateScale } from './Scaling';
export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { culture: '' };
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./StatCanLogo.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', }}>
          <View style={styles.container1}>
            <Button title="English" style={styles.button} onPress={() => { resources.culture = 'en'; this.props.navigation.navigate('CreatePassword', { reset: false }) }} />
            <Text style={styles.textL} onPress={() => { resources.culture = 'en'; this.props.navigation.navigate('Term') }}>Term & conditions</Text>
          </View>
          <View style={styles.seperator}>
          </View>
          <View style={styles.container1}>
            <Button title="Français" style={styles.button} onPress={() => { resources.culture = 'fr'; this.props.navigation.navigate('CreatePassword', { reset: false }) }} />
            <Text style={styles.textR} onPress={() => { resources.culture = 'fr'; this.props.navigation.navigate('Term') }}>Avis</Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  logo: { width: moderateScale(300), height: verticalScale(100) },
  container1: { width: moderateScale(150), height: verticalScale(50),borderRadius:4 },
  button: { width: moderateScale(100), fontSize: moderateScale(16) },
  textL: { marginLeft: moderateScale(20), fontSize: moderateScale(14) },
  textR: { marginLeft: moderateScale(50), fontSize: moderateScale(14) },
  seperator: { width: moderateScale(20), height: verticalScale(50) }
});