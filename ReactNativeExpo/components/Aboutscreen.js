// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class Aboutscreen extends Component {
  render() {
    return (
<<<<<<< HEAD
      <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
         <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
         <Text style={{fontSize:30}}>About the survey</Text>
         <Text>This is a pilot survey conducted by Statistics Canada</Text>
         <Text style={{height:50}}></Text>
         <Button title="Back" onPress={() => this.props.navigation.navigate('Home')} />
=======
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={require('./StatCanLogo.png')} style={{ width: 300, height: 100 }} />
        <Text style={{ fontSize: 30 }}>About the survey</Text>
        <Text>This is a pilot survey conducted by Statistics Canada</Text>
        <Button title="Back" onPress={() => this.props.navigation.navigate('Home')} />
>>>>>>> 4bd45e39ddb14c3673507ca9c0bf6cd124f85d91
      </View>
    )
  }
}