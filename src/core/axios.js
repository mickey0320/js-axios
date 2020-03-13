import dispatchRequest from "./dispatchRequest"

export default class Axios {
  constructor() {}
  request(config) {
    return dispatchRequest(config)
  }
  get(url, config) {
    return this._requestWithoutData(url, "get", config)
  }
  options(url, config) {
    return this._requestWithoutData(url, "options", config)
  }
  head(url, config) {
    return this._requestWithoutData(url, "head", config)
  }
  post(url, data, config) {
    return this._requestWithData(url, "post", data, config)
  }
  put(url, data, config) {
    return this._requestWithData(url, "put", data, config)
  }
  patch(url, data, config) {
    return this._requestWithData(url, "patch", data, config)
  }
  delete(url, data, config) {
    return this._requestWithData(url, "delete", data, config)
  }
  _requestWithoutData(url, method, config) {
    return this.request({
      ...config,
      url,
      method
    })
  }
  _requestWithData(url, method, data, config) {
    return this.request({
      ...config,
      url,
      method,
      data
    })
  }
}
