'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var splice = exports.splice = function splice(str, index, count, add) {
  var i = index;
  if (i < 0) {
    i = str.length + i;
    if (i < 0) {
      i = 0;
    }
  }
  return str.slice(0, i) + (add || '') + str.slice(i + count);
};