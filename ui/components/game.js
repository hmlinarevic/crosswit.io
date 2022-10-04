import { useState, useEffect, useCallback } from 'react'

import Fade from './fade'
import Logo from './logo'
import Board from './crossword/board'
import Timer from './timer'

const timerIds = []

export default function Game({ level, delays, time, onGameEnd }) {
  const findWordsNum = level.insertedWords.length

  const [showBoard, setShowBoard] = useState()
  const [showOther, setShowOther] = useState()
  const [numOfWordsToFind, setNumOfWordsToFind] = useState(findWordsNum)
  const [areWordsFound, setAreWordsFound] = useState()
  const [timeLeft, setTimeLeft] = useState()

  // --- fade in/out components on the page ---

  const hideGameComponents = useCallback(
    (cb) => {
      timerIds[0] = setTimeout(() => {
        setShowOther(false)
      }, delays.short)

      timerIds[1] = setTimeout(() => {
        setShowBoard(false)
      }, delays.long)

      timerIds[2] = setTimeout(() => {
        cb()
      }, delays.long + delays.fade)
    },
    [delays]
  )

  const showGameComponents = useCallback(() => {
    timerIds[0] = setTimeout(() => {
      setShowBoard(true)
    }, delays.short)

    timerIds[1] = setTimeout(() => {
      setShowOther(true)
    }, delays.normal)
  }, [delays])

  // --- handlers ---

  const handleFoundWord = useCallback(() => {
    setNumOfWordsToFind((prevNum) => prevNum - 1)
  }, [])

  // when user finds all words

  const handleAllWordsFound = useCallback(() => {
    hideGameComponents(() =>
      onGameEnd({ result: 'completed', timeLeft, wordsFoundNum: findWordsNum })
    )
  }, [timeLeft, onGameEnd, findWordsNum, hideGameComponents])

  // when timer has no more seconds left

  const handleTimerEnded = () => {
    hideGameComponents(() => onGameEnd({ result: 'failed' }))
  }

  // --- effects ---

  // run after inital render

  useEffect(() => {
    showGameComponents()

    return () => {
      timerIds.forEach((id) => clearInterval(id))
    }
  }, [showGameComponents])

  // when user finds all words (numOfWordsToFind === 0)

  useEffect(() => {
    if (!numOfWordsToFind) {
      setAreWordsFound(true)
    }

    if (!numOfWordsToFind && timeLeft) {
      handleAllWordsFound()
    }
  }, [numOfWordsToFind, timeLeft, handleAllWordsFound])

  return (
    <section className="grid h-screen place-content-center place-items-center">
      <Fade toggler={showOther} duration={delays.fade}>
        <Logo isLink size={64} className="mx-auto mb-16 w-fit" />
      </Fade>
      <Fade toggler={showBoard} duration={delays.fade} className="self-center">
        <Board level={level} onFoundWord={handleFoundWord} />
      </Fade>
      <Fade
        toggler={showOther}
        duration={delays.fade}
        className="mt-16 text-center"
      >
        <Timer
          seconds={time.crossword}
          delayStart={1000 + delays.fade}
          onTimeEnd={handleTimerEnded}
          areWordsFound={areWordsFound}
          onWordsFoundSetTimeLeft={setTimeLeft}
        />
      </Fade>
    </section>
  )
}
