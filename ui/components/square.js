import { useEffect, useState } from 'react'

export default function Square({ value, isSelectMode, index, onSquareEnter }) {
  const [bgColor, setBgColor] = useState({})

  const changeBgColor = () => {
    setBgColor((prevState) => {
      return { ...prevState, backgroundColor: '#55489D' }
    })
  }

  const selectSquareOnMouseEnter = (e) => {
    if (!isSelectMode) return

    changeBgColor()
    onSquareEnter(e, index)
  }

  // fix isSelectMode being false when mouse down on square
  const selectSquareOnMouseDown = (e) => {
    changeBgColor()
    onSquareEnter(e, index)
  }

  return (
    <li className="select-none">
      <span
        onMouseDown={selectSquareOnMouseDown}
        onMouseEnter={selectSquareOnMouseEnter}
        className="block rounded border-amber-300 px-4 py-2"
        style={bgColor}
      >
        {(value && value.toUpperCase()) || '.'}
      </span>
    </li>
  )
}
