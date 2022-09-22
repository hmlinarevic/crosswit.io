import { useState, useEffect } from 'react'

import Fade from '../components/fade'
import Prologue from '../components/prologue'
import Game from '../components/game'

const DELAYS = {
  // in miliseconds
  prologue: {
    firstPart: 4000,
    secondPart: 4000,
  },
  fade: 1000,
  short: 250,
  normal: 500,
  long: 1000,
}

export default function Play({ level, time }) {
  // move to Game immediately with true
  const [isPrologueDone, setIsPrologueDone] = useState(true)

  const wordsToMemorize = level.insertedWords.map((data) => data.word)

  const handlePrologueEnd = () => {
    setIsPrologueDone(true)
  }

  return (
    <>
      {!isPrologueDone && (
        <Prologue
          words={wordsToMemorize}
          onEnd={handlePrologueEnd}
          delays={DELAYS}
          time={time}
        />
      )}

      {isPrologueDone && <Game level={level} delays={DELAYS} time={time} />}
    </>
  )
}

export async function getStaticProps() {
  let data

  try {
    const res = await fetch(
      // 'https://limitless-sea-13267.herokuapp.com/api/crossword/3'
      'http://localhost:8080/api/crossword/3'
    )
    data = await res.json()
  } catch (err) {
    console.log(err)
  }

  return {
    props: {
      level: data.level,
      time: data.time,
    },
  }
}
