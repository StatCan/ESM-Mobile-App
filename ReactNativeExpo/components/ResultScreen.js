//This is an example of React Native Tab
import React from 'react';
import { Image,View,Button,Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import FirstPage from './SurveyResultScreen';
//import CarouselPage from './CarouselScreen';
import SecondPage from './SliderScreen';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';

const TabScreen = createMaterialTopTabNavigator(
  {
    Home: {
        screen: FirstPage,
        navigationOptions: {
                tabBarLabel:"Person",
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="user-o" size={30} color="black" />
                 // <AntDesign name="user" size={25} color="green" />
                ),
                tabBarOnPress:({navigation,defaultHandler})=>{
                alert(navigation)
                }

              },

         },
    Settings: {
         screen: SecondPage,
         navigationOptions: {
                                           tabBarLabel:"Population",
                                           tabBarIcon: ({ tintColor }) => (
                                           //  <Icon name="users" size={30} color="black" />
                                           // <EvilIcons name="gear" size={32} color="green" />
                                           <Feather name="users" size={30} color="black" />
                                           )
                                         } },
  },
  {
  // pagerComponent: ViewPagerAdapter,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        iconStyle: {
                width: 35,
                height:30
            },
            tabStyle: {
                height: 60
            },
        showIcon: true,
       //  activeTintColor: '#e91e63',
         upperCaseLabel:false,
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
     //  header:<View style={{marginTop:30,flexDirection:'row',}}><Text>Person</Text><Text>Popultion</Text></View>,
        header:  <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />,
     // header: null,
    //  headerStyle: {
     //   backgroundColor: '#633689',
     // },
    //  headerTintColor: '#FFFFFF',
    //  title: 'TabExample',
    },
  },
});

export default createAppContainer(App);