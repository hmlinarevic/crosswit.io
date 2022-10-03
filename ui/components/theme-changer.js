import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

import MoonIcon from './icons/svg/moon-icon'
import SunIcon from './icons/svg/sun-icon'

export default function ThemeChanger({ className, children }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // when mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const setThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <button onClick={setThemeHandler} className={className}>
        {theme === 'light' && (
          <FontAwesomeIcon
            className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
            icon={faMoon}
            size="lg"
          />
        )}
        {theme === 'dark' && (
          <FontAwesomeIcon
            className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
            icon={faSun}
            size="lg"
          />
        )}
        {theme === 'system' && (
          <FontAwesomeIcon
            className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
            icon={faSun}
            size="lg"
          />
        )}
      </button>
    </>
  )
}
