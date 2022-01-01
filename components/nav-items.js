export const NavAction = ({ children }) => {
	return (
		<div className="w-32 hover:bg-[#8ab4f810] h-full flex items-center justify-center transition cursor-pointer">
			{children}
		</div>
	);
};

export const NavToggle = ({ children }) => {
	return (
		<div className="h-full ml-12 flex items-center justify-center">
			{children}
		</div>
	);
};
