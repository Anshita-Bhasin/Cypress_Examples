'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('./constants');

var _fuzzy = require('./fuzzy');

var _fuzzy2 = _interopRequireDefault(_fuzzy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-extra-parens */
var SKIP = 0;
var ADD = 1;
var START_NEW_REGION = 2;
var NOPE = 3;

var canAddTokenToEndOfSubRegion = function canAddTokenToEndOfSubRegion(subRegion, currentToken, _ref) {
  var impliedHundreds = _ref.impliedHundreds;
  var tokens = subRegion.tokens;

  var prevToken = tokens[0];
  if (!prevToken) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.TEN) return true;
  if (impliedHundreds && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (impliedHundreds && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.MAGNITUDE) return true;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  if (impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return true;
  return false;
};

var getSubRegionType = function getSubRegionType(subRegion, currentToken) {
  if (!subRegion) {
    return { type: currentToken.type };
  }
  var prevToken = subRegion.tokens[0];
  var isHundred = prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT || prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN || prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN && _constants.NUMBER[prevToken.lowerCaseValue] > 9 || prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.UNIT || prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE;
  if (subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE) return { type: _constants.TOKEN_TYPE.MAGNITUDE, isHundred: isHundred };
  if (isHundred) return { type: _constants.TOKEN_TYPE.HUNDRED, isHundred: isHundred };
  return { type: currentToken.type, isHundred: isHundred };
};

var checkIfTokenFitsSubRegion = function checkIfTokenFitsSubRegion(subRegion, token, options) {
  var _getSubRegionType = getSubRegionType(subRegion, token);

  var type = _getSubRegionType.type;
  var isHundred = _getSubRegionType.isHundred;

  if (!subRegion) return { action: START_NEW_REGION, type: type, isHundred: isHundred };
  if (canAddTokenToEndOfSubRegion(subRegion, token, options)) {
    return { action: ADD, type: type, isHundred: isHundred };
  }
  return { action: START_NEW_REGION, type: type, isHundred: isHundred };
};

var getSubRegions = function getSubRegions(region, options) {
  var subRegions = [];
  var currentSubRegion = void 0;
  var tokensCount = region.tokens.length;
  var i = tokensCount - 1;
  while (i >= 0) {
    var token = region.tokens[i];

    var _checkIfTokenFitsSubR = checkIfTokenFitsSubRegion(currentSubRegion, token, options);

    var action = _checkIfTokenFitsSubR.action;
    var type = _checkIfTokenFitsSubR.type;
    var isHundred = _checkIfTokenFitsSubR.isHundred;

    token.type = isHundred ? _constants.TOKEN_TYPE.HUNDRED : token.type;
    switch (action) {
      case ADD:
        {
          currentSubRegion.type = type;
          currentSubRegion.tokens.unshift(token);
          break;
        }
      case START_NEW_REGION:
        {
          currentSubRegion = {
            tokens: [token],
            type: type
          };
          subRegions.unshift(currentSubRegion);
          break;
        }
      // no default
    }
    i--;
  }
  return subRegions;
};

var canAddTokenToEndOfRegion = function canAddTokenToEndOfRegion(region, currentToken, _ref2) {
  var impliedHundreds = _ref2.impliedHundreds;
  var tokens = region.tokens;

  var prevToken = tokens[tokens.length - 1];
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.UNIT && !region.hasDecimal) return false;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  return true;
};

var checkIfTokenFitsRegion = function checkIfTokenFitsRegion(region, token, options) {
  var isDecimal = _constants.DECIMALS.includes(token.lowerCaseValue);
  if ((!region || !region.tokens.length) && isDecimal) {
    return START_NEW_REGION;
  }
  var isPunctuation = _constants.PUNCTUATION.includes(token.lowerCaseValue);
  if (isPunctuation) return SKIP;
  var isJoiner = _constants.JOINERS.includes(token.lowerCaseValue);
  if (isJoiner) return SKIP;
  if (isDecimal && !region.hasDecimal) {
    return ADD;
  }
  var isNumberWord = _constants.NUMBER_WORDS.includes(token.lowerCaseValue);
  if (isNumberWord) {
    if (!region) return START_NEW_REGION;
    if (canAddTokenToEndOfRegion(region, token, options)) {
      return ADD;
    }
    return START_NEW_REGION;
  }
  return NOPE;
};

var checkBlacklist = function checkBlacklist(tokens) {
  return tokens.length === 1 && _constants.BLACKLIST_SINGULAR_WORDS.includes(tokens[0].lowerCaseValue);
};

var matchRegions = function matchRegions(tokens, options) {
  var regions = [];

  if (checkBlacklist(tokens)) return regions;

  var i = 0;
  var currentRegion = void 0;
  var tokensCount = tokens.length;
  while (i < tokensCount) {
    var token = tokens[i];
    var tokenFits = checkIfTokenFitsRegion(currentRegion, token, options);
    switch (tokenFits) {
      case SKIP:
        {
          break;
        }
      case ADD:
        {
          if (currentRegion) {
            currentRegion.end = token.end;
            currentRegion.tokens.push(token);
            if (token.type === _constants.TOKEN_TYPE.DECIMAL) {
              currentRegion.hasDecimal = true;
            }
          }
          break;
        }
      case START_NEW_REGION:
        {
          currentRegion = {
            start: token.start,
            end: token.end,
            tokens: [token]
          };
          regions.push(currentRegion);
          if (token.type === _constants.TOKEN_TYPE.DECIMAL) {
            currentRegion.hasDecimal = true;
          }
          break;
        }
      case NOPE:
      default:
        {
          currentRegion = null;
          break;
        }
    }
    i++;
  }

  return regions.map(function (region) {
    return (0, _extends3.default)({}, region, { subRegions: getSubRegions(region, options) });
  });
};

var getTokenType = function getTokenType(chunk) {
  if (_constants.UNIT_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.UNIT;
  if (_constants.TEN_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.TEN;
  if (_constants.MAGNITUDE_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.MAGNITUDE;
  if (_constants.DECIMALS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.DECIMAL;
};

exports.default = function (text, options) {
  var tokens = text.split(/(\w+|\s|[[:punct:]])/i).reduce(function (acc, chunk) {
    var unfuzzyChunk = chunk.length && options.fuzzy && !_constants.PUNCTUATION.includes(chunk) ? (0, _fuzzy2.default)(chunk) : chunk;
    var start = acc.length ? acc[acc.length - 1].end + 1 : 0;
    var end = start + chunk.length;
    return end !== start ? acc.concat({
      start: start,
      end: end - 1,
      value: unfuzzyChunk,
      lowerCaseValue: unfuzzyChunk.toLowerCase(),
      type: getTokenType(unfuzzyChunk, options)
    }) : acc;
  }, []);
  var regions = matchRegions(tokens, options);
  return regions;
};