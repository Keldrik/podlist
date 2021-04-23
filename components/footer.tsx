import React from 'react';

const year = new Date(Date.now()).getFullYear();

const Footer: React.FunctionComponent = () => (
  <footer className="border-t border-gray-600 pt-2 pb-5">
    <p className="text-center">
      © Copyright Podlist {year} - Created by{' '}
      <a className="text-yellow-500" href="https://www.keldrik.com">
        Keldrik
      </a>
    </p>
  </footer>
);

export default Footer;
