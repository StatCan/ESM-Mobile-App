// SplashScreen.js
import React, { Component } from 'react';
import {View, Text,ActivityIndicator,Image,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
export default class SplashScreen extends Component {
 constructor(props) {
    super(props);
    this.bootstrap();
  }
  bootstrap=async()=>{
       const userToken=await AsyncStorage.getItem('EsmUserToken');
       const culture=await AsyncStorage.getItem('EsmCulture');
       console.log(culture);
       resources.culture=culture;
       if(userToken==null)
            this.props.navigation.navigate('Initial');
       else
            this.props.navigation.navigate('Login',{userToken:userToken});
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
       <ActivityIndicator />
      </View>
    )
  }
}