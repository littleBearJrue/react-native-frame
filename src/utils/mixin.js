/**
 * Created by jrue on 16/11/18.
 */

const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

module.exports = {
  pureRenderMixin(inst) {
    inst.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(inst);
  },
};
