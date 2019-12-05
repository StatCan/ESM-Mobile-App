// Term.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class Aboutscreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30}}>Term and condition</Text>
        <Text>This is term and condition</Text>
         <Button
                  title="Back"
                  onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}