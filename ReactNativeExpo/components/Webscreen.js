// WebScreen.js
import React, { Component } from 'react';
import {Dimensions,Image,StyleSheet,View} from 'react-native';
import { WebView} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type Props = {};
export default class WebScreen extends Component<Props> {
    state={dataUrl:'',height:400};
  render() {
      let jsCode='var c=document.createElement("canvas"); c.width = 200; c.height=200;var ctx=c.getContext("2d");ctx.beginPath();ctx.arc(100, 100, 50, 0, 2 * Math.PI);ctx.stroke();var dataURL = c.toDataURL();document.getElementById("test").src = dataURL;';

       return (
       //  <View style={{flex:1, marginTop:16,height: this.state.height}}>
         //          <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
           //             <Image source={{ uri:'http://localhost:49159/Thermometers/aaa/en'}} style={{width:400,height:350,resizeMode: 'stretch'  }} />
             //           <Image source={{ uri:'http://localhost:49159/Bulletin/aaa/fr'}} style={{width:400,height:350,resizeMode: 'stretch'  }} />
               //         <Image source={{ uri:'http://localhost:49159/ScalableBar/aaa/en'}} style={{width:400,height:350,resizeMode: 'stretch'  }} />
                 //       <Image source={{ uri:'http://localhost:49159/ScalableLine/aaa/en'}} style={{width:400,height:350,resizeMode: 'stretch'  }} />

                   // </ScrollView>
        //             <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          //          <Image source={{ uri:'http://localhost:49159/Table/aaa/en'}} style={{width:400,height:140 ,resizeMode: 'stretch' }} />
            //        </ScrollView>
     //  </View>


            <View style={{flex:1, marginTop:16,height: this.state.height}}>
                <Image style={styles.logo} ref={(view) => this.imgView = view} />
                <Image
                          style={{width: 66, height: 58}}
                           />
                <WebView style={{height: this.state.height}}
                ref={(view) => this.webView = view}
                source={{html:'<html><body><img id="test" /><select style="width:100px;" class="needsclick" onclick="selectChanged()"><option value="1">one</option><option value="2">two</option><option value="3">three</option></select><script>function selectChanged() {window.postMessage("SelectChanged");} </script></body></html>'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        startInLoadingState={true}
        injectedJavaScript={jsCode}

        onMessage={event => {
            console.log(event.nativeEvent.data);
            if (event.nativeEvent.data == "SelectChanged"){
                    setInterval(() => {
                        let newHeight = this.state.height == 400 ? 390 :400
                        this.setState({
                            height: newHeight
                        })
                    }, 100)

            console.log(this.state.height);
            }
          //  this.setState({dataUrl:'data:image/png;base64,'+event.nativeEvent.data});
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