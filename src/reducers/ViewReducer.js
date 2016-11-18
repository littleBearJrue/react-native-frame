/**
 * Created by jrue on 16/11/18.
 */

import {
  AppState,
} from 'react-native';

import {
  createAction,
  createReducer,
} from 'redux-act';

import Immutable from 'immutable';

const ViewKeys = {
  KEY_ROOT: 'views',
  KEY_FOCUS: 'focus',
  KEY_APP_STATE: 'appState',
};

const setFocus = createAction('View.setFocus');
const setAppState = createAction('View.setAppState');
const setBleState = createAction('View.setBleState');
const setNetState = createAction('View.setNetState');

const ViewReducer = createReducer({
  [setFocus]: (state, focus) =>
    state.set(ViewKeys.KEY_FOCUS, focus),

  [setAppState]: (state, appState) =>
    state.set(ViewKeys.KEY_APP_STATE, appState),

}, Immutable.fromJS({
  [ViewKeys.KEY_FOCUS]: null,
  [ViewKeys.KEY_APP_STATE]: AppState.currentState,
}));

const ViewActions = {
  setFocus,
  setAppState,
};

module.exports = {
  ViewReducer,
  ViewActions,
  ViewKeys,
};
