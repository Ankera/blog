import { useReducer, useRef } from 'react'
import { Tracker } from '../reactive'

export function Observer(props) {
  const { children } = props

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const trackerRef = useRef(null)
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(forceUpdate)
  }
  return trackerRef.current.track(children)
}
