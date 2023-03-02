'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordsToNumbers = wordsToNumbers;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _compiler = require('./compiler');

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wordsToNumbers(text) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var regions = (0, _parser2.default)(text, options);
  if (!regions.length) return text;
  var compiled = (0, _compiler2.default)({ text: text, regions: regions });
  return compiled;
}

exports.default = wordsToNumbers;