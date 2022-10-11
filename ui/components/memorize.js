import { useState, useEffect } from 'react'

import Fade from './fade'
import Timer from './timer'

export default function Memorize({
  level,
  wordsToMemorize,
  timeToMemorize,
  delays,
  onEnd,
}) {
  // TODO --> change ui to togglers
  // const [togglers, setTogglers] = {}
  const [showUi, setShowUi] = useState({
    memorize: null,
    level: null,
    words: null,
    timer: null,
  })
  const [isNotifyingDone, setIsNotifyingDone] = useState()

  const levelInfo = `level ${level < 10 && 0}${level}`

  // show/hide ui - memorize, level
  useEffect(() => {
    const ids = []

    // delay everything
    ids[0] = setTimeout(() => {
      // show notification - memorize
      ids[1] = setTimeout(() => {
        setShowUi((ui) => {
          return { ...ui, memorize: true }
        })
      })
      // show notification - level
      ids[2] = setTimeout(() => {
        setShowUi((ui) => {
          return { ...ui, level: true }
        })
      }, delays.short)

      // hide notifications - memorize, level
      ids[3] = setTimeout(() => {
        setShowUi((ui) => {
          return { ...ui, memorize: false, level: false }
        })
      }, delays.memorize.firstPart)

      // end notifying phase
      ids[4] = setTimeout(() => {
        setIsNotifyingDone(true)
      }, delays.memorize.firstPart + delays.fade)
      //
    }, delays.short)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delays])

  // show ui -  words, timer
  useEffect(() => {
    if (!isNotifyingDone) return

    const ids = []

    // delay everything
    ids[0] = setTimeout(() => {
      // show words
      ids[1] = setTimeout(() => {
        setShowUi((ui) => {
          return { ...ui, words: true }
        })
      }, 0)

      // show timer
      ids[2] = setTimeout(() => {
        setShowUi((ui) => {
          return { ...ui, timer: true }
        })
      }, delays.long)
      //
    }, delays.short)

    return () => {
      ids.forEach((id) => clearInterval(id))
    }
  }, [delays, isNotifyingDone, onEnd])

  const unmountComponent = () => {
    // hide ui - words, timer
    setShowUi((ui) => {
      return { ...ui, words: false, timer: false }
    })

    // call parent callback after ui is hidden
    setTimeout(() => {
      onEnd()
    }, delays.fade)
  }

  return (
    <section className="grid h-screen place-content-center">
      {!isNotifyingDone && (
        <div className="row-start-2 row-end-3">
          <Fade toggler={showUi.memorize} duration={delays.fade}>
            <h2 className="text-center font-ubuntu text-4xl tracking-wide">
              memorize
            </h2>
          </Fade>

          <Fade toggler={showUi.level} duration={delays.fade}>
            <span className="block text-center font-ubuntuMono text-lg tracking-widest opacity-40">
              {levelInfo}
            </span>
          </Fade>
        </div>
      )}

      {isNotifyingDone && (
        <>
          <Fade
            className="row-start-2 row-end-3"
            toggler={showUi.words}
            duration={delays.fade}
          >
            <ul className="text-center">
              {wordsToMemorize.map((word, i) => {
                return (
                  <li key={word + i} className="font-ubuntu text-2xl">
                    {word}
                  </li>
                )
              })}
            </ul>
          </Fade>

          <Fade
            className="row-start-3 row-end-4"
            toggler={showUi.timer}
            duration={delays.fade}
          >
            <Timer
              className="block text-center"
              seconds={timeToMemorize}
              delayStart={1000 + delays.fade}
              onTimeEnd={unmountComponent}
            />
          </Fade>
        </>
      )}
    </section>
  )
}
