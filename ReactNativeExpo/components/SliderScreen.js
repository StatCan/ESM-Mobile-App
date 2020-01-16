// SurveyResultScreen.js
import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
export default class SurveyResultScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Population Result:</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.label}>Activity Count:</Text>
          <Image source={{ uri: 'https://webdashboardapp.azurewebsites.net/Home/GetActivityCountImage' }} style={styles.image} />
          <Text style={styles.label}>Mood Count:</Text>
          <Image source={{ uri: 'https://webdashboardapp.azurewebsites.net/Home/GetMoodCountImage' }} style={styles.image} />
          <Text style={styles.label}>Weekly Mood Comparation:</Text>
          <Image source={{ uri: 'https://webdashboardapp.azurewebsites.net/Home/GetMoodWeeklyImage' }} style={styles.image} />
        </ScrollView>
        <Button title="Back" style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'stretch',
  },
  logo: { width: 300, height: 40 },
  scrollView: { marginHorizontal: 10, marginTop: 10 },
  image: { width: 300, height: 240, alignSelf: 'center' },
  image1: { width: 350, height: 340, alignSelf: 'center' },
  label: { fontSize: 20, alignSelf: 'center', marginBottom: 10 }
});