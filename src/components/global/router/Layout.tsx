import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
