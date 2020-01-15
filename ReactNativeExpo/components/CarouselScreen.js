import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const { width } = Dimensions.get('window');
const height = width * 0.8

class Carousel extends Component {
  render() {
    const { images } = this.props;
    if (images && images.length) {
      return (
        <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {images.map(image => (
              <Image style={styles.image} source={image.source} />
            ))}
          </ScrollView>
        </View>
      );
    }
    console.log('Please provide images');
    return null;
  }
}

export default class App extends Component {
  render() {
    const images = [
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
        },
      },

    ];

    return (
      <View style={styles.container}>
        <Carousel images={images} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});