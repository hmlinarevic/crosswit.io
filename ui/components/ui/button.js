import clsx from 'clsx';

const defaultStyles = `block text-white border border-solid border-gray-300  rounded-xl transition px-8 py-2 mx-auto mt-4 hover:border-gray-400 dark:hover:text-white dark:hover:bg-neutral-900 dark:border-[#5f6368]`;

export default function Button({ className: propsStyles, children }) {
	return (
		<button className={clsx(defaultStyles, propsStyles)}>{children}</button>
	);
}

// dark:text-[#9AA0A6]
