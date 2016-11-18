/**
 * Created by jrue on 16/11/18.
 */
import React from 'react';

import {
  AsyncStorage,
} from 'react-native';

import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import immutableTransform from 'redux-persist-transform-immutable';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { Iterable } from 'immutable';
import _ from 'lodash';

import { Reducers, ViewKeys } from './reducers';

import App from './containers';

function configureStore(onComplete) {
  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

  const logger = createLogger({
    collapsed: true,
    duration: true,
    predicate: () => isDebuggingInChrome,
    stateTransformer: (state) => {
      return _.mapValues(state, (element) => {
        if (Iterable.isIterable(element)) {
          return element.toJS();
        }
        return element;
      });
    }
  });

  const createReactStore = applyMiddleware(thunk, logger)(createStore);
  const store = autoRehydrate()(createReactStore)(Reducers);
  persistStore(store, {
    storage: AsyncStorage,
    transforms: [immutableTransform({})],
    blacklist: [ViewKeys.KEY_ROOT], // 蓝牙的实时状态不需要保存
  }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      store: configureStore(() => {
        this.setState({ isLoading: false });
      }),
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}

module.exports = Root;
