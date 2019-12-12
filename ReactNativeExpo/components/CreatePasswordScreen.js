//CreatePassword.js
import React, { Component } from 'react';
import { Button, View, Text,TextInput,Image,AsyncStorage,Picker,StyleSheet,ActivityIndicator } from 'react-native';
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
    state = { password:'',confirmPassword:'',question:'',answer:'',isLoading: true,questions:''};
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
    componentDidMount(){
        let url='https://webdashboardapp.azurewebsites.net/Home/GetSecurityQuestions?culture=en';
        if(resources.culture!='en')url='https://webdashboardapp.azurewebsites.net/Home/GetSecurityQuestions?culture=fr';
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
            this.setState({
              isLoading: false,
              questions: responseJson,
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
      }
    render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
      let questionIems = this.state.questions.map( (s, i) => {
                  return <Picker.Item style={{marginLeft:60}} key={i} value={s} label={s} />
              });
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
            {questionIems}
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
  input:{height: 40,borderWidth:1,marginBottom:4,padding:4,borderColor:'lightgray'},
   pickerView:{
      marginLeft:40,
    },
});