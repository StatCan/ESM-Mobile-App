// WebScreen.js
import React, { Component } from 'react';
import {Dimensions,Image,StyleSheet,View} from 'react-native';
import { WebView} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {};
export default class WebScreen extends Component<Props> {
    state={dataUrl:''};
  render() {
      let jsCode='var c=document.createElement("canvas"); c.width = 200; c.height=200;var ctx=c.getContext("2d");ctx.beginPath();ctx.arc(100, 100, 50, 0, 2 * Math.PI);ctx.stroke();var dataURL = c.toDataURL();document.getElementById("test").src = dataURL;';

       return (
            <View style={{flex:1, marginTop:16}}>
                <Image style={styles.logo} ref={(view) => this.imgView = view} />
                <Image
                          style={{width: 66, height: 58}}
                           />
                <WebView  ref={(view) => this.webView = view}
                source={{html:'<html><body><img id="test" /></body></html>'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        startInLoadingState={true}
        injectedJavaScript={jsCode}

        onMessage={event => {
            this.setState({dataUrl:'data:image/png;base64,'+event.nativeEvent.data});
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
    height: deviceHeight-40,marginTop:10
  },
   logo:{width: 300,height:40},
});