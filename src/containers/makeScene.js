/**
 * Created by jrue on 16/11/18.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function makeScene(ComposedComponent) {
  class MZUScene extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
      };
    }

    componentDidMount() {
      this.runAfterInteractions(() => {
        this.setState({ loaded: true });
      });
    }

    render() {
      if (!this.state.loaded) {
        return null;
      }
      const { style, ...otherProps } = this.props;
      return (
        <ComposedComponent
          {...otherProps}
          style={[styles.container, style]}
        />
      );
    }
  }

  MZUScene.propTypes = {
    name: PropTypes.string.isRequired,
  };

  return ComposedComponent; // FIXME: 解决窗口循环调用问题
}

module.exports = makeScene;
