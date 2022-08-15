import { useState } from 'react';
import Link from 'next/link';

import ThemeChanger from '../theme-changer';

import Logo from '../logo';
import ActivityIcon from '../icons/activity-icon';

export default function MainNavigation(props) {
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);

  const toggleActiviyDropdown = () => {
    setShowActivityDropdown((prevState) => !prevState);
  };

  return (
    <nav className="w-4/5 h-full m-auto flex items-center justify-between ">
      <Link href="/">
        <a>
          <Logo width={58} height={58} fontSize="1.85rem" />
        </a>
      </Link>

      <ul className="h-full text-neutral-400 flex items-stretch">
        <li className=" w-32 h-full flex items-center justify-center cursor-pointer select-none hover:bg-neutral-900 hover:text-white">
          <Link href="/new">
            <a>New</a>
          </Link>
        </li>
        <li
          className="w-32 h-full flex items-center justify-center cursor-pointer select-none hover:bg-neutral-900 hover:text-white"
          onClick={props.onSideBarToggle}
        >
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="w-32 h-full flex items-center justify-center transition  select-none relative">
          <button
            onClick={toggleActiviyDropdown}
            className="rounded-full p-4 hover:bg-neutral-900 hover:text-white"
          >
            <ActivityIcon size={22} />
          </button>
          {showActivityDropdown && (
            <div className="absolute top-[100%] left-0 bg-neutral-500 w-full text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
                esse mollitia temporibus eaque vero eligendi maiores quisquam
                impedit odio itaque!
              </p>
            </div>
          )}
        </li>
        <li className="ml-6 h-full flex items-center justify-center select-none">
          <ThemeChanger className="rounded-full p-4 hover:bg-neutral-900 hover:text-white" />
        </li>
      </ul>
    </nav>
  );
}
