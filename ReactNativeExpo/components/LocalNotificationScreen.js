import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Platform, Switch,Image,Picker } from "react-native";
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

var scheduledDateArray = new Array();

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

  // Unit Test the Scheduling Algorithm
  // To be moved to a Helper class on wellBeingCheck repo
  // awakeHour: Default is 6h or 6am
  // sleepHour: Default is 22h or 10pm
  
  scheduleNotificationAlgo = (awakeHour = 6, sleepHour = 22) => {

    awakeHour = parseInt(awakeHour.substring(0, 2));
    sleepHour = parseInt(sleepHour.substring(0, 2));

    console.log("Awake Hour is: " + awakeHour);
    console.log("Sleep Hour is: " + sleepHour);

    // Clear existing notifications
    Notifications.cancelAllScheduledNotificationsAsync()

    numPings = this.state.notificationcount;

    // Based on defaults awakeInterval is 16
    awakeInterval = sleepHour - awakeHour;

    if (numPings > 5 || numPings < 2) console.log("numPings has an invalid value")

    // Safety Check
    if (numPings > awakeInterval) numPings = awakeInterval;

    if (awakeHour > sleepHour) awakeInterval = awakeHour + 24;

    // Now come up with a time to set notifications to

    var awakeOneHourTimeIntervalsBefore = [];
    var awakeOneHourTimeIntervalsAfter = [];

    for (i = 0; i <= awakeInterval; i++) {
      awakeOneHourTimeIntervalsBefore[i] = awakeHour + (i - 1);
      awakeOneHourTimeIntervalsAfter[i] = awakeHour + i;
    }

    // For testing purposes print to console
    console.log("One Hour Time Intervals i.e. 6h to 7h");
    console.log(awakeOneHourTimeIntervalsBefore);
    console.log(awakeOneHourTimeIntervalsAfter);

    var chosenHoursBefore = [];

    // Schedule for the next 30 days

    for (day = 0; day < 31; day++) {

      // Now choose number of random hours based on number of pings
      for (i = 0; i < numPings; i++ ){
        chosenHoursBefore[i] = Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length);
      }

      console.log("Chosen One Hour Time Intervals for Day: " + day);
      console.log(chosenHoursBefore);

      // TODO:  Have randomization between 'Before' and 'After' time intervals
      // i.e. Between 6h and 7h (currently set to on the hour above)


      // Now schedule for each day the chosen random hours
      chosenHoursBefore.forEach(item => {
        this.scheduleNotificationBasedOnTime(item, day);
      });
    }

  }

  scheduleNotificationBasedOnTime = async (hour, day) => {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('survey-messages', {
        name: 'Survey messages',
        sound: true,
        vibrate: true,
      });
    }

    console.log("The current date is: " + Date.now());

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();

    // Round up the minutes, seconds and milliseconds as per requirements
    // Add day and hour offset
    scheduledTime = new Date(currentYear, currentMonth, currentDay + day, currentHour + hour, 0, 0, 0);

    //We can do it this way as well but less control
    //scheduledTime = new Date().getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * day + 1000 * 60 * hour;

    console.log("Scheduling a notification for: " + scheduledTime);

    scheduledDateArray.push(scheduledTime);

    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "Scheduled Notification",
        body: "Scheduled Notification for the Survey!",
        ios: { sound: true },
        android: {
          "channelId": "survey-messages"
        }
      },
      {
        time: scheduledTime
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
   saveSettings = async() => {

        console.log("Platform version: " + Platform.Version);
        console.log("Device Name: " + Expo.Constants.deviceName);
        console.log("Native App Version: " + Expo.Constants.nativeAppVersion);
        console.log("Native Build Version: " + Expo.Constants.nativeBuildVersion);
        console.log("Device Year Class: " + Expo.Constants.deviceYearClass);
        console.log("Session ID: " + Expo.Constants.sessionId);
        console.log("Wake Time: " + this.state.waketime);
        console.log("Sleep Time: " + this.state.sleeptime);
        console.log("Notification Count: " + this.state.notificationcount);
        console.log("Scheduled Notification Times: " + scheduledDateArray);
        this.props.navigation.navigate('Home');
   }
  render() {
    return (
      <View>
        <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
        <Text style={{ fontSize: 30 }}>Settings:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Notification:</Text>
          <Switch value={this.state.notification} onValueChange={this.handleSwitchChnaged} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Wake Time:</Text>
          <TextInput value={this.state.waketime} editable={this.state.notification} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Sleep Time:</Text>
          <TextInput value={this.state.sleeptime} editable={this.state.notification} />
        </View>
        <Text style={[styles.label,{marginLeft:60}]}>Notification number per day:</Text>
        <RadioButton options={options} preset={this.state.notificationcount} updateParentState={this.updateRadioButtonState.bind(this)} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                      <Text style={styles.label}>Language:</Text>
                      <Picker  
                               selectedValue={this.state.culture}
                               onValueChange={c => this.setState({culture:c})}
                               style={{ width: 100, height:100, marginBottom:20, justifyContent:'space-around' }}
                               mode="dropdown">
                               <Picker.Item label="English" value="1" />
                               <Picker.Item label="French" value="2" />
                             </Picker>
                 </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Button title="Save" style={{ width: 100 }} onPress={this.saveSettings} />
          <Button title="Cancel" style={{ width: 100 }} onPress={() => this.props.navigation.navigate('Home')} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'space-around' }}>
          <Text style={{ color: 'red' }}>Following buttons are test only</Text>
          <Button title="Schedule 20s Notification" onPress={() => this.scheduleNotification20s()} />
          <Button title="Test Notification Algorithm" onPress={() => this.scheduleNotificationAlgo(this.state.waketime, this.state.sleeptime)} />
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