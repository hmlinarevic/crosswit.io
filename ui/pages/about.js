import clsx from 'clsx'

import Logo from '../components/logo'

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
    <div className=" mb-8 last:mb-0">
      {/* bulleted number */}
      <span
        className={clsx(
          'mx-auto my-1 flex h-[30px] w-[30px] items-center justify-center rounded-full border',
          borderColor
        )}
      >
        {number}
      </span>
      {/* instructions */}
      <p className="mx-auto max-w-[300px] text-center text-neutral-500">
        {description}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <section className="h-screen pt-24 text-center font-ubuntu">
      <Logo isLink size={72} showText={true} textSize="2.5rem" />

      <h2 className="mt-12 mb-2 text-3xl">Welcome</h2>
      <p className="mx-auto max-w-[500px] text-neutral-500">
        Thank you for trying out the app!
      </p>

      <h2 className="mt-12 mb-2 text-3xl">About</h2>
      <p className="mx-auto max-w-[500px] text-neutral-500">
        Crosswit is a game where you can exercise parts of your brain
        responsible for short term memory.
      </p>
      <p className="mx-auto mt-4 max-w-[500px] text-neutral-500">
        Playing the game without writing the words down or taking screenshots
        will have the best effect for this type of exercise.
      </p>

      <h2 className="mt-12 mb-2 text-3xl">Did You Know?</h2>
      <p className="mx-auto max-w-[500px] text-neutral-500">
        Crosswords alleviate anxiety, which will improve your mood.
      </p>

      <h2 className="mt-12 mb-6 text-3xl">How To Play?</h2>
      {instructions.map((instruction, i, ar) => {
        // const isLastStep = Boolean(i === ar.length - 1)

        return (
          <InstructionStep
            key={`i-s${i + 1}`}
            step={i + 1}
            description={instruction}
            // isLastStep={isLastStep}
          />
        )
      })}
    </section>
  )
}
