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

const FADE_CONTENT_DURATION = 500

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
      <Fade
        toggler={showContent}
        duration={FADE_CONTENT_DURATION}
        onEnd={changePage}
      >
        <Logo size={72} showText={true} textSize="2.5rem" />

        <span className="mt-[-4px] block text-center font-ubuntu text-base opacity-60">
          {'8-Way Crossword & Memory Trainer'}
        </span>
        <div className="text-neutral mx-auto w-[120px]">
          <Button className="mt-4 py-2 px-8" onClick={handlePlayClick}>
            play
          </Button>
        </div>
        <div className="mx-auto mt-20 flex w-[120px] items-center justify-evenly text-center">
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
          <button>
            <Link href="/test">
              <a>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  size="lg"
                  className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
                />
              </a>
            </Link>
          </button>
          <div>
            <ThemeChanger />
          </div>
        </div>
      </Fade>
    </section>
  )
}
