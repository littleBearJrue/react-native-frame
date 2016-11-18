/**
 * Created by jrue on 16/11/18.
 */

const reactMixin = require('react-mixin');

module.exports = {
  timer(Component) {
    reactMixin(Component.prototype, require('react-native-timer-mixin'));
  },
};
