import { isPlainObject, isDate } from "./utils"

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]")
}

export default function handleURL(url, params) {
  if (!params) return url
  const parts = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val == null) return
    let values = []
    if (Array.isArray(val)) {
      key += "[]"
      values = val
    } else {
      values = [val]
    }
    values.forEach(value => {
      //日期特殊处理
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        //对象特殊处理
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
    // 去掉hash
    if (url.includes("#")) {
      url = url.slice(0, url.indexOf("#"))
    }
    // 处理url中有没有？的逻辑
    const queryStr = parts.join("&")
    if (url.includes("?")) {
      url += "&" + queryStr
    } else {
      url += "?" + queryStr
    }
  })
  return url
}
