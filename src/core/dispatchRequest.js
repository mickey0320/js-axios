import xhr from "./xhr"
import { processHeaders } from "../helper/headers"
import handleURL from "../helper/url"
import { transformRequest, transformResponse } from "../helper/data"

function processConfig(config) {
  const { url, params, headers = {}, data } = config
  config.url = handleURL(url, params)
  // 处理headers
  config.headers = processHeaders(headers, data)
  // 处理data
  config.data = transformRequest(data)
}

function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default function dispatchRequest(config) {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    // json字符串转为json对象
    res.data = transformResponse(res.data)
    return res
  })
}
