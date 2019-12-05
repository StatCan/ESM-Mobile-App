import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image,AsyncStorage,Picker } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

export default class TestScreen extends Component {

   state = { password:'',confirmPassword:'',question:'',answer:''};
    onPressButton=()=>{
    var userToken=Constants.deviceId;
    AsyncStorage.setItem('EsmUserToken',userToken);
    this.props.navigation.navigate('Home',{userToken:userToken});
  }
   updateQuestion = (question) => {

      this.setState({ question:question})

   }

  render() {

      return (

          <View style={{ justifyContent: 'center' }}>

            <Picker selectedValue = {this.state.question} onValueChange = {this.updateQuestion}>

               <Picker.Item label = "What is the name of your pet ?" value = "Question1" />

               <Picker.Item label = "Whar is you favourite sport ?" value = "Question2" />

               <Picker.Item label = "Where you born ?" value = "Question3" />

            </Picker>

         </View>

      )

   }

}