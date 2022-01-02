import Image from 'next/image';

import brainPng from '../public/brainv.png';

export default function Logo({ width, height, fontSize }) {
	return (
		<div className="flex items-center">
			<Image
				src={brainPng}
				alt="line art logo of human brain"
				width={width}
				height={height}
				objectFit="contain"
			/>
			<span
				className="font-hand uppercase ml-4"
				style={{ fontSize: `${fontSize}` }}
			>
				crossw<span className="font-hand lowercase">i</span>t
			</span>
		</div>
	);
}
