/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
var img11 = require('./flux.png');

var List = require('./app/creation/index')
var Edit = require('./app/edit/index')
var Account = require('./app/account/index')


var testReact = React.createClass({
  getInitialState(){
    console.log('fatcher','getInitialState')
    return {
        selectedTab: 'list',
        notifCount: 0,
        presses: 0,
    }
  },
  render: function() {
    return (
      <TabBarIOS
        // unselectedTintColor="yellow"
        tintColor="#ee735c"
        // barTintColor="darkslateblue"
        translucent = {true} 
      >
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            });
          }}>
          <List />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit',
            });
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          // renderAsOriginal
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account',
            });
          }}>
          <Account />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  },

});
AppRegistry.registerComponent('testReact', () => testReact);
