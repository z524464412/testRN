/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert
} from 'react-native';

import request from'../common/request'
import config from '../common/config'

import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';


var width = Dimensions.get('window').width;
var cachedResults = {
  nextPage:1,
  items:[],
  total:0
}

class Item extends PureComponent{
  
  constructor(props){
      super(props);
      this.state = {
        row : this.props.row,
        up  : false
      }
  }
  _up(){
    var that = this;
    var up = !this.state.up;
    var row = this.state.row;
    var url = config.api.base + config.api.up;
    var body = {
      id:row.item._id,
      up:up ? 'yes' :'no',
      accessToken:'qwe' 
    }
    request.post(url,body).then((data) =>{
      if(data.success){
          that.setState({
            up:up
          })
      }else{
        // Alert.alert('点赞失败,稍后重试！')
      }
    })
    .catch(function(err){
     alert(err)
    })
  }
  render(){
    var row = this.state.row;
    return( 
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.title}>
            {row.item.title}
          </Text>
          <Image 
            source = {{uri:row.item.thumb}}
            style={styles.thumb}
          >
            <Icon
              name='ios-play'
              size= {28}
              style={styles.play}
            />
          </Image>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name={ this.state.up ? "ios-heart-outline" : "ios-heart"}
                size={28}
                style={[this.state.up ? styles.up : styles.down ]}
                onPress = {this._up.bind(this)}
              />
              <Text style={styles.handleText} onPress = {this._up.bind(this)}>
                喜欢
              </Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name="ios-chatboxes-outline"
                size={28}
                style={styles.commentIcon}
              />
              <Text style={styles.handleText}>
                评论
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

class List extends PureComponent {
  constructor(props) {
      super(props);
      this.state ={
        data : [],
        isLoadingTail:false,
        isRefreshing:false
      }
  }
  componentDidMount(){
    this._fetchData(1)
  }
  _fetchData(page){
    var that = this;
    if(page == 0){
      this.setState({
        isRefreshing:true
      })
    }else{
      this.setState({
        isLoadingTail:true,
       })
    }
    request.get(config.api.base+config.api.creations,{
      accessToken:'abcdef',
      page:page
    })
      .then((data) =>{
        if(data.success){
          var items = cachedResults.items.slice();
          if(page != 0 ){
            items = items.concat(data.data)
            cachedResults.nextPage += 1 
          }else{
            items = []
            items = data.data;
          }
          cachedResults.items = items
          cachedResults.total = data.total
          setTimeout(()=>{
            if(page != 0){
                that.setState({
                  isLoadingTail:false,
                  data : cachedResults.items
                })
            }else{
                that.setState({
                  isRefreshing:false,
                  data : cachedResults.items
                })
            }
          },500)
          
        }
      })
      .catch((error)=>{
        if(page != 0){
          this.setState({
            isLoadingTail:false,
          })
        }else{
          this.setState({
            isRefreshing:false,
          })
        }
      })
  }
  refreshing(){
    var that = this;
    if(that.state.isRefreshing){
      return 
    }
    that.setState({
      isRefreshing:true
    })
    that._fetchData(0)
  }
  _hasMore(){
    return cachedResults.items.length !== cachedResults.total

  }
  _fetchMoreData(){
    if(!this._hasMore() || this.state.isLoadingTail){
      return 
    }
    var page = cachedResults.nextPage;
    this._fetchData(page)
  }
  _renderItem = (row) => {
     return (
        <Item row={row} />
     )
  }
  _keyExtractor = (item, index) => item._id;
  // _header = () => {
  //     return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
  // }

  _footer(){
    if(!this._hasMore() && cachedResults.total != 0){
      return (
          <View style={styles.loadingMore}>
              <Text style={styles.loadingText}>没有更多</Text>
          </View>
        )
    }
    return <ActivityIndicator
        animating={this.state.animating}
        style={styles.loadingMore}
        size="large"
      />
  }

  _separator = () => {
      return <View style={{height:10}}/>;
  }
  render (){
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>编辑页面</Text>
          </View>
          {
          // <Button title='滚动到指定位置' onPress={()=>{
          //     // this._flatList.scrollToOffset({animated: true, offset: 1000});
          // }}/>
          }
          <View style={{flex:1,paddingBottom:50}}>
              <FlatList 
                  // ref={(flatList)=>this._flatList = flatList}

                  // ListHeaderComponent={this._header}

                  //显示底部
                  ListFooterComponent={this._footer.bind(this)}
                  //列表之间的间隙
                  // ItemSeparatorComponent={this._separator}

                  data={ this.state.data }
                  renderItem={this._renderItem}

                  onRefresh={this.refreshing.bind(this)}
                  
                  refreshing={false}


                  //预加载触发时与底部的距离
                  onEndReachedThreshold={0}
                  //预加载方法触发
                  onEndReached={this._fetchMoreData.bind(this)}

                  //设置key
                  keyExtractor={this._keyExtractor}


                  //空数据是显示
                  // ListEmptyComponent={
                  //   <Text>还没有数据哦</Text>
                  // }
                 
                  
                  // 设置为true则变为水平布局模式。
                  // horizontal={true}
                  // 设置横向多少列
                  // numColumns ={3}
                  //横向间隙样式
                  // columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                  //是否显示滚动条
                  // showsVerticalScrollIndicator={false}


                  // 自动调节内容内偏移，控制是否自动调节内容内偏移以便于一个
                  // navigation bar或者tab bar或者toolbar不挡住Scrollview中的内容。
                  // 默认是true

                  automaticallyAdjustContentInsets={false}
                  >
              </FlatList>
          </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
    content:{
        width:500,
        height:500,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
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
    },
    item : {
      width:width,
      // marginBottom:10,
      backgroundColor:'#fff'
    },
    thumb:{
      width:width,
      height:width * 0.56,
      resizeMode:'cover'
    },
    title:{
      padding:10,
      fontSize:18,
      color:'#333'
    },
    itemFooter:{
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'#eee'
    },
    handleBox:{
      padding:10,
      flexDirection:'row',
      justifyContent:'center',
      width:width/2 -0.5,
      backgroundColor:'#fff'
    },
    play:{
      position:'absolute',
      bottom:14,
      right:14,
      width:46,
      height:46,
      paddingTop:9,
      paddingLeft:18,
      backgroundColor:'transparent',
      borderColor:'#fff',
      borderWidth:1,
      borderRadius:23,
      color:'#ed7b66'
    },
    handleText:{
      paddingLeft:12,
      fontSize:18,
      color:'#333'
    },
    up:{
      fontSize:22,
      color:'#333'
    },
    down:{
      fontSize:22,
      color:'#ed7b66'
    },
    commentIcon:{
      fontSize:22,
      color:"#333"
    },
    loadingMore:{
      marginVertical:20
    },
    loadingText:{
      color:'#777',
      textAlign:'center'
    }


})
module.exports = List ;
