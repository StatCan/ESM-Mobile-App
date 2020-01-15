// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import React, { Component } from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Constants } from 'expo'
class TabScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>{this.props.title}</Text></View>
    );
  }
}

class TopTab1 extends Component {
  render () {
    return (<TabScreen title="Top tab1" />);
  }
}

class TopTab2 extends Component {
  render () {
    return (<TabScreen title="Top tab2" />);
  }
}

const TopTabs = createMaterialTopTabNavigator(
  {
    'TopTab1': TopTab1,
    'TopTab2': TopTab2,
  },
  {
    initialRouteName: 'TopTab2',
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        paddingTop: 20,
      }
     }
  }
);

class BottomTab2 extends Component {
  render () {
    return (<TabScreen title="Top tab2" />);
  }
}

const BottomTabs = createBottomTabNavigator(
  {
    'BottomTab1': TopTabs,
    'BottomTab2': BottomTab2,
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
  }
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});