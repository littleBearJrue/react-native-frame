/**
 * Created by jrue on 16/11/18.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Immutable from 'immutable';

import { mixin } from '../utils';

class SecondScreen extends Component {
  constructor(props) {
    super(props);
    
    mixin.pureRenderMixin(this);
  }

  componentWillMount() {
    // 设置导航栏右侧按钮
    const { navigator } = this.props;
    const scenes = navigator.state.scenes || Immutable.fromJS({});
    navigator.setState({
      scenes: scenes.set('secondScreen', Immutable.fromJS({
        rightTitle: '分享',
        rightTextColor: 'black',
      }))
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native World!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
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

SecondScreen.PropTypes={
};

module.exports = SecondScreen;