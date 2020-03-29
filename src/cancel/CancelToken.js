import Cancel from "./Cancel"

export default class CancelToken {
    promise
    reason

    constructor(executor) {
        let resolve
        this.promise = new Promise(r => {
            resolve = r
        })
        executor(message => {
            if (this.reason) return
            this.reason = new Cancel(message)
            resolve(this.reason)
        })
    }

    static source() {
        let cancel
        const token = new CancelToken(r => {
            cancel = r
        })

        return {
            token,
            cancel
        }
    }

    throwIfRequested() {
        if (this.reason) {
            throw this.reason
        }
    }
}
