/**
 * Created by jrue on 16/11/18.
 */
import { ViewKeys } from '../reducers';

function getValue(state, key) {
  return state[ViewKeys.KEY_ROOT].get(key);
}

module.exports = {
  getFocus(state) {
    return getValue(state, ViewKeys.KEY_FOCUS);
  },

  getAppState(state) {
    return getValue(state, ViewKeys.KEY_APP_STATE);
  },

  isActive(state, props) {
    const appState = getValue(state, ViewKeys.KEY_APP_STATE);
    if (appState === 'active' || appState === 'inactive') {
      return getValue(state, ViewKeys.KEY_FOCUS) === props.name;
    }
    return false;
  },

  appActive(state, props) {
    const appState = getValue(state, ViewKeys.KEY_APP_STATE);
    return (appState === 'active' || appState === 'inactive');
  },

};
