import styled, { css } from 'styled-components';
import { CellType } from './CellEntity';

interface CellStyledProps {
  type: CellType;
}

const cellColor = {
  empty: css`
    background-color: ${({ theme }) => theme.color.background};
    border: 2px solid ${({ theme }) => theme.color.light};
  `,
  circle: css`
    background-color: ${({ theme }) => theme.color.green};
    border: 2px solid ${({ theme }) => theme.color.green};
  `,
  cross: css`
    background-color: ${({ theme }) => theme.color.yellow};
    border: 2px solid ${({ theme }) => theme.color.yellow};
  `,
};

export const CellStyled = {
  Container: styled.div<CellStyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 50px;
    font-weight: bold;

    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.color.light};
      color: ${({ theme }) => theme.color.dark};
    }

    ${({ type }) => cellColor[type]}
  `,
};
