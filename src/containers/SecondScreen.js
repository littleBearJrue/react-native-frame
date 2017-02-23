/**
 * Created by jrue on 16/11/18.
 */
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';

const FetchAppInfo = NativeModules.MessageAlert;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewActions, ViewKeys } from '../reducers';
import { ViewSelector } from '../selectors';

import Immutable from 'immutable';

import { Mixin } from '../utils';

class SecondScreen extends Component {
  constructor(props) {
    super(props);

    Mixin.pureRenderMixin(this);
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
    FetchAppInfo.getPackageInfo().then(list => {
      const currentData = list.map((obj) => {
        return {
          ...obj,
        };
      });
    }).catch((error) => {
      if (__DEV__) console.warn('getPackageInfo is error: ' + error);
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
  isActive: PropTypes.bool,
};

function mapStateToProps(state, props) {
  return {
    isActive:ViewSelector.isActive(state,props),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewActions: bindActionCreators(ViewActions, dispatch),
  };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(SecondScreen);