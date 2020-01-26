// Aboutscreen.js
import React, { Component } from 'react';
import { View, Text, Image,ImageBackground,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const deviceWidth = Dimensions.get('window').width;
export default class Aboutscreen extends Component {
  render() {
    return (
      <ImageBackground resizeMode="repeat" source={require('./background.png')} style={styles.background} resizeMode='stretch'>
       <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />
      <View style={{ flex: 1, alignItems: 'center' }}>

        <Text style={{ fontSize: 30 }}>About the survey</Text>
        <Text>This is a pilot survey conducted by Statistics Canada</Text>

      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  background: {flex: 1, width: deviceWidth,height: null,},
  button:{
      marginRight:40,width:100,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
       backgroundColor:'#66cc99'
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10}
});

     //   <TouchableOpacity
       //           style={styles.button}
         //         onPress={() => this.props.navigation.navigate('Home')}
           //       underlayColor='#fff'>
             //     <Text style={styles.buttonText}>Back</Text>
    //     </TouchableOpacity>