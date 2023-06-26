import styled from 'styled-components';

export const HomeStyled = {
  Container: styled.div`
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 100vh;
    width: 100%;
  `,
  Interactions: styled.div`
    width: 30%;
    min-width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  `,
  JoinGameWrap: styled.div`
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: flex-end;
  `,
};
