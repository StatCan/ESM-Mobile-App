// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

class HomeTestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}



export default createBottomTabNavigator(
  {
    HomeTest: HomeTestScreen,
    Settings: SettingsScreen,
  },
  {
    tabBarPosition: 'top',
        swipeEnabled: true,   //Not support
        animationEnabled: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName=focused ? 'ios-radio-button-on' : 'ios-radio-button-off';
        if (routeName === 'HomeTest') {
          iconName = focused
            ? 'ios-radio-button-on'
            : 'ios-radio-button-off';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
         // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = focused ? 'ios-radio-button-on' : 'ios-radio-button-off';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
     // return <TouchableOpacity 	style={styles.circle} />
      },
      swipeEnabled: true,
    }),
    tabBarOptions: {
      showLabel: false,
      indicatorStyle: { backgroundColor: 'transparent',  }
    },
  }
);

const styles = StyleSheet.create({
	fcontainer: { flexDirection: 'row', justifyContent: 'space-around', marginLeft: 40, marginRight: 40, alignItems: 'center' },
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},

	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},
});