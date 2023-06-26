import styled from 'styled-components';

export const LobbyStyled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px);
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;

    @media screen and (max-width: 1200px) {
      margin-top: 50px;
      flex-direction: column;
      height: auto;
      padding: 16px;
    }
  `,
  GameContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  HistoryContainer: styled.div`
    position: absolute;
    right: 50px;

    @media screen and (max-width: 1200px) {
      position: relative;
      margin-top: 20px;
      max-width: 500px;
      right: 0;
    }
  `,
};
