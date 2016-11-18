/**
 * Created by jrue on 16/11/18.
 */
import React, {
  PropTypes,
} from 'react';

import {
  AppState,
  BackAndroid,
  Navigator,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  NetInfo,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import Immutable from 'immutable';

const makeScene = require('./makeScene');

const kScreens = {
  get main() {
    return {
      isWhite: true,
      navStyle: { backgroundColor: 'transparent' },
      // hideNav: true,
      scene: makeScene(require('./MainScreen')),
    };
  },
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'transparent',
  },
  navBarItem: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navBarLeftButton: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  navBarRightButton: {
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  navBarTitle: {
    justifyContent: 'center',
  },
  navBarTitleText: {
    fontSize: 18,
    color: '#373E4D',
    fontWeight: '500',
    textAlign: 'center',
  },
  navBarTitleWhiteText: {
    color: '#fbfbfb',
  },
  scene: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  navRightTitle: {
    fontSize:17,
    color: 'white'
  }
});
const kNavTitle = 'title';
const kNavLeftImage = 'leftImage';
const kNavLeftOnPress = 'onLeftPress';
const kNavRightImage = 'rightImage';
const kNavRightOnPress = 'onRightPress';
const KNavRightTitle = 'rightTitle';
const kRightTextColor = 'rightTextColor';
const kIsWhite = 'isWhite';

function getSenceProp(route, navigator, key) {
  const scenes = navigator.state.scenes;
  if (scenes && scenes.hasIn([route.name, key])) {
    return scenes.getIn([route.name, key]);
  }
  if (route[key] !== undefined) {
    return route[key];
  }
  const screen = kScreens[route.name];
  if (screen[key] !== undefined) {
    return screen[key];
  }
  return null;
}

let mLastStatusBarStyleAndroid;

function setStatusBarStyleAndroid(barStyle) {
  if (mLastStatusBarStyleAndroid === barStyle) {
    return;
  }
  mLastStatusBarStyleAndroid = barStyle;
}

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    let source, onPress;
    const custom = navState.scenes || Immutable.fromJS({});
    if (custom.hasIn([route.name, kNavLeftImage])) {
      source = custom.getIn([route.name, kNavLeftImage]);
      onPress = custom.getIn([route.name, kNavLeftOnPress]);
    } else if (index > 0 && !kScreens[route.name].backDisabled) {
      if (custom.hasIn([route.name, kNavLeftOnPress])) {
        onPress = custom.getIn([route.name, kNavLeftOnPress]);
      } else {
        onPress = () => navigator.pop();
      }

      source = getSenceProp(route, navigator, kIsWhite)
        ? require('../images/ic_nav_back_white.png')
        : require('../images/ic_nav_back_black.png');
    }
    if (source && onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.navBarItem, styles.navBarLeftButton]}>
            <Image source={source} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  },

  RightButton(route, navigator, index, navState) {
    let source, onPress, rightTitle, rightColor;
    const custom = navState.scenes || Immutable.fromJS({});
    if (custom.hasIn([route.name, kNavRightImage])) {
      source = custom.getIn([route.name, kNavRightImage]);
      onPress = custom.getIn([route.name, kNavRightOnPress]);
    }
    if (custom.hasIn([route.name, KNavRightTitle])) {
      rightTitle = custom.getIn([route.name, KNavRightTitle]);
      onPress = custom.getIn([route.name, kNavRightOnPress]);
      rightColor = custom.getIn([route.name, kRightTextColor]);
    }

    if ((rightTitle || source) && onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.navBarItem, styles.navBarRightButton]}>
            {rightTitle
              ? <Text style={[styles.navRightTitle, { color: rightColor || 'white' }]}>{rightTitle}</Text>
              : <Image source={source} />
            }
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  },

  Title(route, navigator, index, navState) {
    const isWhite = getSenceProp(route, navigator, kIsWhite);
    setStatusBarStyleAndroid(isWhite ? 'light-content' : 'default');
    return (
      <View style={[styles.navBarItem, styles.navBarTitle]}>
        <Text style={[styles.navBarTitleText, isWhite ? styles.navBarTitleWhiteText : {}]}>
          {getSenceProp(route, navigator, kNavTitle)}
        </Text>
      </View>
    );
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: null,
      lastSyncTime: 0,
    };

    this.configureScene = this.configureScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onNewFocus = this.onNewFocus.bind(this);

    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._handleBackAndroid = this._handleBackAndroid.bind(this);

  }

  componentWillMount() {

  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAndroid);
    }
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  onNewFocus(route) {
    if (route) {
      if (__DEV__) console.log(`onFocus: ${route.name}`);
      this.setState({ focus: route });
    } else {
      console.warn(`onFocus: Unable to focus to ${route}`);
    }
  }

  _handleBackAndroid() {
    const routes = this.refs.navigator.getCurrentRoutes();
    const count = routes && routes.length;
    if (count > 0 && routes[count - 1].backDisabled) {
      return;
    }
    if (count > 1) {
      this.refs.navigator.pop();
    } else {
      BackAndroid.exitApp();
    }
    return true;
  }

  _handleAppStateChange(currentAppState) {

  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, navigator) {
    const Scene = kScreens[route.name].scene;
    const barStyle = getSenceProp(route, navigator, kIsWhite) ? 'light-content' : 'default';
    setStatusBarStyleAndroid(barStyle);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={barStyle} />
        <Scene
          key={route.name}
          name={route.name}
          navigator={navigator}
          {...route.params}
        />
      </View>
    );
  }

  render() {
    let navigationBar;
    const focus = this.state.focus;
    if (focus && !kScreens[focus.name].hideNav) {
      navigationBar = (
        <Navigator.NavigationBar
          navigationStyles={Navigator.NavigationBar.StylesIOS}
          routeMapper={NavigationBarRouteMapper}
          style={[styles.navBar, kScreens[focus.name].navStyle, focus.navStyle]}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
        />

        <Navigator
          ref={'navigator'}
          initialRoute={{ name: 'main' }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          onWillFocus={this.onNewFocus}
          sceneStyle={styles.scene}
          navigationBar={navigationBar}
        />
      </View>
    );
  }
}

App.propTypes = {

};

module.exports = App;