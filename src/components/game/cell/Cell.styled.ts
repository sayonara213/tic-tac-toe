import styled, { css } from 'styled-components';
import { CellType } from './CellEntity';
import { TMove } from '../field/FieldEntity';

interface CellStyledProps {
  move: TMove;
  type: CellType;
  isClicked: boolean;
}

const cellColor = {
  empty: css`
    background-color: ${({ theme }) => theme.color.background};
    border: 2px solid ${({ theme }) => theme.color.light};

    &:hover {
      transform: scale(1.1);
      color: ${({ theme }) => theme.color.dark};
      box-shadow: 0 0 10px ${({ theme }) => theme.color.background};
    }
  `,
  circle: css`
    background-color: ${({ theme }) => theme.color.green};
    border: 2px solid ${({ theme }) => theme.color.green};

    &:hover {
      background-color: ${({ theme }) => theme.color.green};
      border: 2px solid ${({ theme }) => theme.color.green};
    }
  `,
  cross: css`
    background-color: ${({ theme }) => theme.color.yellow};
    border: 2px solid ${({ theme }) => theme.color.yellow};

    &:hover {
      background-color: ${({ theme }) => theme.color.yellow};
      border: 2px solid ${({ theme }) => theme.color.yellow};
    }
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
      background-color: ${({ theme, move }) =>
        move === 'circle' ? theme.color.green : theme.color.yellow};

      border: 2px solid
        ${({ theme, move }) => (move === 'circle' ? theme.color.green : theme.color.yellow)};
    }

    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: scaleDownAndUp 0.2s ease-in-out;
      `}

    @keyframes scaleDownAndUp {
      0% {
        transform: scale(1.1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
    ${({ type }) => cellColor[type]}
  `,
  Icon: styled.img`
    width: 70%;
  `,
};
