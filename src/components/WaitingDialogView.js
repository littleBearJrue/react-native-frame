/**
 * Created by jrue on 16/11/18.
 */

import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Platform,
  Animated,
  Image,
  Modal,
  Easing
} from 'react-native';
const AnimateWaitingDialog = require('./AnimatedWaitingDialog');
const AnimatedComponent = Animated.createAnimatedComponent(AnimateWaitingDialog);
class WaitingDialogView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(360)
    };
  }

  startAnimation() {
    if (this.state.bounceValue.__getValue() >= 360) {
      this.state.bounceValue.setValue(0);
    }
    Animated.timing(this.state.bounceValue, {
      toValue: 7200 ,
      duration: 18900,
      easing: Easing.linear
    }).start(()=>{
      const {isShow} = this.props;
      if(isShow) {
        this.startAnimation()
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { isShow } = nextProps;
    if (isShow && !this.props.isShow) {
      this.startAnimation();
    }
  }

  componentDidMount() {
    const { isShow } = this.props;
    if (isShow) {
      this.startAnimation();
    }
  }

  render() {
    const params = this.props;
    return (
      <AnimatedComponent
        {...params}
        rotateValue={this.state.bounceValue}
      />
    );
  }
}

module.exports = WaitingDialogView;
