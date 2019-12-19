// Term.js
import React, { Component } from 'react';
import { Button, View, Text,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class Termscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {title:resources.getString(15),content:resources.getString(16)};
      };
  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center',justifyContent:'center'}}>
       <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
        <Text style={{fontSize:30,marginLeft:20}}>{this.state.title}</Text>
        <Text style={{marginBottom:50}}>{this.state.content}</Text>
         <Button
                  title="Back"
                  onPress={() =>userToken==''?this.props.navigation.navigate('CreatePassword',{reset:false}):this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}