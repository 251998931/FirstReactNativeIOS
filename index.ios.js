/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var MOCKED_MOVIES_DATA = [
                          {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
                          ];

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

class HelloWorld extends Component {
    
    //加载单条数据
//    constructor(props) {
//        super(props);   //这一句不能省略，照抄即可
//        this.state = {
//        movies: null,  //这里放你自己定义的state变量及初始值
//        };
//        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
//        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
//        
//       
//        this.fetchData = this.fetchData.bind(this);
//    }
//    fetchData() {
//        fetch(REQUEST_URL)
//        .then((response) => response.json())
//        .then((responseData) => {
//              // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
//              this.setState({
//                            movies: responseData.movies,
//                            });
//              })
//        .done();
//    }

    
    //加载一个列表
    constructor(props) {
        super(props);
        this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
        loaded: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this); 
    }
    
    fetchData() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
              // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
              this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                            loaded: true,
                            });
              })
        .done();
    }
    
    
    //componentDidMount是React组件的一个生命周期方法，它会在组件刚加载完成的时候调用一次，以后不会再被调用。
    componentDidMount() {
        this.fetchData();
    }
    
    
    
    
//    render() {
//        if (!this.state.movies) {
//            return this.renderLoadingView();
//        }
//        
//        var movie = this.state.movies[0];
//        return this.renderMovie(movie);
//    }
    
    render(){
        
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        
        return (
                <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
                />
                );

    }
    
    renderLoadingView() {
        return (
                <View style={styles.container}>
                <Text>
                正在加载电影数据……
                </Text>
                </View>
                );
    }
    
    renderMovie(movie) {
        return (
                <View style={styles.container}>
                <Image
                source={{uri: movie.posters.thumbnail}}
                style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>{movie.year}</Text>
                </View>
                </View>
                );
    }
}

var styles = StyleSheet.create({
                       container: {
                               flex: 1,
                               flexDirection: 'row',
                               justifyContent: 'center',
                               alignItems: 'center',
                               backgroundColor: '#F5FCFF',
                               },
                               thumbnail: {
                               width: 53,
                               height: 81,
                        },
                        rightContainer: {
                               flex: 1,
                               backgroundColor: '#999999',
                        },
                        title: {
                               fontSize: 20,
                               marginBottom: 8,
                               textAlign: 'center',
                        },
                        year: {
                               textAlign: 'center',
                        },
                               
                        listView: {
                               paddingTop: 20,
                               backgroundColor: '#F5FCFF',
                        },
});



// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

