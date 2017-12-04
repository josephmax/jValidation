// isObject
export const isObject = obj => {
    return (obj !== null) && (typeof obj === 'object') && (toString.call(obj) !== '[object Array]')
}

// remove duplicate
export const removeDuplicate = arr => {
    let keyPool = []
    return arr.reduce((newArr, key) => {
        if (!keyPool.includes(key)) {
            keyPool.push(key)
            newArr.push(key)
        }
        return newArr
    }, [])
}

// deep clone
export const deepClone = obj => {
    let res
    try {
        res = JSON.parse(JSON.stringify(obj))
    } catch (err) {
        res = null
        throw err
    }
    return res
}

function isEmptyObj(obj2) {
    for (let key in obj2) {
        return false
    }
    return true
}

export const postEmptyFilter = function (obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj[key] || obj[key] === 0) {
            if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
                newObj[key] = obj[key]
                // console.log(newObj[key])
            } else if (typeof obj[key] === 'object') {
                let temp = postEmptyFilter(obj[key])
                if (!isEmptyObj(temp)) {
                    newObj[key] = temp
                }
            }
        }
    }
    return newObj
}

// uppercase parse
export const uppercaseProps = (obj, exception) => {
    return Object
        .keys(obj)
        .reduce((newObj, item) => {
            let key = (exception && exception.test(item))
                ? item
                : item.firstUpperCase()
            return {
                ...newObj,
                [key]: isObject(obj[item])
                    ? uppercaseProps(obj[item], exception)
                    : obj[item]
                }
            }, {})
}

// can be used in recursive for caching
export const cacheFn = fn => {
    let cached = {}
    return (...args) => {
        let key = args.join('-')
        let result = cached[key] !== undefined
            ? cached[key]
            : fn(...args)
        cached[key] = result
        return result
    }
}

// 去除换行
export const clearBr = str => {
    str = str
        .replace(/<\/?.+?>/g, '')
        .replace(/[\r\n]/g, '')
    return str
}

// 去掉字符串两端的空格
export const trimAround = str => {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 去除字符串中间空格
export const trimBetween = str => {
    return str.replace(/\s/g, '')
}
