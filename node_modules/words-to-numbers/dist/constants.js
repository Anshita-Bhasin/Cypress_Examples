'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BLACKLIST_SINGULAR_WORDS = exports.ALL_WORDS = exports.TOKEN_TYPE = exports.PUNCTUATION = exports.DECIMALS = exports.JOINERS = exports.NUMBER_WORDS = exports.MAGNITUDE_KEYS = exports.TEN_KEYS = exports.UNIT_KEYS = exports.NUMBER = exports.MAGNITUDE = exports.TEN = exports.UNIT = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNIT = exports.UNIT = {
  zero: 0,
  first: 1,
  one: 1,
  second: 2,
  two: 2,
  third: 3,
  thirteenth: 13,
  thirteen: 13,
  three: 3,
  fourth: 4,
  fourteenth: 14,
  fourteen: 14,
  four: 4,
  fifteenth: 15,
  fifteen: 15,
  fifth: 5,
  five: 5,
  sixth: 6,
  sixteenth: 16,
  sixteen: 16,
  six: 6,
  seventeenth: 17,
  seventeen: 17,
  seventh: 7,
  seven: 7,
  eighteenth: 18,
  eighteen: 18,
  eighth: 8,
  eight: 8,
  nineteenth: 19,
  nineteen: 19,
  ninth: 9,
  nine: 9,
  tenth: 10,
  ten: 10,
  eleventh: 11,
  eleven: 11,
  twelfth: 12,
  twelve: 12,
  a: 1
};

var TEN = exports.TEN = {
  twenty: 20,
  twentieth: 20,
  thirty: 30,
  thirtieth: 30,
  forty: 40,
  fortieth: 40,
  fifty: 50,
  fiftieth: 50,
  sixty: 60,
  sixtieth: 60,
  seventy: 70,
  seventieth: 70,
  eighty: 80,
  eightieth: 80,
  ninety: 90,
  ninetieth: 90
};

var MAGNITUDE = exports.MAGNITUDE = {
  hundred: 100,
  hundredth: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
  octillion: 1000000000000000000000000000,
  nonillion: 1000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000
};

var NUMBER = exports.NUMBER = (0, _extends3.default)({}, UNIT, TEN, MAGNITUDE);

var UNIT_KEYS = exports.UNIT_KEYS = (0, _keys2.default)(UNIT);
var TEN_KEYS = exports.TEN_KEYS = (0, _keys2.default)(TEN);
var MAGNITUDE_KEYS = exports.MAGNITUDE_KEYS = (0, _keys2.default)(MAGNITUDE);

var NUMBER_WORDS = exports.NUMBER_WORDS = [].concat((0, _toConsumableArray3.default)(UNIT_KEYS), (0, _toConsumableArray3.default)(TEN_KEYS), (0, _toConsumableArray3.default)(MAGNITUDE_KEYS));

var JOINERS = exports.JOINERS = ['and'];
var DECIMALS = exports.DECIMALS = ['point', 'dot'];

var PUNCTUATION = exports.PUNCTUATION = ['.', ',', '\\', '#', '!', '$', '%', '^', '&', '/', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ' '];

var TOKEN_TYPE = exports.TOKEN_TYPE = {
  UNIT: 0,
  TEN: 1,
  MAGNITUDE: 2,
  DECIMAL: 3,
  HUNDRED: 4
};

var ALL_WORDS = exports.ALL_WORDS = [].concat((0, _toConsumableArray3.default)(NUMBER_WORDS), JOINERS, DECIMALS);

var BLACKLIST_SINGULAR_WORDS = exports.BLACKLIST_SINGULAR_WORDS = ['a'];