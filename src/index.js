import {removeDuplicate} from './common'

class Validation {
  constructor(target, props) {
    props = !!props
      ? props
      : {}
    this.target = target
    this.result = props.result === undefined
      ? true
      : props.result
    this.info = props.info || ''
    this.assertion = props.assertion === undefined
      ? true
      : props.assertion
    this.invalid = []
  }

  isAsserted = () => {
    return this.assertion === true && this.result === false
  }

  isEmpty = () => {
    return !!this.target === false && this.target !== 0
  }

  setTarget = (target) => {
    if (target !== undefined) {
      this.target = target
    }
  }

  setResult = (result = true, info, tag) => {
    this.result = !!result
    if (result === false) {
      this.info = info
      if (tag) {
        this.invalid.push({ tag, info })
      }
    }
  }

  getInvalidTags = () => {
    return removeDuplicate(this.invalid.map(item => item.tag))
  }

  getInvalidInfo = () => {
    return this.invalid.reduce((info, next, index) => ({
      ...info,
      [next.tag]: {
        ...next,
        index
      }
    }), {})
  }

  isRequired = (info = '请输入必填项', tag) => {
    if (this.isAsserted() === true) 
      return this
    if (this.isEmpty() === true) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isChName = (info = '请输入中文字符', tag = 'name') => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^[\u4E00-\u9FFF]+$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isEmail = (info = '请输入合法的邮箱地址', tag = 'email') => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]*)(.[a-z]{2,4})$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isIdNo = (info = '请输入合法的15或18位身份证号码', tag = 'idNo') => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isMobileNo = (info = '请输入合法的手机号', tag = 'mobile') => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^([+]?\d+[-\s\S])?(1(3[0-9]|5[0-35-9]|8[025-9])\d{8})$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isChPhoneNo = (info = '请输入合法的国内电话号', tag = 'phone') => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^(((\d{3}-)?\d{8})|((\d{4}-)?\d{7}))$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isAccountingNum = (info = '请输入正确格式的金额', tag) => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (new RegExp(/^(((\d+|0)\.(\d){1,2})|\d+)$/g).test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isNum = (info = '请输入纯数字', tag) => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^[-+]?\d+$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  hasNoSpecialChar = (info = '输入不能包含特殊字符', tag) => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/[`~!@#$^&*()=|{}':;',[\].<>?\\/@#¥￥……&*（）～——|{}【】‘；：”“'。，、？！%+_]/.test(this.target) === true) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isLetterNumMixed = (info = '请输入字母和数字的混合', tag) => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  isLengthBetween = (min = 6, max = 12, info = '请输入长度在6～12之间的字符', tag) => {
    if (this.isAsserted() || this.isEmpty()) 
      return this
    max = max < min
      ? min
      : max
    min = min > max
      ? max
      : min
    if (new RegExp(`^.{${min},${max}}$`).test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }

  customRegExp = (reg, info, tag) => {
    // isEmpty is the top priority, dont try to use this api to judge non-empty
    if (this.isAsserted() || this.isEmpty()) 
      return this
    if (reg instanceof RegExp === false) 
      return this
    if (reg.test(this.target) === false) {
      this.setResult(false, info, tag)
    }
    return this
  }
}

export default Validation

// new GroupValid([this.name, {assertion: true}, ['isName'],
// ['isLengthBetween']]).compose().validate()
class Group {
  constructor(...rules) {
    this.rules = rules.map(rule => ruleParse(rule))
    this.result = false
    this.info = ''
    this.invalid = []
  }

  compose = (...rules) => {
    rules.forEach(rule => {
      this
        .rules
        .push(ruleParse(rule))
    })
    return this
  }

  validate = (assertion = true) => {
    try {
      this.result = true
      this
        .rules
        .forEach(rule => {
          const {target, props, validations} = rule
          let _validation = new Validation(target, props)
          validations.reduce((validation, next) => {
            return validation[next.validator]
              ? validation[next.validator](...next.args)
              : validation
          }, _validation)
          if ((assertion === true) && (_validation.result === false)) {
            throw _validation
          } else if (_validation.result === false) {
            this.info = _validation.info
            this.invalid = this
              .invalid
              .concat(_validation.invalid)
            this.result = false
          }
        })
    } catch (err) {
      this.result = false
      this.info = err.info
      this.invalid = err.invalid
    } finally {
      return this
    }
  }

  getInvalidTags = () => {
    return removeDuplicate(this.invalid.map(item => item.tag))
  }

  getInvalidInfo = () => {
    return this.invalid.reduce((info, next, index) => ({
      ...info,
      [next.tag]: {
        ...next,
        index
      }
    }), {})
  }
}

export const GroupValidation = Group

function ruleParse(rule = []) {
  const [target,
    props,
    ...validations] = rule
  return {
    target,
    props,
    validations: validations.map(validation => {
      let _validator
      if (Array.isArray(validation) === true) {
        const [validator,
          ...args] = validation
        _validator = {
          validator,
          args
        }
      } else {
        _validator = {
          validator: validation.toString(),
          args: []
        }
      }
      return _validator
    })
  }
}
