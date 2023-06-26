import styled from 'styled-components';

export const HeaderStyled = {
  Container: styled.div`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.background};

    @media screen and (max-width: 768px) {
      flex-direction: column;
      margin-top: 20px;
    }
  `,
  UserContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  ParamsWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 768px) {
      margin-top: 10px;
    }
  `,
};
