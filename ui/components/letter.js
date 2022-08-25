import { useState } from 'react'

export default function Letter({ char, isSelectActive }) {
  const [bgColor, setBgColor] = useState({})

  const handleLetterClick = () => {
    setBgColor((prevState) => {
      return { ...prevState, backgroundColor: '#55489D' }
    })
  }

  return (
    <li
      onMouseEnter={(e) => {
        if (!isSelectActive) return

        console.log('entering...')
        console.log('hello')
        console.log(e.target.innerText)
        handleLetterClick()
      }}
      className="select-none"
    >
      <button>
        <span
          onMouseDown={handleLetterClick}
          className="block px-4 py-2 border-amber-300 rounded"
          style={bgColor}
        >
          {(char && char.toUpperCase()) || '.'}
        </span>
      </button>
    </li>
  )
}
