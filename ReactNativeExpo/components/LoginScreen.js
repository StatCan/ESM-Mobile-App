// LoginScreen.js
import React, { Component } from 'react';
import { Button, View, Text,TextInput, Image, AsyncStorage,ImageBackground,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
//import { TextInput } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
interface State { userName: string; password: string; }
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
  }
  render() {
    return (
 <ImageBackground resizeMode="repeat" source={require('./background.png')} style={styles.background} resizeMode='stretch'>
  <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 40, borderWidth: 1, width: 200, marginBottom: 5, paddingLeft: 4 }}
          placeholder={resources.getString('password')}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />

 <View style={{ width: 200}}>
        <Button
          title={resources.getString('login')} color='#66cc99'
          disabled={this.state.password == '' ? true : false}
          onPress={() => {
            if (this.state.password == global.password) { global.timeStamp = Date.now(); console.log(global.timeStamp); this.props.navigation.navigate('Home'); }
            else alert("Wrong password");
          }}
        /></View>
        <Text style={{ margin: 30 }} onPress={() => this.props.navigation.navigate('RecoverPassword')}>Forget Password</Text>
        <Text style={{ margin: 30 }} onPress={() => { AsyncStorage.removeItem('EsmUserToken');AsyncStorage.setItem('EsmSurveyACode','none'); AsyncStorage.removeItem('EsmCulture') }}>Delete DeviceId(Test only)</Text>

      </View>
  </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1, width: deviceWidth,height: null,
  },
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


       // <TouchableOpacity   disabled={this.state.password == '' ? true : false}
     //          style={styles.button}
   //                 onPress={() => {
         //                      if (this.state.password == global.password) { global.timeStamp = Date.now(); console.log(global.timeStamp); this.props.navigation.navigate('Home'); }
           //                    else alert("Wrong password");}}
             //         underlayColor='#fff'>
               //         <Text style={styles.buttonText}>{resources.getString('login')}</Text>
   //          </TouchableOpacity>