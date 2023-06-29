import styled from 'styled-components';

export const SinglePlayerStyled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 80px);
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;

    @media screen and (max-width: 1200px) {
      margin-top: 50px;
      height: auto;
      padding: 16px;
    }
  `,
  GameWrapper: styled.div`
    width: 100%;
    height: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  `,
};
