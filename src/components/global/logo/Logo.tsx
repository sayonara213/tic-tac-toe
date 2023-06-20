import React from 'react';

import { LogoStyled as Styled } from './Logo.styled';
import { ILogoProps } from './Logo.types';

const Logo: React.FC<ILogoProps> = ({ onClick }) => {
  const text = 'tictactoe';
  const letters = text.split('');

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Styled.Container onClick={handleClick}>
      {letters.map((letter, index) => (
        <Styled.Letter key={index}>{letter}</Styled.Letter>
      ))}
    </Styled.Container>
  );
};

export default Logo;
