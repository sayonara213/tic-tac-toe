import styled from 'styled-components';

export const GameListItemStyled = {
  Container: styled.div`
    padding: 0 20px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.color.light};
    border-bottom: none;
    box-sizing: border-box;

    &:last-child {
      border-bottom: 1px solid ${({ theme }) => theme.color.light};
    }
  `,
};
