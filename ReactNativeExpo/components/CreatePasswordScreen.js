//CreatePassword.js
import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image,AsyncStorage,Picker,StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
interface State{userName:string;password:string;}

export default class CreatePasswordScreen extends Component {
    displaySpinner() {
      return (
      <View>
         <ActivityIndicator />
      </View>
    );
  }
    state = { password:'',confirmPassword:'',question:'',answer:''};
    onPressButton=()=>{
    if(this.state.password!=''&&this.state.confirmPassword!=''&&this.state.answer!=''&&this.state.password==this.state.confirmPassword){
         var userToken=Constants.deviceId;
            var culture=resources.culture;console.log(culture);
            AsyncStorage.setItem('EsmUserToken',userToken);
            AsyncStorage.setItem('EsmCulture',culture);
            global.userToken=userToken;
            this.props.navigation.navigate('Home',{userToken:userToken});
    }else{
        alert("You must provide matched password and secrity question and answer !");
    }

  }
    updateQuestion = (question) => {

      this.setState({ question:question})
   }
    render() {
      return (
      <View style={styles.container}>
        <Text style={{fontSize:30}}>{resources.getString(0)}</Text>
        <TextInput
                          style={styles.input}
                          placeholder={resources.getString(1)}
                          onChangeText={(text) => this.setState({password:text})}
                          value={this.state.password}
                          secureTextEntry
                        />
        <TextInput
                          style={styles.input}
                          placeholder={resources.getString(2)}
                          onChangeText={(text) => this.setState({confirmPassword:text})}
                          value={this.state.confirmPassword}
                          secureTextEntry
                        />
        <Picker selectedValue = {this.state.question} onValueChange = {this.updateQuestion}>
            <Picker.Item label = "What is the name of your pet ?" value = "Question1" />
            <Picker.Item label = "Whar is you favourite sport ?" value = "Question2" />
            <Picker.Item label = "Where you born ?" value = "Question3" />
        </Picker>
        <TextInput
                                  style={styles.input}
                                  placeholder={resources.getString(3)}
                                  onChangeText={(text) => this.setState({answer:text})}
                                  value={this.state.answer}
                                />
           <Button
                     title={resources.getString(4)}
                     onPress={this.onPressButton}
           />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',padding:10
  },
  input:{height: 40,borderWidth:1,marginBottom:4,padding:4,borderColor:'lightgray'}
});