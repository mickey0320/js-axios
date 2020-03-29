import Axios from "./core/axios"
import CancelToken from "./cancel/CancelToken"
import {isCancel} from "./cancel/Cancel"
import defaults from "./defaults"
import mergeConfig from "./core/mergeConfig"

function extend(instance, axios) {
    // 原型上的方法
    const methods = Object.getOwnPropertyNames(Axios.prototype).filter(
        method => method !== "constructor"
    )
    // 实例属性
    Object.keys(axios).forEach(prop => {
        instance[prop] = axios[prop]
    })
    methods.forEach(method => {
        instance[method] = axios[method]
    })
}

function createInstance(defaults) {
    const axios = new Axios(defaults)
    // instance是一个方法
    const instance = axios.request.bind(axios)
    // 把axios实例下的所有方法拷贝到instance上
    extend(instance, axios)
    return instance
}

const axios = createInstance(defaults)
axios.create = function (defaultConfig) {
    return createInstance(mergeConfig(defaults, defaultConfig))
}
axios.CancelToken = CancelToken
axios.isCancel = isCancel

export default axios
