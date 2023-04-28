let currentReaction = null
const RowReactionsMap = new Map()

const baseHandler: any = {
  get(target, key) {
    const result = target[key]
    if (currentReaction) {
      addRowReactionsMap(target, key, currentReaction)
    }
    return result
  },
  set(target, key, value) {
    target[key] = value

    RowReactionsMap.get(target)
      ?.get(key)
      .forEach((reaction) => {
        if (typeof reaction._scheduler === 'function') {
          reaction._scheduler()
        } else {
          reaction()
        }
      })
    return true
  },
}

function addRowReactionsMap(target, key, reaction) {
  const reactionsMap = RowReactionsMap.get(target)
  if (reactionsMap) {
    const reactions = reactionsMap.get(key)
    if (reactions) {
      reactions.push(reaction)
    } else {
      reactionsMap.set(key, [reaction])
    }
    return reactionsMap
  } else {
    const reactionsMap = new Map()
    reactionsMap.set(key, [reaction])
    RowReactionsMap.set(target, reactionsMap)
    return reactionsMap
  }
}

export function observable(value) {
  return new Proxy(value, baseHandler)
}

export function autorun(tracker) {
  const reaction = () => {
    currentReaction = tracker
    tracker()
    currentReaction = null
  }
  reaction()
}

export class Tracker {
  _scheduler
  constructor(scheduler) {
    this.track._scheduler = scheduler
  }

  track: any = (tracker) => {
    currentReaction = this.track
    const result = tracker()
    currentReaction = null
    return result
  }
}
