import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Button,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { WebView,ActivityIndicator } from 'react-native';

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
    return (
<View style={{flex:1, marginTop:16}}>
  <WebView
   style={styles.webview}
   source={{uri: 'https://www68.statcan.gc.ca/ecp-pce/en/load-init/Test_Test/'}}
   javaScriptEnabled={true}
   domStorageEnabled={true}
   startInLoadingState={false}
   scalesPageToFit={true}
   startInLoadingState={true}
   renderLoading={() => {
             return this.displaySpinner();
           }}
    onMessage={event => {
       if(event.nativeEvent.data=="Hello React Native!")
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
    height: deviceHeight-40
  }
});