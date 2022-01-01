import BoardItem from './board-item';

export default function Board({ puzzle, size }) {
	const content = puzzle
		.split('')
		.map((letter, i) => <BoardItem key={letter + i} item={letter} />);

	return (
		<div className="font-puzzle text-l">
			<ul
				className="grid gap-10 justify-items-center"
				style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
			>
				{content}
			</ul>
		</div>
	);
}
