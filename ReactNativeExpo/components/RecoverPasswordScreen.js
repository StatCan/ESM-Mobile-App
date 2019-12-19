//RecoverPassword.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
interface State { userName: string; password: string; }
export default class RecoverPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { question: global.question, answer: '' };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>Recover Password</Text>
        <Text style={{ fontSize: 16 }}>{this.state.question}</Text>
        <TextInput
          style={{ height: 40, fontSize: 16, borderWidth: 1, width: 200, marginBottom: 5, paddingLeft: 4 }}
          placeholder="write your answer here:"
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
        />
        <Text style={{ margin: 30 }} onPress={() => this.props.navigation.navigate('CreatePassword', { reset: false })}>Forget my answer</Text>
        <Button
          title="Reset" disabled={this.state.answer == global.answer ? false : true}
          onPress={() => this.props.navigation.navigate('CreatePassword', { reset: true })}
        />
      </View>
    )
  }
}