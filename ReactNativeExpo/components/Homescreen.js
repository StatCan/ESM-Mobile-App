// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

interface State { userName: string; password: string; }

export default class Homescreen extends Component {
  checkTimeOut = () => { if (Date.now() - global.timeStamp > 10000) return true; else return false; }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Image source={require('./StatCanLogo.png')} style={styles.logo} />
        <View style={styles.homeButtonContainer}>
          <View style={styles.homeButtonColumn}>
            <Button title={resources.getString(6)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('CurrentEQ')} />
            <Button title={resources.getString(7)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('LocalNotification')} />
            <Button title={resources.getString(8)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('SurveyResult')} />
          </View>
          <View style={styles.homeSeperator}></View>
          <View style={styles.homeButtonColumn}>
            <Button title={resources.getString(9)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('About')} />
            <Button title={resources.getString(10)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('Term')} />
            <Button title={resources.getString(11)} style={styles.homeButton} onPress={() => this.props.navigation.navigate('ContactUs')} />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  homeContainer: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
  logo: { width: 300, height: 100 },
  homeButtonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' },
  homeButtonColumn: { width: 150, height: 150, justifyContent: 'space-between', alignContent: 'space-between' },
  homeButton: { width: 100 },
  homeSeperator: { width: 20, height: 150 },
});