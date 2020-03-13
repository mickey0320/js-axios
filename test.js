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

axios({
  url: "http://localhost:8080/extend/post",
  method: "post",
  data: {
    msg: "hi"
  }
})

axios.request({
  url: "http://localhost:8080/extend/post",
  method: "post",
  data: {
    msg: "hello"
  }
})

axios.get("http://localhost:8080/extend/get")

axios.options("http://localhost:8080/extend/options")

axios.delete("http://localhost:8080/extend/delete")

axios.head("http://localhost:8080/extend/head")

axios.post("http://localhost:8080/extend/post", { msg: "post" })

axios.put("http://localhost:8080/extend/put", { msg: "put" })

axios.patch("http://localhost:8080/extend/patch", { msg: "patch" })
