import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Platform, Switch,Image,Picker } from "react-native";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import RadioButton from './RadioButton'
import TimePicker from './TimePicker'

// Num Pings
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

// Methodology: Selection Probabilities
// For Weekdays and Weekends
const primeTimeAwakeIntervals = [
{ 
  awakeHourBefore: 16,
  weekDayPercentage: 5,  // A
  weekendPercentage: 5   // F
},
{ 
  awakeHourBefore: 17,
  weekDayPercentage: 10, // B
  weekendPercentage: 10  // G
},
{ 
  awakeHourBefore: 18,
  weekDayPercentage: 10, // C
  weekendPercentage: 10  // H
},
{ 
  awakeHourBefore: 19,
  weekDayPercentage: 25, // D
  weekendPercentage: 20  // I
},
{ 
  awakeHourBefore: 20,
  weekDayPercentage: 25, // E
  weekendPercentage: 20  // J
}];

var scheduledDateArray = new Array();

export default class LocalNotificationScreen extends React.Component {
  state = { notification: true, waketime: '08:00', sleeptime: '21:00', notificationcount: 5, culture: 'English' };

  constructor(props) {
    super(props);
    this.wakeTimeHandler = this.wakeTimeHandler.bind(this);
    this.sleepTimeHandler = this.sleepTimeHandler.bind(this);
  }

  wakeTimeHandler(time) {
    this.setState({
      waketime: time
    })
  }

  sleepTimeHandler(time) {
    this.setState({
      sleeptime: time
    })
  }

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
      if (global.debugMode) console.log("Notifications Permission Not Granted");
      return false;
    }
    if (global.debugMode) console.log("Notifications Permission Granted");
    return true;
  };

  componentDidMount() {

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.

    if (global.debugMode) console.log("DEBUGMODE ON - Outputting Console Logs");
    if (global.debugMode) console.log("Settings Screen Component Mounted");
    this.askPermissions();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    if (global.debugMode) console.log("Notification was clicked - navigating to Survey");
    this.props.navigation.navigate('CurrentEQ');
  };

  sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: "Immediate Notification",
      body: "Immediate Notification--sound",
      sound: true
    });
    if (global.debugMode) console.log(notificationId);
  };

  // Unit Test the Scheduling Algorithm
  // To be moved to a Helper class on wellBeingCheck repo
  // awakeHour: Default is 6h or 6am
  // sleepHour: Default is 22h or 10pm
  
  scheduleNotificationAlgo = (awakeHour = 6, sleepHour = 22) => {

    awakeHour = parseInt(awakeHour.substring(0, 2));
    sleepHour = parseInt(sleepHour.substring(0, 2));

    if (global.debugMode) console.log("Awake Hour is: " + awakeHour);
    if (global.debugMode) console.log("Sleep Hour is: " + sleepHour);

    // Clear existing notifications
    Notifications.cancelAllScheduledNotificationsAsync()

    numPings = this.state.notificationcount;

    // Based on defaults awakeInterval is 16
    awakeInterval = sleepHour - awakeHour;

    if (numPings > 5 || numPings < 2) {
      if (global.debugMode) console.log("numPings has an invalid value");
      return;
    }

    // Safety Check
    if (numPings > awakeInterval) numPings = awakeInterval;

    // Handle awakeHour == sleepHour

    if (awakeHour > sleepHour) awakeInterval = awakeHour + 24;

    // Now come up with a time to set notifications to

    var awakeOneHourTimeIntervalsBefore = [];
    var awakeOneHourTimeIntervalsAfter = [];

    for (i = 0; i <= awakeInterval; i++) {
      awakeOneHourTimeIntervalsBefore[i] = awakeHour + (i - 1);
      awakeOneHourTimeIntervalsAfter[i] = awakeHour + i;
    }

    // For testing purposes print to console
    if (global.debugMode) console.log("One Hour Time Intervals i.e. 6h to 7h");
    if (global.debugMode) console.log(awakeOneHourTimeIntervalsBefore);
    if (global.debugMode) console.log(awakeOneHourTimeIntervalsAfter);

    var chosenHoursBefore = [];

    // Schedule for the next 30 days
    // For testing purposes, day set to a few days
    for (day = 0; day < 2; day++) {

      // Now choose number of random hours based on number of pings
      for (i = 0; i < numPings; i++ ){
        chosenHoursBefore[i] = Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length);
      }

      if (global.debugMode) console.log("Chosen One Hour Time Intervals for Day: " + day);
      if (global.debugMode) console.log(chosenHoursBefore);

      // TODO:  Have randomization between 'Before' and 'After' time intervals
      // i.e. Between 6h and 7h (currently set to on the hour above)

      // 1st version of selection probabilities
      // 


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

    if (global.debugMode) console.log("The current date is: " + Date.now());

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

    if (global.debugMode) console.log("Scheduling a notification for: " + scheduledTime);

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
    if (global.debugMode) console.log(notificationId);
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
    if (global.debugMode) console.log(notificationId);
  };
  handleSwitchChanged = (v) => {
    this.setState({ notification: v });
  };
  updateRadioButtonState (data) {
          if (global.debugMode) console.log(data);
          this.setState({notificationcount:data.key});
      };
   saveSettings = async() => {

        if (global.debugMode) console.log("Platform version: " + Platform.Version);
        if (global.debugMode) console.log("Device Name: " + Expo.Constants.deviceName);
        if (global.debugMode) console.log("Native App Version: " + Expo.Constants.nativeAppVersion);
        if (global.debugMode) console.log("Native Build Version: " + Expo.Constants.nativeBuildVersion);
        if (global.debugMode) console.log("Device Year Class: " + Expo.Constants.deviceYearClass);
        if (global.debugMode) console.log("Session ID: " + Expo.Constants.sessionId);
        if (global.debugMode) console.log("Wake Time: " + this.state.waketime);
        if (global.debugMode) console.log("Sleep Time: " + this.state.sleeptime);
        if (global.debugMode) console.log("Notification Count: " + this.state.notificationcount);
        if (global.debugMode) console.log("Scheduled Notification Times: " + scheduledDateArray);
        this.props.navigation.navigate('Home');
   }
  render() {
    return (
      <View>
        <Image source={require('./StatCanLogo.png')} style={{width: 300,height:100}}/>
        <Text style={{ fontSize: 30 }}>Settings:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Notification:</Text>
          <Switch value={this.state.notification} onValueChange={this.handleSwitchChanged} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Wake Time:</Text>
          <TimePicker time={this.state.waketime} timeType="wakeTime" handler = {this.wakeTimeHandler} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Sleep Time:</Text>
          <TimePicker time={this.state.sleeptime} timeType="sleepTime" handler = {this.sleepTimeHandler} />
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