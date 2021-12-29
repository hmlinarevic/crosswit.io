import { useState, useEffect, useRef } from 'react';

import Board from './board';

import { puzzleString } from '../../logic/crossword/model';
import { setCurrentCrossword } from '../../logic/crossword/controller';

export default function Crossword() {
	const [puzzle, setPuzzle] = useState();

	const inputRef = useRef();

	useEffect(() => {
		const puzzle = setCurrentCrossword(puzzleString);
		setPuzzle(puzzle);
	}, []);

	const focusInputHandler = () => {
		inputRef.current.focus();
	};

	return (
		<section className="w-fit m-auto grid gap">
			{puzzle && <Board puzzle={puzzle.string} size={puzzle.size} />}
			<div
				className="border rounded-full py-4 px-6"
				onClick={focusInputHandler}
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="Search here"
					className=" text-sky-600 placeholder:focus:text-sky-400 placeholder:transition-colors focus:outline-none w-full bg-inherit"
				/>
			</div>
		</section>
	);
}
