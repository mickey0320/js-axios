const defaults = {
  method: "get",
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  },
  timeout: 0
}

const methodsWithData = ["post", "put", "patch"]
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})

export default defaults
