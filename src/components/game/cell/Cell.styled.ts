import styled, { css } from 'styled-components';
import { CellType } from '../../../models/game/cell/CellEntity';
import { TMove } from '../../../models/game/field/FieldEntity';

interface CellStyledProps {
  move: TMove;
  type: CellType;
  isClicked: boolean;
}

const cellColor = (move: TMove) => ({
  empty: css`
    background-color: ${({ theme }) => theme.color.background};
    border: 2px solid ${({ theme }) => theme.color.light};

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px ${({ theme }) => theme.color.background};
      background-color: ${({ theme }) =>
        move === 'circle' ? theme.color.circle : theme.color.cross};
      border: 2px solid
        ${({ theme }) => (move === 'circle' ? theme.color.circle : theme.color.cross)};
    }
  `,
  circle: css`
    background-color: ${({ theme }) => theme.color.circle};
    border: 2px solid ${({ theme }) => theme.color.circle};
  `,
  cross: css`
    background-color: ${({ theme }) => theme.color.cross};
    border: 2px solid ${({ theme }) => theme.color.cross};
  `,
});

export const CellStyled = {
  Container: styled.div<CellStyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 50px;
    font-weight: bold;
    border-radius: 5px;

    transition: all 0.1s ease-in-out;

    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: scaleDownAndUp 0.2s ease-in-out;
      `}

    ${({ type, move }) => cellColor(move)[type]}
    
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
  `,
  Icon: styled.img`
    width: 70%;
  `,
};
