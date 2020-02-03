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
  sendParaData(){
         console.log("asdfgasdfasdfasdfasd");
        let paraData = {
                        "PlatFormVersion": "1.2",
                        "DeviceName": "Andoird",
                        "NativeAppVersion": "2.2",
                        "NativeBuildVersion": "3.2",
                        "DeviceYearClass": "4.2",
                        "SessionID": "5.2",
                        "WakeTime": "07:12",
                        "SleepTime": "21.2",
                        "NotificationCount": "2",
                        "NotificationEnable":true,
                        "ScheduledNotificationTimes": snt
                    };
this.props.navigation.navigate('ContactUs');
  }
  render() {
    return (
    <ImageBackground resizeMode="repeat" source={require('./background.png')} style={styles.background} resizeMode='stretch'>
      <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />
       <TouchableOpacity onPress={() => this.props.navigation.navigate('LocalNotification')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>

      <View style={styles.homeContainer}>
           <TouchableOpacity onPress={() =>{global.needReload1=true;global.needReload2=true;global.needReload3=true;global.needReload4=true;global.needReload5=true;global.needReload6=true;globa7.needReload1=true;  this.props.navigation.navigate('CurrentEQ');} } style={{flex:2,justifyContent:'center'}}>
               <View style={styles.outer}>
                   <View style={styles.inner}>
                        <Feather name="check-square" size={100} color="blue" /><Text style={{fontSize:50}}>Start</Text>
                   </View>
               </View>
            </TouchableOpacity>
            <View style={[styles.homeContainer,{marginBottom:10,},{flexDirection:'row',flex:1,justifyContent:'space-around',alignItems:'space-around'}]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Result2')} style={styles.smallButton}><EvilIcons name="chart" size={40} color="black" /><Text style={{fontSize:20}}>Result</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('About')} style={styles.smallButton}><EvilIcons name="tag" size={40} color="black" /><Text style={{fontSize:20}}>About</Text></TouchableOpacity>
               <TouchableOpacity onPress={() =>this.props.navigation.navigate('ContactUs')} style={styles.smallButton}><Feather name="phone" size={40} color="black" /><Text style={{fontSize:20}}>Contact</Text></TouchableOpacity>
            </View>
        </View>
         <TouchableOpacity onPress={() =>{
         console.log("asdfgasdfasdfasdfasd");
         var snt = ["2020/02/01 08:10:00", "2020/02/01 12:10:00", "2020/02/01 18:10:00"];
         let paraData = {
                                 "PlatFormVersion": "1.2",
                                 "DeviceName": "Andoird",
                                 "NativeAppVersion": "2.2",
                                 "NativeBuildVersion": "3.2",
                                 "DeviceYearClass": "4.2",
                                 "SessionID": "5.2",
                                 "WakeTime": "07:12",
                                 "SleepTime": "21.2",
                                 "NotificationCount": "2",
                                 "NotificationEnable":true,
                                 "ScheduledNotificationTimes": snt
                             };
              fetch('http://localhost:49159/SaveParaData/aaa', {
                  method: 'POST',
                                 headers: {
                                   Accept: 'application/json',
                                   'Content-Type': 'application/json',
                                 },
                                 body:JSON.stringify(paraData),

                  }).then((response) => {
                         return response.json();
                       })
                       .then((myJson) => {
                         console.log(myJson);
                       }).catch((error)=>{
                         console.log(error.message);
                      });

         }
          }




         style={styles.smallButton}><Text style={{fontSize:20}}>Test</Text></TouchableOpacity>
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