import React from 'react';
import Field from '../../components/game/field/Field';
import { HomeStyled as Styled } from './Home.styled';
import Game from '../../components/game/Game';

const Home: React.FC = () => {
  return (
    <Styled.Container>
      <Game />
    </Styled.Container>
  );
};

export default Home;
