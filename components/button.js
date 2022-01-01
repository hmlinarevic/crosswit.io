export default function Button({ className, children }) {
	return (
		<button
			className={`${className} w-fit border border-solid border-gray-300 hover:border-gray-400 rounded-xl transition`}
		>
			{children}
		</button>
	);
}
