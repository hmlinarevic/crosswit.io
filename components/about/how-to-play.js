const instructions = [
	'Memorize words.',
	'Find memorized words in the puzzle before timer runs out.',
	'Click on the puzzle letters to create a sequence',
	'Score points with the correct sequence and with the “time left” points.',
	'Reach and complete level 10.',
];

const Step = ({ step: number, text }) => {
	return (
		<div className=" mb-8 last:mb-0">
			{/* bulleted number */}
			<span className="w-[30px] h-[30px] border border-[#57489D] rounded-full mx-auto my-1 flex justify-center items-center">
				{number}
			</span>
			{/* instructions */}
			<p className="max-w-[300px] text-center opacity-75 mx-auto">{text}</p>
		</div>
	);
};

export default function HowToPlay(second) {
	return (
		<section className="py-4">
			{instructions.map((instruction, i) => {
				return <Step key={`step${i + 1}`} step={i + 1} text={instruction} />;
			})}
		</section>
	);
}
