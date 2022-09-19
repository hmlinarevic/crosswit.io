import useCountdown from '../hooks/useCountdown'

const formatTime = (min, sec) =>
  `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`

export default function Timer({
  className,
  seconds: totalSeconds,
  delayStart = 0,
  onEnd,
}) {
  const [minutes, seconds] = useCountdown(totalSeconds, delayStart, onEnd)

  return <span className={className}>{formatTime(minutes, seconds)}</span>
}
