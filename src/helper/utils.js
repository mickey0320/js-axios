const toString = Object.prototype.toString

export function isPlainObject(val) {
  return toString.call(val) === "[object Object]"
}
export function isDate(val) {
  return toString.call(val) === "[object Date]"
}
export function extend(target, source) {
  for (let key in source) {
    debugger
    target[key] = source[key]
  }

  return target
}
