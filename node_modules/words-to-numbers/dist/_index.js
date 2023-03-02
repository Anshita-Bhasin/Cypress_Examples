'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.wordsToNumbers = wordsToNumbers;

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _cljFuzzy = require('clj-fuzzy');

var _cljFuzzy2 = _interopRequireDefault(_cljFuzzy);

var _ohmJs = require('ohm-js');

var _ohmJs2 = _interopRequireDefault(_ohmJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNIT = {
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
}; /* Node module for converting words to numerals.
     Convert words to numbers. Optionally fuzzy match the words to numbers.
     `npm install words-to-numbers`
     If the whole string passed is a number then it will return a Number type otherwise it will return the original string with all instances of numbers replaced.
   */

var TEN = {
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

var UNIT_KEYS = (0, _keys2.default)(UNIT);
var TEN_KEYS = (0, _keys2.default)(TEN);
var MAGNITUDE_KEYS = (0, _keys2.default)(MAGNITUDE);

// all words found in number phrases
var NUMBER_WORDS = ['and', 'point', 'dot'].concat(UNIT_KEYS).concat(TEN_KEYS).concat(MAGNITUDE_KEYS);

var PUNCTUATION = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

var grammar = _ohmJs2.default.grammar('\n  WordsToNumbers {\n    Number = Section* ("point" | "dot")? unit*\n    Section = TenAndMagnitude | UnitAndMagnitude | TenUnitAndMagnitude | Unit | Ten | TenAndUnit | Magnitude\n    Ten = ten ~unit ~magnitude\n    TenAndUnit = ten unit ~magnitude\n    TenAndMagnitude = ten ~unit magnitude\n    UnitAndMagnitude = ~ten unit magnitude\n    TenUnitAndMagnitude = ten unit magnitude\n    Unit = ~ten unit ~magnitude\n    Magnitude = ~ten ~unit magnitude\n    ten = ' + TEN_KEYS.map(function (key) {
  return '"' + key + '" | ';
}).join('').slice(0, -2) + '\n    unit = ' + UNIT_KEYS.map(function (key) {
  return '"' + key + '" | ';
}).join('').slice(0, -2) + '\n    magnitude = ' + MAGNITUDE_KEYS.map(function (key) {
  return '"' + key + '" | ';
}).join('').slice(0, -2) + '\n  }\n');

var semantics = grammar.createSemantics().addOperation('eval', {
  Number: function Number(sections, point, decimal) {
    var ints = sections.children.reduce(function (sum, child) {
      return sum + child.eval();
    }, 0);
    if (point.children.length) {
      var decimals = decimal.children.reduce(function (acc, d) {
        return '' + acc + d.eval();
      }, '').replace(/\s/g, '');
      return parseFloat(ints + '.' + decimals);
    }
    return ints;
  },
  Ten: function Ten(ten) {
    return ten.eval();
  },
  Unit: function Unit(unit) {
    return unit.eval();
  },
  TenAndUnit: function TenAndUnit(ten, unit) {
    return ten.eval() + unit.eval();
  },
  TenAndMagnitude: function TenAndMagnitude(ten, magnitude) {
    return ten.eval() * magnitude.eval();
  },
  UnitAndMagnitude: function UnitAndMagnitude(unit, magnitude) {
    return unit.eval() * magnitude.eval();
  },
  TenUnitAndMagnitude: function TenUnitAndMagnitude(ten, unit, magnitude) {
    return (ten.eval() + unit.eval()) * magnitude.eval();
  },
  Magnitude: function Magnitude(magnitude) {
    return magnitude.eval();
  },
  unit: function unit(value) {
    return UNIT[value.primitiveValue];
  },
  ten: function ten(value) {
    return TEN[value.primitiveValue];
  },
  magnitude: function magnitude(value) {
    return MAGNITUDE[value.primitiveValue];
  }
});

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

var isUnit = function isUnit(word) {
  return UNIT_KEYS.indexOf(word) !== -1;
};
var isTen = function isTen(word) {
  return TEN_KEYS.indexOf(word) !== -1;
};
var isMag = function isMag(word) {
  return MAGNITUDE_KEYS.indexOf(word) !== -1;
};

var findRegions = function findRegions(text, fuzzy) {
  var words = text.split(/[ -]/g).map(function (word) {
    return fuzzy ? fuzzyMatch(word) : word;
  }).reduce(function (acc, word, i) {
    var start = acc.length ? acc[i - 1].end + 1 : 0;
    return acc.concat({
      text: word,
      start: start,
      end: start + word.length
    });
  }, []).map(function (word) {
    return (0, _assign2.default)({}, word, {
      isNumberWord: NUMBER_WORDS.indexOf(word.text.replace(PUNCTUATION, '').toLowerCase()) !== -1
    });
  });

  return words.reduce(function (regions, word, index) {
    if (!word.isNumberWord) return regions;
    if (!regions.length) return [word];
    if (word.text === 'point' || word.text === 'dot') {
      var newRegions = regions.slice();
      newRegions[regions.length - 1].pointReached = true;
      newRegions[regions.length - 1].end = word.end;
      newRegions[regions.length - 1].text += ' ' + word.text;
      return newRegions;
    }
    var prevRegion = regions[regions.length - 1];
    var prevWord = words[index - 1] || '';
    if (prevRegion.end === word.start - 1 && !(isUnit(word.text) && isUnit(prevWord.text) || prevRegion.pointReached) && !(isTen(word.text) && isTen(prevWord.text)) && !(isMag(word.text) && isMag(prevWord.text)) && !(isTen(word.text) && isUnit(prevWord.text)) || prevRegion.pointReached && isUnit(word.text) || word === 'and' || prevWord === 'and') {
      var _newRegions = regions.slice();
      _newRegions[regions.length - 1].end = word.end;
      _newRegions[regions.length - 1].text += ' ' + word.text;
      return _newRegions;
    }
    return regions.concat(word);
  }, []);
};

var evaluateNumberRegion = function evaluateNumberRegion(text) {
  var textIsOnlyHelperWord = ['a', 'and'].reduce(function (acc, word) {
    return acc || text === word;
  }, false);
  if (textIsOnlyHelperWord) return text;
  var m = grammar.match(text.replace(PUNCTUATION, ' ').replace(/\band\b/g, ''));
  if (m.succeeded()) {
    return semantics(m).eval();
  } else {
    console.log(m.message);
    return text;
  }
};

function splice(str, index, count, add) {
  var i = index;
  if (i < 0) {
    i = str.length + i;
    if (i < 0) {
      i = 0;
    }
  }
  return str.slice(0, i) + (add || '') + str.slice(i + count);
}

// replace all number words in a string with actual numerals.
// If string contains multiple separate numbers then replace each one individually.
// If option `fuzzy` = true then try coerce words into numbers before conversion to numbers.
function wordsToNumbers(text, options) {
  var opts = (0, _assign2.default)({ fuzzy: false }, options);
  var regions = findRegions(text, opts.fuzzy);
  if (!regions.length) return text;
  if (regions.length === 1 && regions[0].start === 0 && regions[0].end === regions[0].text.length) {
    return evaluateNumberRegion(regions[0].text);
  }
  return regions.map(function (region) {
    return evaluateNumberRegion(region.text);
  }).reverse().reduce(function (acc, number, index) {
    var region = regions[regions.length - index - 1];
    return splice(acc, region.start, region.end - region.start, '' + number);
  }, text);
}

exports.default = wordsToNumbers;