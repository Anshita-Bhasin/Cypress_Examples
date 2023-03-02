'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itsSet = itsSet;

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function itsSet(val) {
  var checkVal = function checkVal(v) {
    return typeof v !== 'undefined' && v !== null;
  };
  if (!checkVal(val)) return false;
  if (val.constructor === Array) {
    return val.every(function (v) {
      return checkVal(v);
    });
  } else if (arguments.length === 2) {
    return checkVal((0, _lodash2.default)(arguments[0], arguments[1]));
  }
  return true;
}

exports.default = itsSet;