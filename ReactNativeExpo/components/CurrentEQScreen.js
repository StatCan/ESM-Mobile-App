import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Image,
  View, Button,ScrollView,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { WebView, ActivityIndicator } from 'react-native';
//import FixWebView from './FixWebView'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {};
export default class App extends Component<Props> {
  displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  state={jsCode:''};
  render() {
    const dt=new Date();console.log(dt.toISOString());console.log(global.surveyACode);console.log(global.userToken);
    const uri=global.surveyACode==''?'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsab4602447bbc45ad8e85328d21f6c1b4':'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs0a8c12086319496aadc23bacf80cba8b';
    const uri1='https://webdashboardapp.azurewebsites.net/Home/ConductSurvey?userToken='+global.userToken+'&notificationId='+dt.toISOString()+'&culture='+resources.culture;
    const uri2='http://localhost:56761/Home/ConductSurvey?userToken='+global.userToken+'&notificationId='+dt.toISOString()+'&culture='+resources.culture;
    console.log(uri);
     let jsCode='';
    return (

      <View style={{ flex: 1, marginTop: 16 }}>
       <Image source={require('./StatCanLogo.png')} style={styles.logo} />
       <ScrollView>
            <WebView
                      ref={(view) => this.webView = view}
                      style={styles.webview}
                      userAgent={global.userToken}
                    //  source={{ uri: 'https://www68.statcan.gc.ca/ecp-pce/en/load-init/Test_Test/' }}
                      source={{uri:uri2}}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      startInLoadingState={false}
                      scalesPageToFit={true}
                      startInLoadingState={true}
                      injectedJavaScript={this.state.jsCode}
                      renderLoading={() => {
                        return this.displaySpinner();
                      }}
                      onNavigationStateChange={(navState) => {
                        if (navState.url == "") { // You must validate url to enter or navigate
                          this.webView.stopLoading();
                        }
                        if(navState.url=="http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/operations/submitconfirmation-confirmationsoumission"){
                            let jsCode=' var button = document.createElement("button");button.innerHTML = "Back"; button.className += "btn"; button.className += " btn-primary";button.onclick = function () {var sac = document.querySelector("div.sc-box-main p span.ecf-bold").innerText;window.postMessage(sac); return false;};document.body.appendChild(button);';
                            this.setState({jsCode:jsCode});
                          //  this.props.navigation.navigate('Home');
                        }
                      }}
                      onMessage={event => {
                    //    if (event.nativeEvent.data == "Hello React Native!")
                          if(global.surveyACode=='none'){
                            console.log(event.nativeEvent.data);
                            AsyncStorage.setItem('EsmSurveyACode', event.nativeEvent.data);
                            global.surveyACode = event.nativeEvent.data;global.doneSurveyA=true;
                           // this.forceUpdate();
                            this.props.navigation.navigate('Home');
                          }
                          else
                            this.props.navigation.navigate('Home');
                      }}

                    />
       </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight - 40
  },
  logo: { width: 300, height: 40 },
});