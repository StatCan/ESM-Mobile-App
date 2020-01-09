// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './components/Homescreen';
import Aboutscreen from './components/Aboutscreen';
import WebScreen from './components/Webscreen';
import WebFromAzureScreen from './components/WebFromAzureScreen';
import LocalNotificationScreen from './components/LocalNotificationScreen';
import LoginScreen from './components/LoginScreen';
import CurrentEQScreen from './components/CurrentEQScreen';
import SplashScreen from './components/SplashScreen';
import TermScreen from './components/TermScreen';
import CreatePasswordScreen from './components/CreatePasswordScreen';
import RecoverPasswordScreen from './components/RecoverPasswordScreen';
import InitialScreen from './components/InitialScreen';
import ContactUsScreen from './components/ContactUsScreen';
import TestScreen from './components/TestScreen';
import SurveyResultScreen from './components/SurveyResultScreen';
import './Resources.js';
import './Globals.js';
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
   Splash:{screen:SplashScreen},
   Initial:{screen:InitialScreen},
   Login:{screen:LoginScreen},
   Term:{screen:TermScreen},
   About:{screen:Aboutscreen},
   CreatePassword:{screen:CreatePasswordScreen},
   RecoverPassword:{screen:RecoverPasswordScreen},
   Home: {screen: Homescreen},
   WebFromAzure: {screen: WebFromAzureScreen},
   LocalNotification:{screen:LocalNotificationScreen},
   CurrentEQ:{screen:CurrentEQScreen},
   ContactUs:{screen:ContactUsScreen},
   Test:{screen:TestScreen},
   SurveyResult:{screen:SurveyResultScreen},
   WebScreen:{screen:WebScreen},
},
{defaultNavigationOptions: {
      header: null
    },}
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
