import Validation, { GroupValidation } from '../lib/index'

const useCase = {
  isRequired: [
    Case('akjsdn', ['请输入姓名'], [true, '']),
    Case(0, ['请输入金额', 'amount'], [true, '', []]),
    Case('', ['请输入姓名'], [false, '请输入姓名']),
    Case(null, ['请输入anything', 'anything'], [false, '请输入anything', ['anything']])
  ],
  isChName: [
    Case('a中文b', [], [false, '请输入中文字符']),
    Case('中ab文', [], [false, '请输入中文字符']),
    Case('张三李四王五马六', [], [true])
  ],
  isLengthBetween: [
    Case('在考场里继续支持', [], [true]),
    Case('在考场里继续支持', [3,6], [false]),
    Case('在考场', [3,2], [true]),
    Case('在考场里继续支持', [6,3], [false]),
    Case('在考场里继续', [6,3], [true]),
    Case('在考场里继续支持laksdlknlksad', [], [false])
  ],
  isEmail: [
    Case('zhangsan@qq.com', [], [true]),
    Case('zhang_san@qq.com', [], [true]),
    Case('_zhangsan@qq.com', [], [true]),
    Case('zhangsan_@qq.com', [], [true]),
    Case('zhangSan@qq.com', [], [true]),
    Case('ZhangSan@qq.com', [], [true]),
    Case('zhang-san@qq.com', [], [true]),
    Case('-zhangsan@qq.com', [], [true]),
    Case('zhangsan-@qq.com', [], [true]),
    Case('zhangsan@12qq.com', [], [true]),
    Case('zhangsan@www.hotmail.com', [], [true]),
    Case('zhangsan@hotmail.com', [], [true]),
    Case('zhangsan@com', [], [false]),
    Case('zhangsan.qq.com', [], [false]),
  ],
  isIdNo: [
    Case('310120199211143333', [], [true]),
    Case('310120186311143333', [], [true]),
    Case('310120202011143333', [], [true]),
    Case('310120399911143333', [], [true]),
    Case('31012039991114333x', [], [true]),
    Case('31012039991114323X', [], [true]),
    Case('123456199211233923', [], [true]),
    Case('310120391131399', [], [true]),
    Case('123456199211323923', [], [false]),
    Case('123456199213233923', [], [false]),
    Case('123456179211233923', [], [false]),
    Case('310120409911143333', [], [false]),
    Case('3101201863111433331', [], [false]),
    Case('310120391314333', [], [false]),
    Case('310120391332333', [], [false]),
  ],
  isAccountingNum: [
    Case('200.2', [], [true]),
    Case('200.21', [], [true]),
    Case('200.00', [], [true]),
    Case('2000012', [], [true]),
    Case('2000012.133', [], [false]),
    Case('2000012.13.', [], [false]),
    Case('.133', [], [false]),
    Case('192.168.0.0', [], [false]),
    Case('1e111233', [], [false]),
  ],
  isNum: [
    Case('200', [], [true]),
    Case('-200', [], [true]),
    Case('+200', [], [true]),
    Case('200.', [], [false]),
    Case('-200.', [], [false]),
    Case('+200.', [], [false]),
  ],
  isLetterNumMixed: [
    Case('a123', [], [true]),
    Case('as2djc', [], [true]),
    Case('1asdjc', [], [true]),
    Case('asdjc3', [], [true]),
    Case('123871293a', [], [true]),
    Case('123871b293', [], [true]),
    Case('c123871293', [], [true]),
    Case('123', [], [false]),
    Case('asbdjc', [], [false]),
  ],
  isChPhoneNo: [
    Case('021-56556656', [], [true]),
    Case('0123-5655656', [], [true]),
    Case('56556656', [], [true]),
    Case('5655665', [], [true]),
    Case('012-565516656', [], [false]),
    Case('0123-56556656', [], [false]),
  ],
  isMobileNo: [
    Case('13661666666', [], [true]),
    Case('86 13661666666', [], [true]),
    Case('0086 13661666666', [], [true]),
    Case('+86 13661666666', [], [true]),
    Case('86-13661666666', [], [true]),
    Case('0086-13661666666', [], [true]),
    Case('+86-13661666666', [], [true]),
    Case('+8613661666666', [], [true]),
    Case('86 13661666666', [], [true]),
    Case('8602113661666666', [], [true]),
    Case('+86-021-13661666666', [], [false]),
    Case('86 021 13661666666', [], [false]),
    Case('14661666666', [], [false]),
  ],
  hasNoSpecialChar: [
    Case('~asdas', [], [false]),
    Case('a!sdas', [], [false]),
    Case('asdas.', [], [false]),
    Case('asdas。', [], [false]),
    Case('asdas[', [], [false]),
    Case('asdas】', [], [false]),
    Case('asdas^', [], [false]),
    Case('asdas……', [], [false]),
    Case('asdas¥', [], [false]),
    Case('asdas$', [], [false]),
    Case('asdas?', [], [false]),
    Case('asdas？', [], [false]),
    Case('!asdas', [], [false]),
    Case('！asdas', [], [false]),
    Case('/asdas', [], [false]),
    Case('、asdas', [], [false]),
    Case(`asd\\as`, [], [false]),
    Case('\/asdas', [], [false]),
  ],
  customRegExp: [
    Case('999.99', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [true]),
    Case('0.00', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [true]),
    Case('1000.00', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [true]),
    Case('54.0', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [true]),
    Case('1000.01', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [false]),
    Case('54.', [/^(((\d{1,3})(\.\d{1,2})?)|(1000(.0|.00)?))$/], [false]),
  ]
}

describe('Single Validation Item Test', () => {
  Object.keys(useCase).map(key => {
    describe(`run validator ${key} with ${useCase[key].length} cases`, () => {
      test ('validator exists', () => {
        expect(new Validation()[key]).toBeTruthy()
      })
      useCase[key].map((item, index) => {
        test (`case ${index + 1}: input ${item.input}, expect ${item.output}`, () => {
          let _validation = new Validation(item.input)
          expect(_validation).toEqual(expect.objectContaining({
            result: expect.any(Boolean),
            info: expect.any(String),
            invalid: expect.any(Array)
          }))
          _validation[key](...item.args)
          expect(_validation.result).toBe(item.output[0])
          item.output[1] && expect(_validation.info).toBe(item.output[1])
          item.output[2] && expect(_validation.invalid).toEqual(item.output[2])
        })
      })
    })
  })
})

describe('Composed Validation Test', () => {
  describe('compose Name with length limit', () => {
    test('stepped validation compose, case 1', () => {
      let _validation = new Validation('名字长躲在树后会被发现')
      _validation.isChName()
      expect(_validation.result).toBe(true)
      expect(_validation.isLengthBetween(3,6).result).toBe(false)
    })
    test('stepped validation compose, case 2', () => {
      let _validation = new Validation('名字长躲在树后会被发现o', {assertion: false})
      _validation.isChName('非全中文', 'cnName')
      expect(_validation.result).toBe(false)
      expect(_validation.info).toBe('非全中文')
      expect(_validation.invalid).toEqual(['cnName'])
      _validation.isLengthBetween(3, 6, '长度不符', 'length')
      expect(_validation.result).toBe(false)
      expect(_validation.info).toBe('长度不符')
      expect(_validation.invalid).toEqual(['cnName', 'length'])
    })
    test('asserted composed, case 1', () => {
      let _validation = new Validation('名字长躲在树后会被发现')
      _validation.isChName().isLengthBetween(3,6,'长度不符合')
      expect(_validation.result).toBe(false)
      expect(_validation.info).toBe('长度不符合')
      expect(_validation.invalid).toEqual([])
    })
    test('asserted compose, case 2', () => {
      let _validation = new Validation('名字长躲在树后会被发现o')
      _validation.isChName('名字不对啦', 'cnName').isLengthBetween(3, 6, '长度不符合', 'length')
      expect(_validation.result).toBe(false)
      expect(_validation.info).toEqual('名字不对啦')
      expect(_validation.invalid).toEqual(['cnName'])
    })
    test('non-asserted compose, case 1', () => {
      let _validation = new Validation('名字长躲在树后会被发现o', {assertion: false})
      _validation.isChName('名字不对啦', 'cnName').isLengthBetween(3, 6, '长度不符合', 'length')
      expect(_validation.result).toBe(false)
      expect(_validation.info).toBe('长度不符合')
      expect(_validation.invalid).toEqual(['cnName', 'length'])
    })
  })
})

const userSample = {
  userName: '我只是个测试的',
  mobile: '13661666666',
  idCardNo: '310109198701235364'
}
describe('Group validation test', () => {
  test('valid idCardNo, mobile and name with mixed rules, pattern 1', () => {
    let _validation = new GroupValidation(
      [userSample.userName, {assertion: false}, ['isChName', '请输入纯中文', 'name'], ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']],
      [userSample.mobile, null, 'isMobileNo'],
      [userSample.idCardNo, null, 'isIdNo']
    )
    _validation.validate()
    expect(_validation.result).toBe(false)
    expect(_validation.info).toBe('请输入3-6长的字符')
    expect(_validation.invalid).toEqual(['length'])
  })
  test('valid idCardNo, mobile and name with mixed rules, pattern 2', () => {
    let _validation = new GroupValidation(
      [userSample.userName, {assertion: false}, ['isChName', '请输入纯中文', 'name'], ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']],
    ).compose([userSample.mobile, null, 'isMobileNo'])
    .compose([userSample.idCardNo, null, 'isIdNo'])
    _validation.validate()
    expect(_validation.result).toBe(false)
    expect(_validation.info).toBe('请输入3-6长的字符')
    expect(_validation.invalid).toEqual(['length'])
  })
  test('valid idCardNo, mobile and name with mixed rules, non-asserted', () => {
    const sample = {
      userName: '我只是个测试的a',
      mobile: '136616666166',
      idCardNo: '310109198701235364X'
    }
    let _validation = new GroupValidation(
      [sample.userName, {assertion: false}, ['isChName', '请输入纯中文', 'name'], ['isLengthBetween', 3, 6, '请输入3-6长的字符', 'length']],
    ).compose([sample.mobile, null, 'isMobileNo'])
    .compose([sample.idCardNo, null, ['isIdNo', '请输入合法身份证', 'idcard']])
    _validation.validate(false)
    expect(_validation.result).toBe(false)
    expect(_validation.info).toBe('请输入合法身份证')
    expect(_validation.invalid).toEqual(['name', 'length', 'mobile', 'idcard'])
  })
  test('side condition: default output with no argument', () => {
    let _validation = new GroupValidation()
    _validation.validate()
    expect(_validation.result).toBe(true)
    expect(_validation.info).toBe('')
    expect(_validation.invalid).toEqual([])
  })
})

function Case (input, args = [], output) {
  return { input, args, output }
}
