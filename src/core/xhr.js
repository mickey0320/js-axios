import { parseResponseHeaders } from "../helper/headers"

// 参数config可以理解为在调用axios的时候传递的那个对象
export default function xhr(config) {
  return new Promise((resolve, reject) => {
    const { url, method = "get", data, headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method, url, true)
    // 必须在open之后调用setRequestHeader
    Object.keys(headers).forEach(headerName => {
      request.setRequestHeader(headerName, headers[headerName])
    })

    request.send(data)

    request.onreadystatechange = function() {
      if (request.readyState !== 4) return
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
      resolve(response)
    }
  })
}
