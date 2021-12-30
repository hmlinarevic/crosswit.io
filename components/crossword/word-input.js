import { useRef } from 'react';

import SearchIcon from '../icons/search';

export default function WordInput() {
	const inputRef = useRef();

	const focusInputHandler = () => {
		inputRef.current.focus();
	};

	return (
		<div
			className="text-[#5f6368] dark:text-[#e8eaed] border border-[#dadce0] dark:border-[#5f6368] rounded-full py-4 px-6 flex"
			onClick={focusInputHandler}
		>
			<SearchIcon size={20} className="text-inherit mr-3 flex items-center" />
			<input
				className="w-full bg-inherit caret-[#1a73e8] placeholder:focus:text-[#1a73e8]  dark:caret-[#8ab4f8] dark:placeholder:focus:text-[#8ab4f8] placeholder:transition-colors focus:outline-none"
				ref={inputRef}
				type="text"
				placeholder="Search here"
			/>
		</div>
	);
}
