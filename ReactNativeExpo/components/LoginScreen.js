// LoginScreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
interface State { userName: string; password: string; }
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('./StatCanLogo.png')} style={{ width: 300, height: 100 }} />
        <TextInput
          style={{ height: 40, borderWidth: 1, width: 200, marginBottom: 5, paddingLeft: 4 }}
          placeholder={resources.getString('password')}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />
        <Button
          title={resources.getString('btn_create')}
          disabled={this.state.password == '' ? true : false}
          onPress={() => {
            if (this.state.password == global.password) { global.timeStamp = Date.now(); console.log(global.timeStamp); this.props.navigation.navigate('Home'); }
            else alert("Wrong password");
          }}
        />
        <Text style={{ margin: 30 }} onPress={() => this.props.navigation.navigate('RecoverPassword')}>Forget Password</Text>
        <Text style={{ margin: 30 }} onPress={() => { AsyncStorage.removeItem('EsmUserToken'); AsyncStorage.removeItem('EsmCulture') }}>Delete DeviceId(Test only)</Text>

      </View>
    )
  }
}