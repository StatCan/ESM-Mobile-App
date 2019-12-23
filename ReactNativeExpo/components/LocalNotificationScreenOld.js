import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
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
      title: "This is crazy",
      body: "Your mind will blow after reading this",
      sound: 'true'
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };

  scheduleNotification = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "I'm Scheduled",
        body: "Wow, I can show up even when app is closed",
        sound: 'true'
      },
      {
        repeat: "minute",
        time: new Date().getTime() + 10000
      }
    );
    console.log(notificationId);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Notofication Settings:</Text>
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
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
