import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { ROUTES } from '../../../constants/routes';
import Home from '../../../screens/home/Home';
import Lobby from '../../../screens/lobby/Lobby';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setUser } from '../../../redux/user.slice';
import { checkIfUserExists, createUser } from '../../../services/auth';

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const saveUser = async () => {
    const fetchedUser = await checkIfUserExists(user);
    if (!fetchedUser) {
      const newUser = await createUser();
      dispatch(setUser(newUser));
    } else {
      dispatch(setUser(fetchedUser));
    }
  };

  useEffect(() => {
    console.log(user);

    saveUser();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.game + ':id'} element={<Lobby />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
