import Link from 'next/link';

import Card from '../components/ui/card';
import Logo from '../components/logo';
import HowToPlay from '../components/about/how-to-play';
import Scoreboard from '../components/about/scoreboard';

const Title = ({ children: title }) => {
	return <h2 className="text-3xl text-center font-bold mb-2">{title}</h2>;
};

const Text = ({ children: text }) => {
	return <p className="text-center opacity-70">{text}</p>;
};

const Nav = () => {
	return (
		<nav className="border-b border-neutral-700 ">
			<div className="max-w-[1200px] py-2 mx-auto flex justify-between items-center">
				<Logo size={42} fontSize="1.35rem" />
				<ul className="text-lg font-light flex">
					<li className="mr-20">
						<Link href="/">
							<a>go back</a>
						</Link>
					</li>
					<li>
						<Link href="/">
							<a>change theme</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default function About(second) {
	return (
		<>
			<Nav />
			<div className="max-w-[1200px] mx-auto pt-10 grid grid-cols-2 gap-x-32">
				<div className="flex flex-col ">
					<Card className="bg-violet-700/5 border-violet-400/60">
						<Title>Welcome</Title>
						<Text>Thank you for using the app!</Text>
					</Card>
					<Card className="bg-pink-700/5 border-pink-400/60">
						<Title>Did you know?</Title>
						<Text>
							Crosswords alleviate anxiety, which will improve your mood.
						</Text>
					</Card>
					<Card className="h-full bg-lime-700/5 border-lime-400/60 mb-0 grid place-content-center">
						<Title>Your Scoreboard</Title>
						<Text>Complete level 10</Text>
					</Card>
				</div>
				<Card className="bg-violet-700/5 border-violet-400/60 mb-0">
					<Title>How to play</Title>
					<HowToPlay />
				</Card>
			</div>
		</>
	);
}
