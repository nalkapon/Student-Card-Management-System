import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, theme, setTheme }) => {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
