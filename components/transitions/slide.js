import { Transition } from 'react-transition-group';

const duration = 750;

const defaultStyle = {
  transform: 'translateX(-100%)',
  transition: `transform ${duration}ms ease-in-out`,
};

const transitionStyles = {
  entering: { transform: 'translateX(0%)' },
  entered: { transform: 'translateX(0%)' },
  exiting: {},
  exited: {},
};

export default function SlideTransition({ in: inProp, children }) {
  return (
    <Transition in={inProp} timeout={750}>
      {(state) => (
        <div
          className="absolute left-0 top-0 w-full h-full"
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
