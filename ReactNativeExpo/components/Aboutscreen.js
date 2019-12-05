// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class Aboutscreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text style={{fontSize:30}}>Contact us:</Text>
        <Text>Statistics Canada</Text>
        <Text>Jean Talon Building, 4th floor</Text>
        <Text>170 Tunney's Pasture Driveway</Text>
        <Text>OTTAWA, Ontario </Text>
        <Text>K1A 0T6</Text>
        <Text>Toll-free number: 1-800-263-1136</Text>
         <Button
                  title="Back"
                  onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}