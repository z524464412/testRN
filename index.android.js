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

export default class testReact extends Component {
  constructor(props){
    super(props);
    this.state = {
      times:0
    }
  }
  timesPlus(){
    let times = this.state.times;
    times ++;
    this.setState({
      thimes:times;
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress = { this.timesPlus.bind(this)} >
          有本事点我一下
        </Text>
        <Text style={styles.instructions}>
          你点了我{ this.state.times } 次
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

AppRegistry.registerComponent('testReact', () => testReact);
