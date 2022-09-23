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

const fetchAllLevels = async () => {
  const levels = {}
  let res, data, test

  for (let i = 1; i <= 10; i++) {
    if (i === 4) {
      test = true
    }
    try {
      res = await fetch(
        `http://localhost:8080/api/crossword/${!test ? i : test}`
      )
      if (res.ok) {
        data = await res.json()
      }
    } catch (error) {
      console.log('error')
    }
    levels[i] = data
  }

  return levels
}

export default function Play({ level, time, allLevels }) {
  // move to Game immediately with true
  const [isPrologueDone, setIsPrologueDone] = useState(true)
  const [userLevel, setUserLevel] = useState(1)

  const currentLevel = allLevels[userLevel]

  console.log({ currentLevel })

  const wordsToMemorize = level.insertedWords.map((data) => data.word)

  console.log({ allLevels })
  const handlePrologueEnd = () => {
    setIsPrologueDone(true)
  }

  useEffect(() => {}, [])

  return (
    <>
      {!isPrologueDone && (
        <Prologue
          words={wordsToMemorize}
          onEnd={handlePrologueEnd}
          delays={DELAYS}
          time={currentLevel.time}
        />
      )}

      {isPrologueDone && (
        <Game
          level={currentLevel.level}
          delays={DELAYS}
          time={currentLevel.time}
        />
      )}
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

  const levels = await fetchAllLevels()

  return {
    props: {
      level: data.level,
      time: data.time,
      allLevels: levels,
    },
  }
}
