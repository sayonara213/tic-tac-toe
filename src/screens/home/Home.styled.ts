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
    height: calc(100vh - 80px);
    width: 100%;

    @media screen and (max-width: 768px) {
      margin-top: 24px;
      height: auto;
      padding: 0 16px;
      margin-bottom: 24px;
    }
  `,
  Interactions: styled.div`
    width: 30%;
    min-width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    @media screen and (max-width: 768px) {
      width: 100%;
      min-width: 300px;
    }
  `,
  JoinGameWrap: styled.div`
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: flex-end;
  `,
};
