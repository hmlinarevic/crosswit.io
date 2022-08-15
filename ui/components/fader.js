import { useRef } from 'react';

import { Transition } from 'react-transition-group';

const duration = 1000;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

const transitionStyles = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
};

export default function Fader({ in: inProp, children }) {
	const ref = useRef();

	return (
		<Transition in={inProp} timeout={duration} nodeRef={ref}>
			{(state) => {
				return (
					<div
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
					>
						{children}
					</div>
				);
			}}
		</Transition>
	);
}
