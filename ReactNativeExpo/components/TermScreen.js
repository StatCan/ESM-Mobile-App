// Term.js
import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class Aboutscreen extends Component {
  constructor(props) {
    super(props); console.log(props);
    this.state = { title: resources.getString(15), content: resources.getString(16) };
  };
  render() {
    const userToken = global.userToken;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={require('./StatCanLogo.png')} style={{ width: 300, height: 100 }} />
        <Text style={{ fontSize: 30 }}>{this.state.title}</Text>
        <Text>{this.state.content}</Text>
        <Button
          title="Back"
          onPress={() => userToken == '' ? this.props.navigation.navigate('CreatePassword') : this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}