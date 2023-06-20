import styled from 'styled-components';

export const HeaderStyled = {
  Container: styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 50px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
