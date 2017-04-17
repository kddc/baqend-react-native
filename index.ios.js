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
  View,
  Image
} from 'react-native';

import { db } from "baqend";

export default class reactNativeBaqend extends Component {

  constructor(props) {
    super(props);
    this.state = {connected: false, chats: []};

    db.connect('app-starter', true).then(() => {
      this.setState({connected: true, user: db.User.me});
    }).then(() => {
      // if (!db.User.me) {
      //   return db.User.login("test", "test").then(() => {
      //     this.setState({user: db.User.me});
      //   });
      // }
      db.Message
      .find()
      .resultList((chats) => {
        return this.setState({ chats: chats });
      })
    });
  }

  render() {
    let connectedText = this.state.connected? 'Connected': 'Disconnected';
    let user = this.state.user? this.state.user.username: '<anonymous>';
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! You are {connectedText} and logged in as {user}.
          {this.state.chats.length} Messages:
        </Text>
        {this.state.chats.map(chat =>
          <View key={chat.text}>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri: db.File(chat.face).url}} />
              <View>
                <Text style={styles.text}>
                  {chat.name}
                </Text>
                <Text style={styles.text}>
                  {chat.text}
                </Text>
              </View>
            </View>
          </View>
        )}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  }
});

AppRegistry.registerComponent('reactNativeBaqend', () => reactNativeBaqend);
