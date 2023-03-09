import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Fade from './fade'
import Board from './crossword/board'
import Timer from './timer'
import brainPng from '../public/brainv.png'

const timerIds = []

export default function Game({ crossword, delays, timeToPlay, onGameEnd }) {
  const findWordsNum = crossword.insertedWords.length

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
        <Link href="/" passHref>
          {/* logo */}
          <Image
            className="mb-16"
            src={brainPng}
            style={{ width: '60px', height: 'auto' }}
            alt="abstract brain symbol"
          />
        </Link>
      </Fade>
      <Fade toggler={showBoard} duration={delays.fade} className="self-center">
        <Board crossword={crossword} onFoundWord={handleFoundWord} />
      </Fade>
      <Fade
        toggler={showOther}
        duration={delays.fade}
        className="mt-16 text-center"
      >
        <Timer
          seconds={timeToPlay}
          delayStart={1000 + delays.fade}
          onTimeEnd={handleTimerEnded}
          areWordsFound={areWordsFound}
          onWordsFoundSetTimeLeft={setTimeLeft}
        />
      </Fade>
    </section>
  )
}
