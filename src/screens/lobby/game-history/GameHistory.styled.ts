import styled from 'styled-components';

export const GameHistoryStyled = {
  Container: styled.div`
    margin-top: 20px;
    max-width: 300px;
    height: 555px;

    @media screen and (max-width: 1200px) {
      max-width: 100%;
      height: auto;
    }
  `,
  ButtonsWrapper: styled.div`
    max-width: 300px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  `,
  List: styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Item: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  `,
};
