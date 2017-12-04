'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// isObject
var isObject = exports.isObject = function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && toString.call(obj) !== '[object Array]';
};

// remove duplicate
var removeDuplicate = exports.removeDuplicate = function removeDuplicate(arr) {
    var keyPool = [];
    return arr.reduce(function (newArr, key) {
        if (!keyPool.includes(key)) {
            keyPool.push(key);
            newArr.push(key);
        }
        return newArr;
    }, []);
};

// deep clone
var deepClone = exports.deepClone = function deepClone(obj) {
    var res = void 0;
    try {
        res = JSON.parse(JSON.stringify(obj));
    } catch (err) {
        res = null;
        throw err;
    }
    return res;
};

function isEmptyObj(obj2) {
    for (var key in obj2) {
        return false;
    }
    return true;
}

var postEmptyFilter = exports.postEmptyFilter = function postEmptyFilter(obj) {
    var newObj = {};
    for (var key in obj) {
        if (obj[key] || obj[key] === 0) {
            if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
                newObj[key] = obj[key];
                // console.log(newObj[key])
            } else if (_typeof(obj[key]) === 'object') {
                var temp = postEmptyFilter(obj[key]);
                if (!isEmptyObj(temp)) {
                    newObj[key] = temp;
                }
            }
        }
    }
    return newObj;
};

// uppercase parse
var uppercaseProps = exports.uppercaseProps = function uppercaseProps(obj, exception) {
    return Object.keys(obj).reduce(function (newObj, item) {
        var key = exception && exception.test(item) ? item : item.firstUpperCase();
        return _extends({}, newObj, _defineProperty({}, key, isObject(obj[item]) ? uppercaseProps(obj[item], exception) : obj[item]));
    }, {});
};

// can be used in recursive for caching
var cacheFn = exports.cacheFn = function cacheFn(fn) {
    var cached = {};
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var key = args.join('-');
        var result = cached[key] !== undefined ? cached[key] : fn.apply(undefined, args);
        cached[key] = result;
        return result;
    };
};

// 去除换行
var clearBr = exports.clearBr = function clearBr(str) {
    str = str.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
    return str;
};

// 去掉字符串两端的空格
var trimAround = exports.trimAround = function trimAround(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

// 去除字符串中间空格
var trimBetween = exports.trimBetween = function trimBetween(str) {
    return str.replace(/\s/g, '');
};
