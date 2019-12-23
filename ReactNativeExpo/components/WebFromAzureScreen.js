import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Button,
  Dimensions, Image
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
  componentDidMount() {
    setTimeout(
      () => this.webView.postMessage(global.userToken),
      2000);
    console.log("message sent out");
  }
  render() {
    let jsCode = 'var rn=document.createElement("input");rn.value ="' + global.userToken + '";rn.style.width="300px";document.body.appendChild(rn);';
    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <Image source={require('./StatCanLogo.png')} style={styles.logo} />
        <WebView
          ref={(view) => this.webView = view}
          userAgent={global.userToken}
          style={styles.webview}
          source={{ uri: 'https://webdashboardapp.azurewebsites.net/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          startInLoadingState={true}
          injectedJavaScript={jsCode}
          renderLoading={() => {
            return this.displaySpinner();
          }}
          onMessage={event => {
            if (event.nativeEvent.data == "Hello React Native!")
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
    height: deviceHeight - 40, marginTop: 10
  },
  logo: { width: 300, height: 40 },
});