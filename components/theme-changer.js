import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import moonIcon from '../public/icons/moon.svg';
import sunIcon from '../public/icons/sun.svg';

export default function ThemeChanger() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// when mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const setThemeHandler = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<>
			<button onClick={setThemeHandler} className="flex">
				{theme === 'light' && <Image src={moonIcon} alt="moon icon" />}
				{theme === 'dark' && <Image src={sunIcon} alt="sun icon" />}
			</button>
		</>
	);
}
