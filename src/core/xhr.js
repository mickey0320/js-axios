import { parseResponseHeaders } from "../helper/headers"
import createError from "../helper/error"

// 参数config可以理解为在调用axios的时候传递的那个对象
export default function xhr(config) {
  return new Promise((resolve, reject) => {
    const { url, method = "get", data, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method, url, true)
    // 必须在open之后调用setRequestHeader
    Object.keys(headers).forEach(headerName => {
      request.setRequestHeader(headerName, headers[headerName])
    })

    request.send(data)

    request.onerror = function() {
      reject(new createError("Network Error", config, null, request, null))
    }

    request.ontimeout = function() {
      reject(
        new createError(
          `Timeout of ${config.timeout} ms exceeded`,
          config,
          "ECONNABORTED",
          request,
          null
        )
      )
    }

    request.onreadystatechange = function() {
      if (request.readyState !== 4) return
      // 这个判断一定要加，因为网络错误或者超时错误的时候status=0,如果stauts=0，直接返回，错误交给onerror或者ontimeout处理
      if (request.status === 0) return
      const responseHeaders = parseResponseHeaders(
        request.getAllResponseHeaders()
      )
      let responseData =
        request.responseType === "text"
          ? request.responseText
          : request.response
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
