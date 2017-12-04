'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupValidation = undefined;

var _common = require('./common');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function Validation(target, props) {
  _classCallCheck(this, Validation);

  _initialiseProps.call(this);

  props = !!props ? props : {};
  this.target = target;
  this.result = props.result === undefined ? true : props.result;
  this.info = props.info || '';
  this.assertion = props.assertion === undefined ? true : props.assertion;
  this.invalid = [];
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.isAsserted = function () {
    return _this.assertion === true && _this.result === false;
  };

  this.isEmpty = function () {
    return !!_this.target === false && _this.target !== 0;
  };

  this.setTarget = function (target) {
    if (target !== undefined) {
      _this.target = target;
    }
  };

  this.setResult = function () {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var info = arguments[1];
    var tag = arguments[2];

    _this.result = !!result;
    if (result === false) {
      _this.info = info;
      tag && _this.invalid.push(tag);
    }
  };

  this.isRequired = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入必填项';
    var tag = arguments[1];

    if (_this.isAsserted() === true) return _this;
    if (_this.isEmpty() === true) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isChName = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入中文字符';
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^[\u4E00-\u9FFF]+$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isEmail = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入合法的邮箱地址';
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'email';

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]*)(.[a-z]{2,4})$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isIdNo = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入合法的15或18位身份证号码';
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'idNo';

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isMobileNo = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入合法的手机号';
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mobile';

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^([+]?\d+[-\s\S])?(1(3[0-9]|5[0-35-9]|8[025-9])\d{8})$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isChPhoneNo = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入合法的国内电话号';
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'phone';

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^(((\d{3}-)?\d{8})|((\d{4}-)?\d{7}))$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isAccountingNum = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入正确格式的金额';
    var tag = arguments[1];

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (new RegExp(/^(((\d+|0)\.(\d){1,2})|\d+)$/g).test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isNum = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入纯数字';
    var tag = arguments[1];

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^[-+]?\d+$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.hasNoSpecialChar = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '输入不能包含特殊字符';
    var tag = arguments[1];

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/[`~!@#$^&*()=|{}':;',[\].<>?\\/@#¥￥……&*（）～——|{}【】‘；：”“'。，、？！%+_]/.test(_this.target) === true) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isLetterNumMixed = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入字母和数字的混合';
    var tag = arguments[1];

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.isLengthBetween = function () {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
    var info = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '请输入长度在6～12之间的字符';
    var tag = arguments[3];

    if (_this.isAsserted() || _this.isEmpty()) return _this;
    max = max < min ? min : max;
    min = min > max ? max : min;
    if (new RegExp('^.{' + min + ',' + max + '}$').test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };

  this.customRegExp = function (reg, info, tag) {
    // isEmpty is the top priority, dont try to use this api to judge non-empty
    if (_this.isAsserted() || _this.isEmpty()) return _this;
    if (reg instanceof RegExp === false) return _this;
    if (reg.test(_this.target) === false) {
      _this.setResult(false, info, tag);
    }
    return _this;
  };
};

exports.default = Validation;

// new GroupValid([this.name, {assertion: true}, ['isName'],
// ['isLengthBetween']]).compose().validate()

var Group = function Group() {
  _classCallCheck(this, Group);

  _initialiseProps2.call(this);

  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  this.rules = rules.map(function (rule) {
    return ruleParse(rule);
  });
  this.result = false;
  this.info = '';
  this.invalid = [];
};

var _initialiseProps2 = function _initialiseProps2() {
  var _this2 = this;

  this.compose = function () {
    for (var _len2 = arguments.length, rules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      rules[_key2] = arguments[_key2];
    }

    rules.forEach(function (rule) {
      _this2.rules.push(ruleParse(rule));
    });
    return _this2;
  };

  this.validate = function () {
    var assertion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    try {
      _this2.result = true;
      _this2.rules.forEach(function (rule) {
        var target = rule.target,
            props = rule.props,
            validations = rule.validations;

        var _validation = new Validation(target, props);
        validations.reduce(function (validation, next) {
          return validation[next.validator] ? validation[next.validator].apply(validation, next.args) : validation;
        }, _validation);
        if (assertion === true && _validation.result === false) {
          throw _validation;
        } else if (_validation.result === false) {
          _this2.info = _validation.info;
          _this2.invalid = _this2.invalid.concat(_validation.invalid);
          _this2.result = false;
        }
      });
    } catch (err) {
      _this2.result = false;
      _this2.info = err.info;
      _this2.invalid = err.invalid;
    } finally {
      _this2.invalid = (0, _common.removeDuplicate)(_this2.invalid);
      return _this2;
    }
  };
};

var GroupValidation = exports.GroupValidation = Group;

function ruleParse() {
  var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _rule = _toArray(rule),
      target = _rule[0],
      props = _rule[1],
      validations = _rule.slice(2);

  return {
    target: target,
    props: props,
    validations: validations.map(function (validation) {
      var _validator = void 0;
      if (Array.isArray(validation) === true) {
        var _validation2 = _toArray(validation),
            validator = _validation2[0],
            args = _validation2.slice(1);

        _validator = {
          validator: validator,
          args: args
        };
      } else {
        _validator = {
          validator: validation.toString(),
          args: []
        };
      }
      return _validator;
    })
  };
}
