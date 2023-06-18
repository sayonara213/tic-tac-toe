import React from 'react';
import Field from '../../components/game/field/Field';
import { HomeStyled as Styled } from './Home.styled';

const Home: React.FC = () => {
  return (
    <Styled.Container>
      <Field />;
    </Styled.Container>
  );
};

export default Home;
