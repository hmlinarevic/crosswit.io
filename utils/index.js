/**
 * Toggle true --> false || false --> true
 *
 */
export const toggle = (prevState) => !prevState

export const fetchCrosswordLevel = async (level) => {
  const res = await fetch(`https://sanguine.cloud/api/puzzle/level/${level}`)
  const data = await res.json()

  try {
  } catch (er) {
    console.log(er)
  }

  return data
}

export const fetchAllCrosswordLevels = async () => {
  const levels = {}
  let res, data, test

  for (let i = 1; i <= 10; i++) {
    try {
      res = await fetch(`https://sanguine.cloud/api/puzzle/level/${i}`)
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

export const calcGameScore = (wordsFound, timeLeft) => +wordsFound + timeLeft
