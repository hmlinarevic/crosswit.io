import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

import brainPng from '../public/brainv.png'

export default function Logo({
  isLink,
  className: propStyles,
  size,
  textSize,
  showText,
}) {
  const content = (
    <div className={clsx('flex items-center justify-center', propStyles)}>
      <Image
        src={brainPng}
        alt="abstract brain symbol"
        width={size}
        height={size}
        objectFit="contain"
      />

      {showText && (
        <span
          className="ml-4 font-hand dark:text-white sm:block"
          style={{ fontSize: `${textSize}` }}
        >
          CROSSWiT
        </span>
      )}
    </div>
  )
  return (
    <>
      {isLink ? (
        <Link href="/">
          <a>{content}</a>
        </Link>
      ) : (
        <>{content}</>
      )}
    </>
  )
}
