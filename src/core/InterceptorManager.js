export default class InterceptorManager {
    interceptors = []

    use(resolve, reject) {
        this.interceptors.push({resolve, reject})

        return this.interceptors.length - 1
    }

    eject(id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        }
    }

    forEach(fn) {
        this.interceptors.forEach(interceptor => {
            if (interceptor) {
                fn(interceptor)
            }
        })
    }
}
