import styled from 'styled-components';

export const GameHistoryStyled = {
  Container: styled.div`
    max-width: 300px;
    height: 555px;
  `,
  List: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    overflow-y: scroll;
  `,
  Item: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  `,
};
