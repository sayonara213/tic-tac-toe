import React from 'react';

import { HeaderStyled as Styled } from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import Logo from '../logo/Logo';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(ROUTES.home);
  };

  return (
    <Styled.Container>
      <Logo onClick={back} />
    </Styled.Container>
  );
};

export default Header;
