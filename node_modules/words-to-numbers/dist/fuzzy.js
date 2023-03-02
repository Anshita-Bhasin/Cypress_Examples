'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cljFuzzy = require('clj-fuzzy');

var _cljFuzzy2 = _interopRequireDefault(_cljFuzzy);

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (word, haystack) {
  return (haystack || _constants.ALL_WORDS).map(function (numberWord) {
    return {
      word: numberWord,
      score: _cljFuzzy2.default.metrics.jaro(numberWord, word)
    };
  }).reduce(function (acc, stat) {
    return !(0, _itsSet2.default)(acc.score) || stat.score > acc.score ? stat : acc;
  }, {}).word;
};