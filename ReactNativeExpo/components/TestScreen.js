import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Button,
  Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { WebView, ActivityIndicator, TextInput } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class TestScreen extends Component {
  state = { showPopup: true, password: '' }
  displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  popup() {
    if (this.state.showPopup) {
      return (
        <View style={styles.overlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Validation</Text>
            <TextInput placeholder={'Input your passwrod to varify it is still you'} style={styles.popupPassword} secureTextEntry />
            <View style={styles.popupButtonContainer}>
              <Button title={'OK'} style={styles.popupButton} /><Button title={'Cancel'} style={styles.popupButton} />
            </View>
          </View>
        </View>);
    }
    else {
      return <View />;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 16 }}>
        <WebView
          ref={(view) => this.webView = view}
          style={styles.webview}
          source={{ uri: 'https://www68.statcan.gc.ca/ecp-pce/en/load-init/Test_Test/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          startInLoadingState={true}
          renderLoading={() => { return this.displaySpinner(); }}
          onNavigationStateChange={(navState) => {
            if (navState.url == "") { // You must validate url to enter or navigate
              this.webView.stopLoading();
            }
          }}
          onMessage={event => {
            if (event.nativeEvent.data == "Hello React Native!")
              this.props.navigation.navigate('Home')

          }}

        />
        {this.popup()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'white', opacity: 0.8, alignItems: 'center', justifyContent: 'center' },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight - 40
  },
  popupContent: { backgroundColor: 'darkgray', width: 200, height: 150, borderColor: 'black', borderWidth: 1 },
  popupTitle: { fontSize: 20 },
  popupPassword: { height: 40, fontSize: 16, borderWidth: 1, width: 200, marginBottom: 5, paddingLeft: 4, borderColor: 'black' },
  popupButtonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', height: 14 },
  popupButton: { height: 14 }
});