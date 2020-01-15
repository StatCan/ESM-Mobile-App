// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';

interface State { userName: string; password: string; }
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class Homescreen extends Component {
  checkTimeOut = () => { if (Date.now() - global.timeStamp > 10000) return true; else return false; }
  render() {
    return (
    <ImageBackground resizeMode="repeat" source={require('./background.png')} style={styles.background} resizeMode='stretch'>
      <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />
       <TouchableOpacity onPress={() => this.props.navigation.navigate('LocalNotification')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>

      <View style={styles.homeContainer}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('CurrentEQ')} style={{flex:2,justifyContent:'center'}}>
               <View style={styles.outer}>
                   <View style={styles.inner}>
                        <Feather name="check-square" size={100} color="blue" /><Text style={{fontSize:50}}>Start</Text>
                   </View>
               </View>
            </TouchableOpacity>
            <View style={[styles.homeContainer,{marginBottom:10,},{flexDirection:'row',flex:1}]}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Result')} style={{marginLeft:20,marginRight:20}}><EvilIcons name="chart" size={40} color="black" /><Text style={{fontSize:20}}>Result</Text></TouchableOpacity>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={{marginLeft:20,marginRight:20}}><EvilIcons name="tag" size={40} color="black" /><Text style={{fontSize:20}}>About</Text></TouchableOpacity>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Term')} style={{marginLeft:20,marginRight:20}}><EvilIcons name="bell" size={40} color="black" /><Text style={{fontSize:20}}>Term</Text></TouchableOpacity>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')} style={{marginLeft:20,marginRight:20}}><Feather name="phone" size={40} color="black" /><Text style={{fontSize:20}}>Contact</Text></TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  background: {flex: 1, width: deviceWidth,height: null,},
  homeContainer: { flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop:40 },
  logo: { width: 300, height: 100 },
  homeButtonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' },
  homeButtonColumn: { width: 150, height: 150, justifyContent: 'space-between', alignContent: 'space-between' },
  homeButton: { width: 100 },
  homeSeperator: { width: 20, height: 150 },
  inner: {
      alignItems: 'center',
      justifyContent: 'center',

      borderRadius:95,

      width:190,height:190,
      alignSelf:'center',
      backgroundColor:'cyan'
    },
   outer: {
      alignItems: 'center',
      justifyContent: 'center',

      borderRadius:100,
      borderWidth:2,
      width:200,height:200,
      alignSelf:'center',
      backgroundColor:'gray'
    },

});