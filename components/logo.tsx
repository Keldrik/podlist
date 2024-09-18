import React from 'react';
import Link from 'next/link';

const Logo: React.FunctionComponent = () => (
  <div className="flex-1">
    <Link href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current text-yellow-500 h-8 inline-block align-middle mr-1 hover:text-gray-400 transition duration-300 ease-in-out"
        viewBox="0 0 24 24"
      >
        <path d="M13 18.94V21h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h3v-2.06A8 8 0 0 1 4 11a1 1 0 0 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 2 0 8 8 0 0 1-7 7.94zM12 1a4 4 0 0 1 4 4v6a4 4 0 1 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
      </svg>
      <h1 className="text-4xl inline-block align-middle pb-1 hover:text-yellow-500 transition duration-300 ease-in-out">
        PODLIST
      </h1>
    </Link>
  </div>
);

export default Logo;
