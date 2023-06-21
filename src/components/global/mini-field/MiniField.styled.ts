import styled, { css } from 'styled-components';
import { CellType } from '../../../models/game/cell/CellEntity';

const cellTypes = {
  empty: css`
    background-color: ${({ theme }) => theme.color.background};
    border: 1px solid ${({ theme }) => theme.color.light};
  `,
  circle: css`
    background-color: ${({ theme }) => theme.color.circle};
    border: 1px solid ${({ theme }) => theme.color.circle};
  `,
  cross: css`
    background-color: ${({ theme }) => theme.color.cross};
    border: 1px solid ${({ theme }) => theme.color.cross};
  `,
};

export const MiniFieldStyled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 3px;
  `,
  Cell: styled.div<{ type: CellType }>`
    width: 25px;
    height: 25px;
    ${({ type }) => cellTypes[type]};
  `,
};
