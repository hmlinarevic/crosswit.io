import { useState, useEffect } from 'react'

import Fade from './fade'
import Timer from './timer'

export default function Prologue({ level, words, onEnd, delays, time }) {
  const [isFirstPartDone, setIsFirstPartDone] = useState()
  const [showMemorize, setShowMemorize] = useState()
  const [showLevel, setShowLevel] = useState()
  const [showWords, setShowWords] = useState()
  const [showTimer, setShowTimer] = useState()

  // first part - render memorize and level
  useEffect(() => {
    const ids = []

    // delay everything
    ids[0] = setTimeout(() => {
      // show memorize
      ids[1] = setTimeout(() => {
        setShowMemorize(true)
      })
      // show level after a short delay
      ids[2] = setTimeout(() => {
        setShowLevel(true)
      }, delays.short)

      // hide memorize and level
      ids[3] = setTimeout(() => {
        setShowMemorize(false)
        setShowLevel(false)
      }, delays.prologue.firstPart)

      // end first part
      ids[4] = setTimeout(() => {
        setIsFirstPartDone(true)
      }, delays.prologue.firstPart + delays.fade)
      //
    }, delays.short)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delays])
  //
  // second part - render words and timer
  useEffect(() => {
    if (!isFirstPartDone) return

    const ids = []

    // delay everything
    ids[0] = setTimeout(() => {
      // show words
      ids[1] = setTimeout(() => {
        setShowWords(true)
      }, 0)

      // show timer after a short delay
      ids[2] = setTimeout(() => {
        setShowTimer(true)
      }, delays.long)

      //
    }, delays.short)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delays, isFirstPartDone, onEnd])

  const endSecondPart = () => {
    //hide timer and words
    setShowWords(false)
    setShowTimer(false)

    // end second part - unmount prologue from parent
    setTimeout(() => {
      onEnd()
    }, delays.fade)
  }

  return (
    <section className="grid h-screen place-content-center">
      {!isFirstPartDone && (
        <div className="row-start-2 row-end-3">
          <Fade toggler={showMemorize} duration={delays.fade}>
            <h2 className="text-center font-merriweather text-4xl tracking-wide">
              memorize
            </h2>
          </Fade>

          <Fade toggler={showLevel} duration={delays.fade}>
            <span className="block text-center font-ubuntuMono text-lg tracking-widest opacity-40">
              level {level < 10 && 0}
              {level}
            </span>
          </Fade>
        </div>
      )}

      {isFirstPartDone && (
        <>
          <Fade
            toggler={showWords}
            duration={delays.fade}
            className="row-start-2 row-end-3"
          >
            <ul className="text-center">
              {words.map((word, i) => {
                return (
                  <li key={word + i} className="font-merriweather text-2xl">
                    {word}
                  </li>
                )
              })}
            </ul>
          </Fade>

          <Fade
            toggler={showTimer}
            duration={delays.fade}
            className="row-start-3 row-end-4"
          >
            <Timer
              className="block text-center"
              seconds={time.words}
              delayStart={1000 + delays.fade}
              onTimeEnd={endSecondPart}
            />
          </Fade>
        </>
      )}
    </section>
  )
}
