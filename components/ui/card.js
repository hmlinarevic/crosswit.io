import clsx from 'clsx';

export default function Card({ className, children }) {
	const styles = ``;

	return (
		<>
			<div className={clsx('w-full p-10 mb-8 border rounded-xl', className)}>
				{children}
			</div>
		</>
	);
}
