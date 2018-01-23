/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';

import RootScene from './app/RootScene'

export default class testReact extends PureComponent{
  render(){
    return (
        <RootScene />
    );
  }
}
AppRegistry.registerComponent('testReact', () => testReact);
