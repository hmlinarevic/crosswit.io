import clsx from "clsx";

export default function Button({ className: propClasses, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "mx-auto block rounded-xl border border-solid border-gray-300 font-ubuntu transition hover:border-gray-400 dark:border-[#5f6368] dark:hover:bg-neutral-800 dark:hover:text-white",
                propClasses
            )}
        >
            {children}
        </button>
    );
}
