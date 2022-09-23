import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import Fade from './fade'
import Logo from './logo'
import Board from './crossword/board'
import Timer from './timer'

export default function Game({ level, delays, time }) {
  const [showBoard, setShowBoard] = useState()
  const [showOther, setShowOther] = useState()
  const [numOfWordsToFind, setNumOfWordsToFind] = useState(
    level.insertedWords.length
  )

  const router = useRouter()

  const goToIndexPage = () => {
    router.push('/')
  }

  const onFoundWord = useCallback(() => {
    setNumOfWordsToFind((prevNum) => prevNum - 1)
  }, [])

  console.log({ numOfWordsToFind })

  useEffect(() => {
    const ids = []

    setTimeout(() => {
      ids[0] = setTimeout(() => {
        setShowBoard(true)
      }, delays.short)

      ids[1] = setTimeout(() => {
        setShowOther(true)
      }, delays.normal)
      //
    }, delays.short)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delays])

  return (
    <section className="grid h-screen place-content-center">
      <Fade toggler={showOther} duration={delays.fade}>
        <Logo size={64} className="mx-auto mb-16 w-fit" />
      </Fade>
      <Fade toggler={showBoard} duration={delays.fade} className="self-center">
        <Board level={level} onFoundWord={onFoundWord} />
      </Fade>
      <Fade
        toggler={showOther}
        duration={delays.fade}
        className="mt-16 text-center"
      >
        <Timer seconds={time.crossword} onEnd={goToIndexPage} />
      </Fade>
    </section>
  )
}
