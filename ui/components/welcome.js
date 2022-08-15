import Link from 'next/link';

import Logo from './logo';
import Button from './button';

export default function Welcome() {
	return (
		<div className="h-[75vh]">
			<div className="h-full grid justify-items-center">
				<div className="self-end">
					<Logo width={74} height={74} fontSize="2.25rem" />
					<span className="font-hand text-center text-lg block mt-[-0.5rem]">
						The Crossword Puzzle Trainer
					</span>
					<Link href="/play" passHref>
						<a>
							<Button className="dark:text-[#9AA0A6] dark:hover:text-white  border-[#dadce0] dark:hover:bg-neutral-900 dark:border-[#5f6368] self-center block m-auto mt-6 py-3 px-8">
								play
							</Button>
						</a>
					</Link>
				</div>
				<p className="self-end text-[#9AA0A6] font-light text-lg">
					Did you know? Crosswords alleviate anxiety, which will improve your
					mood.
				</p>
			</div>
		</div>
	);
}
