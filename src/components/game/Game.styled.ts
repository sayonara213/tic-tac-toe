import styled from 'styled-components';

export const GameStyled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Button: styled.button`
    margin-top: 50px;
    width: 500px;
    height: 60px;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.color.light};
    color: ${({ theme }) => theme.color.text};
    font-size: 30px;
    font-family: 'regular';
    font-weight: bold;
    cursor: pointer;
  `,
};
