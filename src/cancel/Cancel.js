export default class Cancel {
    message

    constructor(message) {
        this.message = message
    }
}

export function isCancel(val) {
    return val instanceof Cancel
}
