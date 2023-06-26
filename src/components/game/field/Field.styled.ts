import styled from 'styled-components';

export const FieldStyled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 5px;
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;

    aspect-ratio: 1/1;

    @media screen and (max-width: 768px) {
    }
  `,
};
