import { useState } from 'react';

import classNames from 'classnames';

export default function BarMenu({ onToggleMenu, className }) {
  const [animateMenu, setAnimateMenu] = useState(false);

  const animateMenuHandler = () => {
    setAnimateMenu((prevState) => !prevState);
    onToggleMenu();
  };

  const barStyles = {
    1: {
      transform: 'rotate(-45deg) translate(-4px, 5px)',
    },
    2: {
      opacity: 0,
    },
    3: {
      transform: 'rotate(45deg) translate(-8px, -8px)',
    },
  };

  const barClasses = classNames(
    'w-[40px] h-[40px] bg-red-200 p-1 cursor-pointer z-50',
    className
  );

  console.log(barClasses);

  return (
    <div onClick={animateMenuHandler} className={barClasses}>
      <div>
        <div
          className="w-full h-[2px] bg-neutral-400 my-[7px] transition-transform"
          style={animateMenu ? barStyles[1] : null}
        />
        <div
          className="w-full h-[2px] bg-neutral-400 my-[7px] transition-transform"
          style={animateMenu ? barStyles[2] : null}
        />
        <div
          className="w-full h-[2px] bg-neutral-400 my-[7px] transition-transform"
          style={animateMenu ? barStyles[3] : null}
        />
      </div>
    </div>
  );
}
