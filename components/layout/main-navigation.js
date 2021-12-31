import Image from 'next/image';
import Link from 'next/link';

import { NavAction, NavToggle } from '../nav-items';
import ThemeChanger from '../theme-changer';

import Logo from '../logo';

export default function MainNavigation() {
	return (
		<nav className="w-4/5 h-full m-auto flex justify-between items-center">
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>

			<div className="h-full flex items-stretch">
				<ul className="flex mr-16">
					<li>
						<NavAction>
							<Link href="/new">
								<a>New</a>
							</Link>
						</NavAction>
					</li>
					<li>
						<NavAction>
							<button>Info</button>
						</NavAction>
					</li>
					<li>
						<NavAction>
							<button>About</button>
						</NavAction>
					</li>
					<li>
						<NavToggle>
							<ThemeChanger />
						</NavToggle>
					</li>
				</ul>
			</div>
		</nav>
	);
}
