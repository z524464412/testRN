/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {

  StyleSheet,
  Text,
  View

} from 'react-native';

var Account = React.createClass({
  render : function(){
    return (
      <View style={styles.container}>
          <View style={styles.header}>
                <Text style={styles.headerTitle}>123123</Text>
          </View>
          
      </View>
    )
  }
})

var styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:"#F5FCFF"
 },
 header:{
  paddingTop:25,
  paddingBottom:12,
  backgroundColor:'#ee735c'
 },
 headerTitle:{
  color:"#fff",
  fontSize:16,
  textAlign:'center',
  fontWeight:'200'
 }

})
module.exports = Account ;
