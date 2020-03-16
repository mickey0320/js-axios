import axios from "./src/index"
// import axios from "axios"

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get",
//   params: {
//     foo: ["bar", "baz"]
//   }
// })

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get",
//   params: {
//     foo: {
//       bar: "baz"
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get",
//   params: {
//     date
//   }
// })

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get",
//   params: {
//     foo: "@:$, "
//   }
// })

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get",
//   params: {
//     foo: "bar",
//     baz: null
//   }
// })

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get#hash",
//   params: {
//     foo: "bar"
//   }
// })

// axios({
//   method: "get",
//   url: "http://localhost:8080/base/get?foo=bar",
//   params: {
//     bar: "baz"
//   }
// })

// axios({
//   url: "http://localhost:8080/extend/post",
//   method: "post",
//   data: {
//     msg: "hi"
//   }
// })

// axios.request({
//   url: "http://localhost:8080/extend/post",
//   method: "post",
//   data: {
//     msg: "hello"
//   }
// })

// axios.get("http://localhost:8080/extend/get")

// axios.options("http://localhost:8080/extend/options")

// axios.delete("http://localhost:8080/extend/delete")

// axios.head("http://localhost:8080/extend/head")

// axios.post("http://localhost:8080/extend/post", { msg: "post" })

// axios.put("http://localhost:8080/extend/put", { msg: "put" })

// axios.patch("http://localhost:8080/extend/patch", { msg: "patch" })

// axios({
//   method: "get",
//   url: "http://localhost:8080/error/get1"
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

// axios({
//   method: "get",
//   url: "http://localhost:8080/error/get"
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
// })

// setTimeout(() => {
//   axios({
//     method: "get",
//     url: "http://localhost:8080/error/get"
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }, 5000)

// axios({
//   method: "get",
//   url: "http://localhost:8080/error/timeout",
//   timeout: 2000
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e.message)
//     console.log(e.config)
//     console.log(e.code)
//     console.log(e.request)
//     console.log(e.isAxiosError)
//   })
// axios.interceptors.request.use(config => {
//   config.headers.test += "1"
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += "1"
//   config.headers.test += "2"
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += "3"
//   return config
// })

// axios.interceptors.response.use(res => {
//   res.data += "1"
//   return res
// })
// let interceptor = axios.interceptors.response.use(res => {
//   res.data += "2"
//   return res
// })
// axios.interceptors.response.use(res => {
//   res.data += "3"
//   return res
// })

// axios.interceptors.response.eject(interceptor)

// axios({
//   url: "http://localhost:8080/interceptor/get",
//   method: "get",
//   headers: {
//     test: ""
//   }
// }).then(res => {
//   console.log(res.data)
// })

const CancelToken = axios.CancelToken
// const source = CancelToken.source()
// axios
//   .get("http://localhost:8080/cancel/get", {
//     cancelToken: source.token
//   })
//   .catch(function(e) {
//     if (axios.isCancel(e)) {
//       console.log("Request canceled", e.message)
//     }
//   })

// setTimeout(() => {
//   source.cancel("Operation canceled by the user.")
//   axios
//     .post(
//       "http://localhost:8080/cancel/post",
//       { a: 1 },
//       { cancelToken: source.token }
//     )
//     .catch(function(e) {
//       if (axios.isCancel(e)) {
//         console.log(e.message)
//       }
//     })
// }, 100)

let cancel

axios
  .get("http://localhost:8080/cancel/get", {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled")
    }
  })

setTimeout(() => {
  cancel()
}, 200)
