import styled from 'styled-components';
import { TMove } from '../../../../models/game/field/FieldEntity';

export const GameHistoryItemStyled = {
  Container: styled.div`
    min-width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  IconWrap: styled.div<{ type: TMove }>`
    height: 32px;
    background-color: ${({ theme, type }) =>
      type === 'circle' ? theme.color.circle : theme.color.cross};
    border-radius: 5px;
    padding: 2px;
    box-sizing: content-box;
  `,
};
