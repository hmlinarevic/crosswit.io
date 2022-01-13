import { useRef } from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

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

export default function FadeTransition({ in: inProp, children }) {
  const nodeRef = useRef();
  return (
    <Transition in={inProp} timeout={300} nodeRef={nodeRef}>
      {(state) => (
        <div
          className="sm:hidden"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
