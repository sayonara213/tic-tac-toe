import styled from 'styled-components';

export const FieldStyled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 5px;
    width: 500px;
    height: 500px;
  `,
};
