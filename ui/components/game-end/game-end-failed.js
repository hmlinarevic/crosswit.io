import { useState, useEffect, useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'

import Fade from '../fade'
import Button from '../ui/button'

import { fetchCrosswordLevel } from '../../utils'

let retryLevel

export default function GameEndFailed({
  level,
  result,
  levelScore,
  totalScore,
  onQuitClick,
  onRetryClick,
}) {
  const [showResults, setShowResults] = useState()

  const status = `level ${level < 10 && 0}${level} ${result}`

  const handleRetryClick = () => {
    setShowResults(false)

    setTimeout(() => {
      onRetryClick(retryLevel)
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowResults(true)
    }, 500)
  }, [])

  useEffect(() => {
    const storeRetryLevel = async () => {
      retryLevel = await fetchCrosswordLevel(level)
    }

    storeRetryLevel()
  }, [level, totalScore])

  return (
    <Fade toggler={showResults} duration={500}>
      <FontAwesomeIcon
        icon={faXmarkCircle}
        className="mx-auto mb-4 block text-4xl text-red-700"
      />
      {/* status */}
      <h2 className="mb-8 text-3xl">{status}</h2>

      {/* buttons */}
      <Button className="rounded-3xl py-2 px-12" onClick={handleRetryClick}>
        retry
      </Button>
      <Button className="mt-4 rounded-3xl py-2 px-12" onClick={onQuitClick}>
        quit
      </Button>
      {/* total score */}
      <div className="mt-12 text-center">
        <span className="text-neutral-500">
          total score{' '}
          <span className="text-violet-500 opacity-100">{totalScore}</span>
        </span>
      </div>
    </Fade>
  )
}
