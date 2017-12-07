# jValidation
a simple util for better validation code semantization.

Notification: _this validation is meant to focus on simple type data validation, if you want to do some *Array* or *Object* or *Function* type validation, you may do it before you generate a validation via this util._

# API
Very Quick Start
--- 

1. run `npm install --save-dev jvalidation` or `yarn add --save-dev jvalidation`

2. import to your code
```
import Validation from 'jvalidation'
    // init validation
    let name = 'John'
    let _validation = new Validation(name)
    
    // run validator
    _validation.isChName('请输入纯中文汉字', 'name')

    // get result
    console.log(_validation.result, _validation.info, _validation.invalid)
    // false, '请输入纯中文汉字', [{tag: 'name', info: '请输入纯中文汉字'}]
```

MultiRules for Same Target
---
- supported chainig invocation
```
import Validation from 'jvalidation'

    let name = 'John'
    let _validation = new Validation(name, {assertion: false})

    _validation.isRequired().isChName().isLengthBetween(3,6,'长度不对')

    console.log(_validation.result, _validation.info, _validation.invalid)
    // false, '长度不对', [[ { tag: 'name', info: '请输入中文字符' }, { tag: 'length', info: '长度不对'}] }]
```

Group Validation for Different Targets
---
```
import { GroupValidation } from 'jvalidation'
    const sample = {
        userName: '我只是个测试的a',
        mobile: '136616666166',
        idCardNo: '310109198701235364X'
    }
```
you can use this pattern
```
    let _validation = new GroupValidation(
        [sample.userName, {assertion: false},
        ['isChName', '请输入纯中文', 'name'],
        ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']],
        [sample.mobile, null, 'isMobileNo'],
        [sample.idCardNo, null, ['isIdNo', '请输入合法身份证', 'idcard']]
    )
    _validation.validate(false)
```
or this pattern
```
    let _validation = new GroupValidation(
        [sample.userName, {assertion: false},
        ['isChName', '请输入纯中文', 'name'],
        ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']]
    )
    .compose([sample.mobile, null, 'isMobileNo'])
    .compose([sample.idCardNo, null, ['isIdNo', '请输入合法身份证', 'idcard']])
    _validation.validate(false)
```
or this pattern
```
    let _validation = new GroupValidation(
        [sample.userName, {assertion: false},
        ['isChName', '请输入纯中文', 'name'],
        ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']],
    ).compose(
        [sample.mobile, null, 'isMobileNo'],
        [sample.idCardNo, null, ['isIdNo', '请输入合法身份证', 'idcard']]
    )
    _validation.validate(false)
```
to get result you may use `.getInvalidInfo()`
```
    _validation.getInvalidInfo()
    // this will return all the invalid items with tags in Object
```
you may also use `.getInvalidTags()` to get all the invalid tags you input in an *Array*
```
    _validation.getInvalidTags()
```

Assertion
---

- if you want to implement assertion in a single item, just set `{assertion: false}` as the second prop.
- if you want to implement assertion assertion mode in group validation, just use `.validate()` instead of `.validate(false)` when the group rule of validation is invoked.
--- 
for more detail api just check the source code cause this is really really easy to understand...

pleas feel free to rewrite or contribute.