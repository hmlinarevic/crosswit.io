import { useState, useEffect } from 'react'

const ONE_SEC = 1000

// clear async timers in useEffect
const ids = []

const calcTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return { minutes, seconds }
}

export default function useCountdown(seconds, delayStart, onEnd) {
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  const time = calcTime(secondsLeft)

  useEffect(() => {
    ids[0] = setTimeout(() => {
      ids[1] = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1)
      }, ONE_SEC)
    }, delayStart)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delayStart])

  useEffect(() => {
    if (secondsLeft === 0) {
      console.log('timer cleared, seconds === 0')
      clearInterval(ids[1])
      onEnd && onEnd()
    }
  }, [secondsLeft, onEnd])

  return [time.minutes, time.seconds]
}
