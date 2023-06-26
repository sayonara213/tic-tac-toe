import styled from 'styled-components';
import { TMove } from '../../../../models/game/field/FieldEntity';

export const ScoreStyled = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;

    gap: 10px;
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
