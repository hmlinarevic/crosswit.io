import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import brainPng from '../public/brainv.png'

import Fade from '../components/fade'
import Button from '../components/ui/button'
import ThemeChanger from '../components/theme-changer'
import Leaderboard from '../components/leaderboard'

export default function Home() {
  const [showContent, setShowContent] = useState(true)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const router = useRouter()

  const handlePlayClick = () => {
    setShowContent(false)
  }

  const changePage = () => {
    router.push('/play')
  }

  const showLeaderboardHandler = () => {
    setShowLeaderboard((prevState) => !prevState)
  }

  return (
    <>
      {showLeaderboard && <Leaderboard onClose={showLeaderboardHandler} />}

      <section className="grid h-screen place-content-center">
        <Fade toggler={showContent} duration={500} onEnd={changePage}>
          {/* logo */}
          <div className="flex select-none justify-center font-titilliumWeb text-6xl">
            <span>cr</span>
            <div className="relative top-[10px]">
              <Image
                src={brainPng}
                alt="abstract brain symbol"
                width={60}
                height={60}
                objectFit="contain"
              />
            </div>
            <span>sswit</span>
          </div>

          <span className="mt-[-6px] block text-center font-ubuntu text-lg opacity-60">
            {'word search & memory trainer'}
          </span>
          <Button className="mt-6 py-2 px-8" onClick={handlePlayClick}>
            play
          </Button>
          <div className="mx-auto mt-12 flex w-[120px] items-center justify-evenly text-center">
            {/* leaderboard */}
            <button onClick={showLeaderboardHandler}>
              <FontAwesomeIcon
                icon={faCrown}
                size="lg"
                className="text-neutral-300 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
              />
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
    </>
  )
}
