import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full text-center py-4 text-gray-200 border-none text-sm mt-8">
    &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
  </footer>
);

export default Footer;
