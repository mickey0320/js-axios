import { deepMerge } from "../helper/utils"
import { isPlainObject } from "../helper/utils"

const strats = Object.create(null)

function defaultStrat(val1, val2) {
  return typeof val2 !== "undefined" ? val2 : val1
}

function fromVal2Strat(val1, val2) {
  if (typeof val2 !== "undefined") {
    return val2
  }
}

function deepMergeStrat(val1, val2) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== "undefined") {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const stratKeysFromVal2 = ["url", "data", "params"]
stratKeysFromVal2.forEach(item => {
  strats[item] = fromVal2Strat
})

const stratKeysDeepMerge = ["headers"]
stratKeysDeepMerge.forEach(item => {
  strats[item] = deepMergeStrat
})

export default function(config1, config2) {
  const config = Object.create(null)
  for (let key in config1) {
    config[key] = merge(key)
  }
  for (let key in config2) {
    if (!config[key]) {
      config[key] = merge(key)
    }
  }

  function merge(key) {
    const strat = strats[key] || defaultStrat
    return strat(config1[key], config2[key])
  }

  return config
}
