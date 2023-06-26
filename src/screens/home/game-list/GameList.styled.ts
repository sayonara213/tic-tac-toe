import styled from 'styled-components';

export const GameListStyled = {
  Container: styled.div`
    width: 30%;
    min-width: 400px;
    max-height: 500px;
    overflow-y: scroll;

    border: 1px solid ${({ theme }) => theme.color.light};

    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${({ theme }) => theme.color.light};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.lightSecond};
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      min-width: 300px;
    }
  `,
  List: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
