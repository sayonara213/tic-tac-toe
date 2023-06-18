import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { ROUTES } from '../../../constants/routes';
import Home from '../../../screens/home/Home';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
