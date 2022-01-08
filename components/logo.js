import Image from 'next/image';

import brainPng from '../public/brainv.png';

export default function Logo({ size, fontSize }) {
  return (
    <div className="flex items-center">
      <Image
        src={brainPng}
        alt="abstract brain symbol"
        width={size}
        height={size}
        objectFit="contain"
      />
      <span
        className="hidden  font-hand uppercase ml-4 sm:lowercase sm:block"
        style={{ fontSize: `${fontSize}` }}
      >
        crossw<span className="font-hand lowercase">i</span>t
      </span>
    </div>
  );
}
