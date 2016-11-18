/**
 * Created by jrue on 16/11/18.
 */
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewActions, ViewKeys } from '../reducers';
import { ViewSelector } from '../selectors';

import { Mixin } from '../utils';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    Mixin.pureRenderMixin(this);

    this._onPress = this._onPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isActive && !prevProps.isActive) {
      console.warn('get ViewState from ViewSelector!');
    }
  }

  _onPress() {
    const { navigator } = this.props;
    navigator.push({
      name: 'secondScreen',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._onPress}>
          <Text
          style={styles.buttonText}
          >
            Enter SecondScreen
          </Text>
        </TouchableOpacity>
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
  buttonText: {
    fontSize: 25,
    color: 'black'
  }
});

MainScreen.PropTypes={
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);