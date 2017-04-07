/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { db } from "baqend";

export default class reactNativeBaqend extends Component {

  constructor(props) {
    super(props);

    this.state = {connected: false};

    db.connect('app-starter.app.baqend.com', true).then(() => {
      this.setState({connected: true, user: db.User.me});
    }).then(() => {
      if (!db.User.me) {
        return db.User.login("test", "test").then(() => {
          this.setState({user: db.User.me});
        });
      }
    });
  }

  render() {
    let connectedText = this.state.connected? 'Connected': 'Disconnected';
    let user = this.state.user? this.state.user.username: '<anonymous>';
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! You are {connectedText} and logged in as {user}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeBaqend', () => reactNativeBaqend);
