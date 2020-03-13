import { isPlainObject } from "./utils"

export function transformRequest(data) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data) {
  try {
    data = JSON.parse(data)
  } catch (ex) {
    // todo
  }
  return data
}
