import React from "react";
import { StyleSheet, Text,TextInput, View, Button,Platform,Switch } from "react-native";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import RadioButton from './RadioButton'
const options = [
	{
		key: '2',
		text: 'Two',
	},
	{
    		key: '3',
    		text: 'Three',
    	},
    	{
        		key: '4',
        		text: 'Four',
        	},
        	{
                    		key: '5',
                    		text: 'Five',
                    	},
];
export default class LocalNotificationScreen extends React.Component {
  state={notification:false,waketime:'8:00',sleeptime:'21:00',notificationcount:2,culture:'English'};
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
      sound:true
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
        ios:{sound:true},
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
  handleSwitchChnaged=(v)=>{
    this.setState({notification:v});
  };
  render() {
    return (
    <View>
     <Text style={{fontSize:30}}>Settings:</Text>
    <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
        <Text style={{fontSize:20}}>Notification:</Text>
         <Switch value={this.state.notification} onValueChange ={this.handleSwitchChnaged} />
    </View>

           <View style={{flexDirection:'row',justifyContent: 'space-around'}}>

           <Text>WakeTime:</Text>
           <TextInput value={this.state.waketime} editable={this.state.notification}/>
           </View>
           <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
                 <Text>SleepTime:</Text>
                 <TextInput value={this.state.sleeptime} editable={this.state.notification}/>
           </View>
             <Text style={{marginLeft:40}}>Notification times per day:</Text>
              <RadioButton options={options} />
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
                 <Button title="Save" style={{width:100}}  onPress={() => this.props.navigation.navigate('Home')} />

                 <Button title="Cancel" style={{width:100}}  onPress={() => this.props.navigation.navigate('Home')}/>
            </View>
             <View>
             <Text style={{color:'red'}}>Following buttons are test only</Text>
                    <Button
                      title="Please accept Notifications Permissions"
                      onPress={() => this.askPermissions()}
                    />
                    <Button
                      title="Send Notification immediately"
                      onPress={() => this.sendNotificationImmediately()}
                    />
                    <Button
                      title="Dismiss All Notifications"
                      onPress={() => Notifications.dismissAllNotificationsAsync()}
                    />
                    <Button
                      title={"Schedule Notification"}
                      onPress={() => this.scheduleNotification()}
                    />
                    <Button
                      title="Cancel Scheduled Notifications"
                      onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
                    />
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
  }
});