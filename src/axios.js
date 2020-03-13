import Axios from "./core/axios"

function extend(instance, axios) {
  const methods = Object.getOwnPropertyNames(Axios.prototype).filter(
    method => method !== "constructor"
  )
  methods.forEach(method => {
    instance[method] = axios[method]
  })
}

function createInstance() {
  const axios = new Axios()
  // instance是一个方法
  const instance = axios.request.bind(axios)
  // 把axios实例下的所有方法拷贝到instance上
  extend(instance, axios)
  return instance
}
const axios = createInstance()

export default axios
