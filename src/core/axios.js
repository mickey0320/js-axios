import dispatchRequest from "./dispatchRequest"
import IneterceptorManager from "./InterceptorManager"
import mergeConfig from "./mergeConfig"

export default class Axios {
    interceptors = []
    defaults

    constructor(defaults) {
        this.defaults = defaults
        this.interceptors = {
            request: new IneterceptorManager(),
            response: new IneterceptorManager()
        }
    }

    request(config) {
        config = mergeConfig(this.defaults, config)
        const promiseChain = [
            {
                resolve: dispatchRequest,
                reject: undefined
            }
        ]
        this.interceptors.request.forEach(interceptor => {
            promiseChain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
            promiseChain.push(interceptor)
        })
        let promise = Promise.resolve(config)
        while (promiseChain.length) {
            const {resolve, reject} = promiseChain.shift()
            promise = promise.then(resolve, reject)
        }

        return promise
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
