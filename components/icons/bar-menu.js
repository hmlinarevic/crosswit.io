import { useState } from 'react';

export default function BarMenu({ onToggleMenu, className }) {
  const [animateMenu, setAnimateMenu] = useState(false);

  const animateMenuHandler = () => {
    setAnimateMenu((prevState) => !prevState);
    onToggleMenu();
  };

  const barStyles = {
    1: {
      backgroundColor: 'white',
      transform: 'rotate(-45deg) translate(-4px, 5px)',
    },
    2: {
      opacity: 0,
    },
    3: {
      backgroundColor: 'white',
      transform: 'rotate(45deg) translate(-8px, -8px)',
    },
  };

  return (
    <div className={className}>
      <div
        onClick={animateMenuHandler}
        className="w-[50px] h-[50px] bg-black relative m-auto cursor-pointer"
      >
        <div className="absolute top-[8px] left-[12px] z-10">
          <div
            className="w-[26px] h-[2px] bg-white my-[7px] transition-transform"
            style={animateMenu ? barStyles[1] : null}
          />
          <div
            className="w-[26px] h-[2px] bg-white my-[7px] transition-transform"
            style={animateMenu ? barStyles[2] : null}
          />
          <div
            className="w-[26px] h-[2px] bg-white my-[7px] transition-transform"
            style={animateMenu ? barStyles[3] : null}
          />
        </div>
      </div>
    </div>
  );
}
