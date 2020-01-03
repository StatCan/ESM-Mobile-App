import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Button,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { WebView, ActivityIndicator } from 'react-native';

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
  render() {
    const uri=global.surveyACode==''?'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsab4602447bbc45ad8e85328d21f6c1b4':'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs0a8c12086319496aadc23bacf80cba8b';

    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <WebView
          ref={(view) => this.webView = view}
          style={styles.webview}
        //  source={{ uri: 'https://www68.statcan.gc.ca/ecp-pce/en/load-init/Test_Test/' }}
          source={{uri:uri}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          startInLoadingState={true}
          renderLoading={() => {
            return this.displaySpinner();
          }}
          onNavigationStateChange={(navState) => {
            if (navState.url == "") { // You must validate url to enter or navigate
              this.webView.stopLoading();
            }
          }}
          onMessage={event => {
        //    if (event.nativeEvent.data == "Hello React Native!")
              console.log(event.nativeEvent.data);
              if(!global.doneSurveyA){
                AsyncStorage.setItem('EsmSurveyACode', event.nativeEvent.data);
                global.surveyACode = event.nativeEvent.data;
                this.forceUpdate();
              }
              else
                this.props.navigation.navigate('Home')
          }}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight - 40
  }
});