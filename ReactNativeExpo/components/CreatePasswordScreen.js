//CreatePassword.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Image, AsyncStorage, Picker, StyleSheet, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

interface State { userName: string; password: string; }

export default class CreatePasswordScreen extends Component {
  displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  state = { password: '', confirmPassword: '', question: '???', answer: '', isLoading: true, questions: '' };

  onPressButton = () => {
    if (this.state.password != '' && this.state.confirmPassword != '' && this.state.answer != '' && this.state.password == this.state.confirmPassword && this.state.qusetion != '???') {
      var userToken = Constants.deviceId;
      var culture = resources.culture; console.log(culture);
      AsyncStorage.setItem('EsmUserToken', userToken);
      AsyncStorage.setItem('EsmCulture', culture);
      AsyncStorage.setItem('EsmPassword', this.state.password);
      AsyncStorage.setItem('EsmQuestion', this.state.question);
      AsyncStorage.setItem('EsmAnswer', this.state.answer);
      global.userToken = userToken;
      global.timeStamp = Date.now(); console.log(global.timeStamp);
      this.props.navigation.navigate('Home', { userToken: userToken });
    } else {
      alert("You must provide matched password and secrity question and answer !");
    }

  }

  updateQuestion = (question) => { this.setState({ question: question }) }

  componentDidMount() {
   // let url = 'https://webdashboardapp.azurewebsites.net/Home/GetSecurityQuestions?culture=en';
 let url= 'http://localhost:49159/Home/GetSecurityQuestions?culture=en';
    if (resources.culture != 'en') url = 'https://webdashboardapp.azurewebsites.net/Home/GetSecurityQuestions?culture=fr';

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson); console.log(responseJson[0]);
        this.setState({
          isLoading: false,
          questions: responseJson,
          question: responseJson[0]
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    let questionIems = this.state.questions.map((s, i) => { return <Picker.Item style={{ fontSize: 20 }} key={i} value={s} label={s} /> });
    return (
      <View style={styles.container}>
       <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
        <Text style={styles.label}>{resources.getString('create_password')}</Text>
        <TextInput
          style={styles.input}
          placeholder={resources.getString('password')}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder={resources.getString('confirm_password')}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          value={this.state.confirmPassword}
          secureTextEntry
        />
        {
          !this.props.navigation.state.params.reset ?
            <View>
              <Picker selectedValue={this.state.question} onValueChange={this.updateQuestion} style={styles.zoomedPicker}>
                {questionIems}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder={resources.getString('the_answer_is')}
                onChangeText={(text) => this.setState({ answer: text })}
                value={this.state.answer}
              />
            </View>
            :
            <View>
            </View>}
        <Button
          title={resources.getString('btn_create')}
          onPress={this.onPressButton} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', padding: 10
  },
  label: { fontSize: 30 },
  input: { height: 40, borderWidth: 1, marginBottom: 4, padding: 4, borderColor: 'lightgray' },
  pickerView: {
    marginLeft: 40,
  },
  pickerItem: { marginLeft: 60, },
  zoomedPicker: {}
});