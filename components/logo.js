import Image from 'next/image';
import { useRouter } from 'next/router';

import brainLogo from '../public/brainv.png';

export default function Logo() {
	const router = useRouter();
	const isPlayPage = router.pathname === '/play';

	return (
		<div className="flex items-center">
			<Image
				src={brainLogo}
				alt="line art logo of human brain"
				width={isPlayPage ? 58 : 80}
				height={isPlayPage ? 58 : 80}
				objectFit="contain"
			/>
			<span
				className={`${
					isPlayPage ? 'text-3xl' : 'text-4xl'
				} font-hand uppercase  ml-4`}
			>
				crossw<span className="font-hand lowercase">i</span>t
			</span>
		</div>
	);
}
