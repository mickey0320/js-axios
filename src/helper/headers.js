function normalizeHeaders(headers, normalizeHeaderName) {
  Object.keys(headers).forEach(headerName => {
    if (
      headerName !== normalizeHeaderName &&
      headerName.toUpperCase() === normalizeHeaderName.toUpperCase()
    ) {
      headers[normalizeHeaderName] = headers[headerName]
      delete headers[headerName]
    }
  })

  return headers
}
export function processHeaders(headers, data) {
  headers = normalizeHeaders(headers, "Content-Type")
  if (!headers["Content-Type"] && data) {
    headers["Content-Type"] = "application/json;charset=utf-8"
  }

  return headers
}

export function parseResponseHeaders(headers) {
  const parsed = {}
  if (!headers) return parsed
  headers.split("\r\n").forEach(line => {
    if (!line) return
    const [key, value] = line.split(":")
    parsed[key.trim()] = value.trim()
  })

  return parsed
}
