//InitialScreen.js
import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
export default class InitialScreen extends Component {
 constructor(props) {
    super(props);
    this.state = {culture: ''};
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
        <View style={{
               flex: 1,
               flexDirection: 'row',
               justifyContent: 'space-between',alignContent:'space-between'
             }}>
               <View style={{width: 150, height: 50}}>
                <Button title="English" style={{width:100}} onPress={() =>{resources.culture='en';this.props.navigation.navigate('CreatePassword',{reset:false})} } />
                <Text style={{marginLeft:20}} onPress={()=>{resources.culture='en';this.props.navigation.navigate('Term')}}>Term & conditions</Text>
               </View>
                 <View style={{width: 20, height: 50}}>
                  </View>
               <View style={{width: 150, height: 50}}>
                <Button title="Français" style={{width:100}} onPress={() =>{resources.culture='fr'; this.props.navigation.navigate('CreatePassword',{reset:false})} } />
                 <Text style={{marginLeft:50}} onPress={()=>{resources.culture='fr';this.props.navigation.navigate('Term')}}>Avis</Text>
               </View>
             </View>
       <View>


       </View>

      </View>
    )
  }
}