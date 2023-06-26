import styled from 'styled-components';

export const GameListStyled = {
  Container: styled.div`
    width: 30%;
    min-width: 400px;
    max-height: 500px;
    overflow-y: scroll;

    border-bottom: 1px solid ${({ theme }) => theme.color.light};
    border-top: 1px solid ${({ theme }) => theme.color.light};

    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${({ theme }) => theme.color.light};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.lightSecond};
    }
  `,
  List: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
