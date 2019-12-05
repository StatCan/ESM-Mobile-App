//RecoverPassword.js
import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
interface State{userName:string;password:string;}
export default class RecoverPasswordScreen extends Component {
  state = {question:'What is the name of your first pet ?',answer:''};
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30}}>Recover Password</Text>
        <TextInput
                          style={{height: 40}}
                          value={this.state.question}
                        />
        <TextInput
                          style={{height: 40,fontSize:16,borderWidth:1,width:200, marginBottom:5,paddingLeft:4}}
                          placeholder="write your answer here:"
                          onChangeText={(text) => this.setState({answer:text})}
                          value={this.state.answer}
                        />
           <Text style={{fontSize:16}} disabled={this.state.answer==''?true:false}>Display Password</Text>
           <Button
                                title="Back"
                                onPress={() => this.props.navigation.navigate('Login')}
                      />
      </View>
    )
  }
}