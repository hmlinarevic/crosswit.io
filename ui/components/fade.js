import { useEffect, useState } from 'react'

import { toggle } from '../utils'

export default function MyFade({ show, duration, children }) {
  const [entering, setEntering] = useState(false)
  const [entered, setEntered] = useState(false)
  const [exited, setExited] = useState(true)

  useEffect(() => {
    if (show && !entered) {
      setExited(toggle)
    }

    if (!show && entered) {
      console.log('we will unmount')
      setEntering(toggle)
      setEntered(toggle)

      setTimeout(() => {
        setExited(toggle)
      }, duration)
    }
  }, [show, entered, duration])

  useEffect(() => {
    if (!exited) {
      setTimeout(() => {
        setEntering(toggle)
      }, 0)

      setTimeout(() => {
        setEntered(toggle)
        console.log('component entered')
      }, duration)
    }
  }, [exited, duration])

  if (exited) return null

  const defaultStyle = {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'ease-in-out',
  }

  const addedStyle = {
    opacity: entering ? 1 : 0,
  }

  return <div style={{ ...defaultStyle, ...addedStyle }}>{children}</div>
}
