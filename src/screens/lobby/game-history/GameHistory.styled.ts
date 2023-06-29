import styled from 'styled-components';

export const GameHistoryStyled = {
  Container: styled.div`
    margin-top: 20px;
    max-width: 300px;

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
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  `,
  ListWrapper: styled.div`
    max-height: 520px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    &::after {
      content: '';
      position: absolute;

      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background: linear-gradient(
        180deg,
        transparent 0%,
        ${({ theme: { color } }) => color.background} 100%
      );
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
