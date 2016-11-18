/**
 * Created by jrue on 16/11/18.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);
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
};

module.exports = MainScreen;