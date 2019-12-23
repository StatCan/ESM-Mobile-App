import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Platform, Switch } from "react-native";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import RadioButton from './RadioButton'
const options = [
  {
    key: 2,
    text: '2',
  },
  {
    key: 3,
    text: '3',
  },
  {
    key: 4,
    text: '4',
  },
  {
    key: 5,
    text: '5',
  },
];
export default class LocalNotificationScreen extends React.Component {
  state = { notification: true, waketime: '8:00', sleeptime: '21:00', notificationcount: 2, culture: 'English' };
  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: "Immediate Notification",
      body: "Immediate Notification--sound",
      sound: true
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };

  scheduleNotification = async () => {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
        vibrate: true,
      });
    }
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "Scheduled Notification",
        body: "Scheduled Notification Test--min--sound",
        ios: { sound: true },
        android: {
          "channelId": "chat-messages"
        }
      },
      {
        repeat: "minute",
        time: new Date().getTime() + 10000
      }
    );
    console.log(notificationId);
  };
  scheduleNotification20s = async () => {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
        vibrate: true,
      });
    }
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "Scheduled Notification",
        body: "Scheduled Notification 20s",
        ios: { sound: true },
        android: {
          "channelId": "chat-messages"
        }
      },
      {
        time: new Date().getTime() + 20000
      }
    );
    console.log(notificationId);
  };
  handleSwitchChnaged = (v) => {
    this.setState({ notification: v });
  };
  updateRadioButtonState (data) {
          console.log(data);
          this.setState({notificationcount:data.key});
      };
   saveSettings=async()=>{
        console.log(this.state.notificationcount);
        this.props.navigation.navigate('Home');
   }
  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Settings:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text>Notification:</Text>
          <Switch value={this.state.notification} onValueChange={this.handleSwitchChnaged} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text>WakeTime:</Text>
          <TextInput value={this.state.waketime} editable={this.state.notification} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text>SleepTime:</Text>
          <TextInput value={this.state.sleeptime} editable={this.state.notification} />
        </View>
        <Text style={{ marginLeft: 40 }}>Notification times per day:</Text>
        <RadioButton options={options} preset={this.state.notificationcount} updateParentState={this.updateRadioButtonState.bind(this)} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Button title="Save" style={{ width: 100 }} onPress={this.saveSettings} />
          <Button title="Cancel" style={{ width: 100 }} onPress={() => this.props.navigation.navigate('Home')} />
        </View>
        <View>
          <Text style={{ color: 'red' }}>Following buttons are test only</Text>
          <Button title="Please accept Notifications Permissions" onPress={() => this.askPermissions()} />
          <Button title="Send Notification immediately" onPress={() => this.sendNotificationImmediately()} />
          <Button title="Dismiss All Notifications" onPress={() => Notifications.dismissAllNotificationsAsync()} />
          <Button title={"Schedule Notification"} onPress={() => this.scheduleNotification()} />
          <Button title="Schedule 20s Notification" onPress={() => this.scheduleNotification20s()} />
          <Button title="Cancel Scheduled Notifications" onPress={() => Notifications.cancelAllScheduledNotificationsAsync()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input:{borderWidth:1,width:100,paddingLeft:4},
  label:{color:'black', fontWeight:'900', fontSize: 14, padding:10}
});