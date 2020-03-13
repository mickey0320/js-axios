class AxiosError extends Error {
  // message是错误
  // config是请求时的config配置
  // code是错误码
  // request是请求的xmlhttprequest对象
  // response是响应
  constructor(message, config, code, request, response) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 这句代码非常关键
    // 一个类继承了Error类，这个类的实例 instanceOf 这个类 应该返回true,没有这个代码会返回false
    // 这应该是js语言的一个bug
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default function createError(message, config, code, request, response) {
  return new AxiosError(message, config, code, request, response)
}
