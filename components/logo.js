import Image from 'next/image';

import classNames from 'classnames';

import brainPng from '../public/brainv.png';

const containerStyles = ['flex', 'items-center'];

export default function Logo({ size, fontSize, className: propsStyles }) {
	const containerClasses = classNames(propsStyles, containerStyles);

	return (
		<div className={containerClasses}>
			<Image
				src={brainPng}
				alt="abstract brain symbol"
				width={size}
				height={size}
				objectFit="contain"
			/>
			<span
				className="hidden font-hand ml-4 sm:block text-white"
				style={{ fontSize: `${fontSize}` }}
			>
				CROSSWiT
			</span>
		</div>
	);
}
