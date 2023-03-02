'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.wordsToNumbers = wordsToNumbers;

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _cljFuzzy = require('clj-fuzzy');

var _cljFuzzy2 = _interopRequireDefault(_cljFuzzy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Node module for converting words to numerals.
  Convert words to numbers. Optionally fuzzy match the words to numbers.
  `npm install words-to-numbers`
  If the whole string passed is a number then it will return a Number type otherwise it will return the original string with all instances of numbers replaced.
*/

var PRIMARY_COUNT = {
  zero: 0,
  a: 1,
  one: 1,
  first: 1,
  two: 2,
  second: 2,
  three: 3,
  third: 3,
  four: 4,
  fourth: 4,
  five: 5,
  fifth: 5,
  six: 6,
  sixth: 6,
  seven: 7,
  seventh: 7,
  eight: 8,
  eighth: 8,
  nine: 9,
  ninth: 9,
  ten: 10,
  tenth: 10,
  eleven: 11,
  eleventh: 11,
  twelve: 12,
  twelfth: 12,
  thirteen: 13,
  thirteenth: 13,
  fourteen: 14,
  fourteenth: 14,
  fifteen: 15,
  fifteenth: 15,
  sixteen: 16,
  sixteenth: 16,
  seventeen: 17,
  seventeenth: 17,
  eighteen: 18,
  eighteenth: 18,
  nineteen: 19,
  nineteenth: 19
};

var SECONDARY_COUNT = {
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

// combined first and secondary
var COUNT = (0, _assign2.default)({}, PRIMARY_COUNT, SECONDARY_COUNT);

var MAGNITUDE = {
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

// all words found in number phrases
var NUMBER_WORDS = (0, _keys2.default)(COUNT).concat((0, _keys2.default)(MAGNITUDE)).concat(['and', 'point']);

// clean word of commas
var clean = function clean(word) {
  return word.replace(',', '');
};

// Extracts unbroken regions within a string that contain number words.
// If the whole string is composed of number words then returns: "whole",
// else it returns an array of objects with `start` and `end` properties representing the
// starting and ending position/index for each number region within the string.
var extractNumberRegions = function extractNumberRegions(words) {
  var numWords = words.length;

  var numberWords = words.map(function (word) {
    return NUMBER_WORDS.includes(clean(word));
  });

  var pointReached = false;

  var reduced = numberWords.reduce(function (acc, isNumberWord, i) {
    if (isNumberWord) {
      if (words[i] === 'point') pointReached = true;

      if (!(0, _itsSet2.default)(acc.start)) {
        acc.start = i;
      } else if ((0, _keys2.default)(PRIMARY_COUNT).includes(words[i - 1]) && (0, _keys2.default)(PRIMARY_COUNT).includes(words[i]) && !pointReached) {
        acc.regions.push({ start: acc.start, end: i - 1 });
        if (i === numWords - 1) {
          acc.regions.push({ start: i, end: i });
        } else {
          acc.start = i;
        }
      }
    } else if ((0, _itsSet2.default)(acc.start)) {
      acc.regions.push({ start: acc.start, end: i - 1 });
      acc.start = null;
    }
    return acc;
  }, { regions: [], start: null });
  return reduced.start === 0 && !reduced.regions.length ? 'whole' : reduced.regions;
};

// convert an array of words into decimals (right of the decimal point)
var convertWordsToDecimal = function convertWordsToDecimal(words) {
  return words.map(function (word) {
    return COUNT[word];
  }).join('');
};

// convert an array of words into numbers to the left of the decimal point
// by matching up all COUNT and MAGNITUDE words and multiplying them together.
var convertWordsToNonDecimal = function convertWordsToNonDecimal(words) {
  var reduced = words.reduce(function (acc, word) {
    var cleanWord = clean(word);
    if (cleanWord === 'and') return acc;
    if ((0, _itsSet2.default)(acc.count)) {
      if ((0, _itsSet2.default)(COUNT[cleanWord])) {
        acc.extra += COUNT[acc.count];
        acc.count = cleanWord;
      } else {
        acc.pairs.push({ count: acc.count, magnitude: cleanWord });
        acc.count = null;
      }
    } else {
      acc.count = cleanWord;
    }
    return acc;
  }, { pairs: [], count: null, extra: 0 });

  return reduced.pairs.reduce(function (acc, pair) {
    return acc + COUNT[pair.count] * MAGNITUDE[pair.magnitude];
  }, COUNT[reduced.count] || 0) + reduced.extra;
};

// convert an unbroken string of number words to a number
var convertWordsToNumber = function convertWordsToNumber(words) {
  var pointIndex = words.indexOf('point');
  if (pointIndex > -1) {
    var numberWords = words.slice(0, pointIndex);
    var decimalWords = words.slice(pointIndex + 1);
    return parseFloat(convertWordsToNonDecimal(numberWords) + '.' + convertWordsToDecimal(decimalWords));
  }
  return convertWordsToNonDecimal(words);
};

// try coerce a word into a NUMBER_WORD using fuzzy matching
var fuzzyMatch = function fuzzyMatch(word) {
  return NUMBER_WORDS.map(function (numberWord) {
    return {
      word: numberWord,
      score: _cljFuzzy2.default.metrics.jaro(numberWord, word)
    };
  }).reduce(function (acc, stat) {
    return !(0, _itsSet2.default)(acc.score) || stat.score > acc.score ? stat : acc;
  }, {}).word;
};

// replace all number words in a string with actual numerals.
// If string contains multiple separate numbers then replace each one individually.
// If option `fuzzy` = true then try coerce words into numbers before conversion to numbers.
function wordsToNumbers(text, options) {
  var opts = (0, _assign2.default)({ fuzzy: false }, options);
  var words = text.toString().split(/[\s-]+/);
  if (opts.fuzzy) words = words.map(function (word) {
    return fuzzyMatch(word);
  });
  var regions = extractNumberRegions(words);

  if (regions === 'whole') return convertWordsToNumber(words);
  if (!regions.length) return null;

  var removedWordsCount = 0;
  return regions.map(function (region) {
    return convertWordsToNumber(words.slice(region.start, region.end + 1));
  }).reduce(function (acc, replacedRegion, i) {
    var removeCount = regions[i].end - regions[i].start + 1;
    var result = acc.slice(0);
    result.splice(regions[i].start - removedWordsCount, removeCount, replacedRegion);
    removedWordsCount += removeCount - 1;
    return result;
  }, words).join(' ');
}

exports.default = wordsToNumbers;