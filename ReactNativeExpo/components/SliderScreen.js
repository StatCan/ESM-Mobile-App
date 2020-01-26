import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Linking, NativeEventEmitter, Animated,InteractionManager,Dimensions } from 'react-native';

const height=Dimensions.get('window').height-100;
const images = [
  {
    key: 1,
    name: "Name1",
    uri: {uri:'https://webdashboardapp.azurewebsites.net/Home/GetActivityCountImage'},
  },
  {
    key: 2,
    name: "Name2",
    uri: {uri: 'https://webdashboardapp.azurewebsites.net/Home/GetMoodCountImage'},
  },
  {
    key: 3,
    name: "Name3",
    uri: {uri:  'https://webdashboardapp.azurewebsites.net/Home/GetMoodWeeklyImage'},
  },
  {
    key: 4,
    name: "Name4",
    uri: {uri: 'https://webdashboardapp.azurewebsites.net/Home/GetMacaroniImage' },
  },
  {
    key: 5,
    name: "Name5",
    uri: {uri: 'https://webdashboardapp.azurewebsites.net/Home/GetThermometersWithBulletinImage'},
  },
  {
    key: 6,
    name: "Name6",
    uri: {uri: 'https://webdashboardapp.azurewebsites.net/Home/GetScalableBarImage' },
  },
];

class Store extends Component {
  sv = null;

  log(arg) {
    console.log(arg.nativeEvent.target);
  }
  handleScroll(event){
    let height1=500;
    let y=event.nativeEvent.contentOffset.y;
    let yd=Math.round(y/height)*height;
    
    InteractionManager.runAfterInteractions(()=>this.sv.scrollTo({y:yd}))
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
       <Text style={{ fontSize: 30, marginBottom: 20 }}>Population Result:</Text>
        <ScrollView ref={ref => {this.sv = ref;}} contentContainerStyle={{ paddingVertical: 20,justifyContent:'center', }} onTouchStart={this.log} onScrollEndDrag={this.handleScroll.bind(this)}>
          {images.map(({ name, uri, url, key }) => (
            <ScrollView key={key} style={{height:height,padding:10}}>
              <Image source={uri} style={{ aspectRatio: 1,resizeMode:'stretch'}}/>            
            </ScrollView>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Store;
