import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import ThemeChanger from '../components/theme-changer'
import brainPng from '../public/brainv.png'

const instructions = [
  'Memorize words.',
  'Look for memorized words in the puzzle.',
  'Click and drag to select a word.',
  'Find all words to score points and to move to the next level.',
  'Reach and complete level 10.',
]

const InstructionStep = ({ step: number, description, isLastStep }) => {
  const borderColor = isLastStep ? 'border-[#EB5390]' : 'border-[#57489D]'

  return (
    <div className="mb-8 pl-0 last:mb-0">
      <div className="flex w-fit items-center">
        {/* bullet */}
        <span
          className={clsx(
            'mx-auto my-1 mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border',
            borderColor
          )}
        >
          {number}
        </span>

        {/* instruction */}
        <p className="">{description}</p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="mx-auto w-[600px] font-roboto">
      <nav className="mt-10 flex items-center justify-between">
        <div className="flex select-none items-center justify-center font-titilliumWeb text-3xl">
          <span>cr</span>
          {/* logo */}
          <Image
            className="relative top-[4px]"
            src={brainPng}
            style={{ width: '30px', height: 'auto' }}
            alt="abstract brain symbol"
          />
          <span>sswit</span>
        </div>

        <ul className="flex">
          <li className="mr-10">
            <Link href="/" className="underline">
              go back
            </Link>
          </li>
          <li>
            <Link href="/play" className="underline">
              play
            </Link>
          </li>
        </ul>
      </nav>

      <div className="pt-12">
        <h2 className="mb-2 text-2xl text-neutral-500">welcome</h2>
        <p className="">Thank you for trying out the app!</p>

        <h2 className="mt-12 mb-2 text-2xl text-neutral-500">about</h2>
        <p className="">
          Crosswit is a game where you can exercise parts of your brain
          responsible for short term memory.
        </p>
        <p className="mt-4 ">
          Playing the game without writing the words down or taking screenshots
          will have the best effect for this type of exercise.
        </p>

        <h2 className="mt-12 mb-2 text-2xl text-neutral-500">did you know?</h2>
        <p className="">
          Crosswords alleviate anxiety, which will improve your mood.
        </p>

        <h2 className="mt-12 mb-6 text-2xl text-neutral-500">how to play?</h2>
        {instructions.map((instruction, i) => {
          return (
            <InstructionStep
              key={`i-s${i + 1}`}
              step={i + 1}
              description={instruction}
            />
          )
        })}
      </div>
      <div className="pt-12">
        <h2 className="mb-6 text-2xl text-neutral-500">change theme</h2>
        <ThemeChanger />
      </div>
    </section>
  )
}
