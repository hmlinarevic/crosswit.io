import Link from 'next/link'

import Logo from '../components/logo'
import Button from '../components/ui/button'

export default function Home(props) {
  return (
    <>
      <div className="h-screen grid place-content-center">
        <Logo size={72} fontSize="2.25rem" />
        <span className="text-center text-lg block opacity-60 mt-[-0.5rem]">
          {'8-Way Crossword & Memory Trainer'}
        </span>
        <Link href="/go">
          <a>
            <Button className="min-w-[120px] mt-8">play</Button>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Button className="min-w-[120px]">about</Button>
          </a>
        </Link>
      </div>
    </>
  )
}
