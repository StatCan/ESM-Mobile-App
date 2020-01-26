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
            <View style={[styles.homeContainer,{marginBottom:10,},{flexDirection:'row',flex:1,justifyContent:'space-around',alignItems:'space-around'}]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Result2')} style={styles.smallButton}><EvilIcons name="chart" size={40} color="black" /><Text style={{fontSize:20}}>Result</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={styles.smallButton}><EvilIcons name="tag" size={40} color="black" /><Text style={{fontSize:20}}>About</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')} style={styles.smallButton}><Feather name="phone" size={40} color="black" /><Text style={{fontSize:20}}>Contact</Text></TouchableOpacity>
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
      backgroundColor:'#66cc99'
    },
  outer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:'lightgray',
      borderRadius:110,
      borderWidth:1,
      width:220,height:220,
      alignSelf:'center',

      shadowColor: "gray",
      shadowOffset:{
      width: 10,
      height: 8,
      },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 16,

     // boxShadow:15px 5px 10px grey;
      backgroundColor:'lightgray'
    },
  smallButton:{width:100,height:100,borderRadius:50, backgroundColor:'lightcyan',justifyContent:'center',alignItems:'center',margin:10}

});