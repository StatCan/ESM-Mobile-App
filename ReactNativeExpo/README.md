![Image of Yaktocat](https://pbs.twimg.com/profile_images/875425265630969857/6VaeOYz4_200x200.jpg)

# Statistics Canada WellBeing
Mobile application for Android and iOS using React Native

### Getting Started

- [Getting Started](#-Getting-Started)
- [Environment Setup](#-Environment-Setup)
- - Android
- - iOS
- Local Testing
- Packaging

## Getting Started

Wellbeing Application background and scope... (TODO!)


## Environment Setup

There are details steps required and they can be found located [here](https://facebook.github.io/react-native/docs/getting-started.html)

(You require a Mac to publish and build iOS applications!)

1. use "React Native CLI Quickstart" Documentation

- brew install node
- brew install watchman
- brew tap AdoptOpenJDK/openjdk
- brew cask install adoptopenjdk8

### Android

1. [Install Android Studio](https://developer.android.com/studio)
2. Install Android SDK
3. Download and install an image (An image is a representation of an android operating system, we will use this image to simulate on the computer)

4. Do not for get to add the following in your environment path

***
export ANDROID_HOME=$HOME/Library/Android/sdk

export PATH=$PATH:$ANDROID_HOME/emulator

export PATH=$PATH:$ANDROID_HOME/tools

export PATH=$PATH:$ANDROID_HOME/tools/bin

export PATH=$PATH:$ANDROID_HOME/platform-tools
***

### Cloning Repository
You can either use command line or a tool that can clone this repository.
[Github Download](https://desktop.github.com/)

Have this cloned on your computer inside a folder preferably in your Documents folder.

Open the terminal and navigate inside this folder.

The repo has been cloned but the dependencies are not included in the repo so we need to update/install them first

- npx react-native run-android
