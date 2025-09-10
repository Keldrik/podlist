import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';

const Header: React.FunctionComponent = () => {
  const [menushow, setMenushow] = useState<boolean>(false);
  const menuclasses = menushow
    ? 'h-full float-right focus:outline-hidden transform rotate-90 transition duration-300 md:hidden'
    : 'h-full float-right focus:outline-hidden transform transition duration-300 md:hidden';
  return (
    <header className="border-b border-gray-600">
      <div className="flex">
        <Logo />
        <div className="">
          <ul className="hidden md:flex justify-between h-full pb-2 text-xl">
            <li className="inline-block self-end hover:text-yellow-500 transition duration-300 ease-in-out mr-16">
              <Link href="/new/[page]" as="/new/1">
                NEU
              </Link>
            </li>
            <li className="inline-block self-end hover:text-yellow-500 transition duration-300 ease-in-out">
              <Link href="/podcast/all/[page]" as="/podcast/all/1">
                PODCASTS
              </Link>
            </li>
          </ul>
          <button
            className={menuclasses}
            onClick={() => setMenushow(!menushow)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-white h-8 hover:text-yellow-500 transition duration-300 ease-in-out"
              viewBox="0 0 24 24"
            >
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={
          menushow ? 'border-t border-gray-600 p-4 md:hidden' : 'hidden'
        }
      >
        <ul className="text-2xl">
          <li className="pb-2 hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link
              href="/new/[page]"
              as="/new/1"
              onClick={() => setMenushow(false)}
            >
              NEU
            </Link>
          </li>
          <li className="border-t border-gray-700 py-2 hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link
              href="/podcast/all/[page]"
              as="/podcast/all/1"
              onClick={() => setMenushow(false)}
            >
              PODCASTS
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
