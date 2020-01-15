//This is an example of React Native Tab
import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirstPage from './TermScreen';
import SecondPage from './LoginScreen';

export default  createMaterialTopTabNavigator(
  {
    Home: { screen: FirstPage },
    Settings: { screen: SecondPage },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
          showLabel: false,
          indicatorStyle: { backgroundColor: 'transparent',  }
        },
  }
);

//making a StackNavigator to export as default


//export default createAppContainer(App);