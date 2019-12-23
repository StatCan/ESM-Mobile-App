// ContactUsScreen.js
import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class ConatctUsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./StatCanLogo.png')} style={{ width: 300, height: 100 }} />
        <Text style={{ fontSize: 30 }}>Contact us:</Text>
        <Text>Statistics Canada</Text>
        <Text>Jean Talon Building, 4th floor</Text>
        <Text>170 Tunney's Pasture Driveway</Text>
        <Text>OTTAWA, Ontario </Text>
        <Text>K1A 0T6</Text>
<<<<<<< HEAD
        <Text style={{marginBottom:50}}>Toll-free number: 1-800-263-1136</Text>
         <Button
                  title="Back"
                  onPress={() => this.props.navigation.navigate('Home')}
=======
        <Text>Toll-free number: 1-800-263-1136</Text>
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('Home')}
>>>>>>> 4bd45e39ddb14c3673507ca9c0bf6cd124f85d91
        />
      </View>
    )
  }
}