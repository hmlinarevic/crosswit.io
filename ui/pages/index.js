import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import Fade from '../components/fade'
import Logo from '../components/logo'
import Button from '../components/ui/button'
import ThemeChanger from '../components/theme-changer'

export default function Home() {
  const [showContent, setShowContent] = useState(true)

  const router = useRouter()

  const handlePlayClick = () => {
    setShowContent(false)
  }

  const changePage = () => {
    router.push('/play')
  }

  return (
    <section className="grid h-screen place-content-center">
      <Fade toggler={showContent} duration={500} onEnd={changePage}>
        <Logo size={72} showText={true} textSize="2.5rem" />

        <span className="mt-[-12px] block text-center font-ubuntu text-lg opacity-60">
          {'8-Way Crossword & Memory Trainer'}
        </span>
        <Button className="mt-6 py-2 px-8" onClick={handlePlayClick}>
          play
        </Button>
        <div className="mx-auto mt-12 flex w-[120px] items-center justify-evenly text-center">
          {/* leaderboard */}
          <button>
            <Link href="/">
              <a>
                <FontAwesomeIcon
                  icon={faCrown}
                  size="lg"
                  className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
                />
              </a>
            </Link>
          </button>
          {/* about */}
          <button>
            <Link href="/about">
              <a>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  size="lg"
                  className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
                />
              </a>
            </Link>
          </button>
          {/* themes */}
          <div>
            <ThemeChanger />
          </div>
        </div>
      </Fade>
    </section>
  )
}
