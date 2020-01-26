// ContactUsScreen.js
import React, { Component } from 'react';
import { Button, View, Text, Image,ImageBackground,StyleSheet,Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const deviceWidth = Dimensions.get('window').width;
export default class ConatctUsScreen extends Component {
  render() {
    return (
        <ImageBackground resizeMode="repeat" source={require('./background.png')} style={styles.background} resizeMode='stretch'>
           <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Contact us:</Text>
        <Text>Statistics Canada</Text>
        <Text>Jean Talon Building, 4th floor</Text>
        <Text>170 Tunney's Pasture Driveway</Text>
        <Text>OTTAWA, Ontario </Text>
        <Text>K1A 0T6</Text>
        <Text>Toll-free number: 1-800-263-1136</Text>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  background: {flex: 1, width: deviceWidth,height: null,},
});
 //<Button
   //       title="Back"
     //     onPress={() => this.props.navigation.navigate('Home')}
       // />