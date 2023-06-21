import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { ROUTES } from '../../../constants/routes';
import Home from '../../../screens/home/Home';
import Lobby from '../../../screens/lobby/Lobby';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setUser } from '../../../redux/user.slice';
import { checkIfUserExists, createUser } from '../../../services/auth';
import Loader from '../../loader/Loader';
import { LoaderContainer } from '../../loader/Loader.styled';

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const saveUser = async () => {
    const fetchedUser = await checkIfUserExists(user);
    if (!fetchedUser) {
      const newUser = await createUser(user);
      dispatch(setUser(newUser));
    } else {
      dispatch(setUser(fetchedUser));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    saveUser();
  }, []);

  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

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
