/**
 * Created by jrue on 16/11/18.
 */
import { combineReducers } from 'redux';

import { ViewReducer, ViewActions, ViewKeys } from './ViewReducer';

const Reducers = combineReducers({
  [ViewKeys.KEY_ROOT]: ViewReducer, // 显示状态，不保存
});

module.exports = {
  Reducers,

  ViewActions,
  ViewKeys,
};
