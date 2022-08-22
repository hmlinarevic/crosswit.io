import { useState, useEffect } from 'react'

export default function useActiveSelect(second) {
  const [isSelectActive, setIsSelectActive] = useState(false)

  const toggleSelect = () => {
    setIsSelectActive((prevState) => !prevState)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key)
      if (e.key === 's') {
        toggleSelect()
      }
    }

    const handleMouseClick = () => {
      console.log('clicking mouse')
      toggleSelect()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseClick)
    document.addEventListener('mouseup', handleMouseClick)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseClick)
      document.removeEventListener('mouseup', handleMouseClick)
    }
  }, [])

  return {
    isSelectActive,
  }
}
