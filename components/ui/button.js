import clsx from "clsx";

export default function Button({ className: propClasses, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "block min-h-[30px] min-w-[96px] rounded-xl border border-solid border-muted font-roboto text-sm tracking-wide text-muted transition hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose",
                propClasses
            )}
        >
            {children}
        </button>
    );
}
