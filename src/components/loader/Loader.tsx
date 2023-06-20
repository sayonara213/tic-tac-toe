import React from 'react';

import { LoaderStyled as Styled } from './Loader.styled';

const Loader: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.Field>
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
        <Styled.Cell />
      </Styled.Field>
      <Styled.Text>loading</Styled.Text>
    </Styled.Container>
  );
};

export default Loader;
