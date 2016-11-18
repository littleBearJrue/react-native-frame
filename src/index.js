/**
 * Created by jrue on 16/11/18.
 */
import React from 'react';

import {
  AsyncStorage,
} from 'react-native';

import App from './containers';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <App />
    );
  }
}

module.exports = Root;
