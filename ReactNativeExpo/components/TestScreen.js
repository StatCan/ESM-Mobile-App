import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image,AsyncStorage,Picker } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

export default class TestScreen extends Component {
  render() {
      return (
          <View style={{ justifyContent: 'center' }}>
            <Text>Test only</Text>

         </View>

      )

   }

}