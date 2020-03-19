const toString = Object.prototype.toString

export function isPlainObject(val) {
  return toString.call(val) === "[object Object]"
}
export function isDate(val) {
  return toString.call(val) === "[object Date]"
}
export function extend(target, source) {
  for (let key in source) {
    target[key] = source[key]
  }

  return target
}

export function deepMerge(...configs) {
  const newConfig = {}
  configs.forEach(config => {
    Object.keys(config).forEach(key => {
      if (isPlainObject(config[key])) {
        if (newConfig[key]) {
          newConfig[key] = deepMerge(newConfig[key], config[key])
        } else {
          newConfig[key] = deepMerge(config[key])
        }
      } else {
        newConfig[key] = config[key]
      }
    })
  })

  return newConfig
}
