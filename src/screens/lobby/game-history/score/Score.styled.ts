import styled from 'styled-components';
import { TMove } from '../../../../models/game/field/FieldEntity';

export const ScoreStyled = {
  Container: styled.div`
    width: 100%;
    max-width: 500px;

    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;

    margin-bottom: 30px;
    gap: 10px;
  `,
  IconWrap: styled.div<{ type: TMove }>`
    background-color: ${({ theme, type }) =>
      type === 'circle' ? theme.color.circle : theme.color.cross};
    border-radius: 5px;
    padding: 3px;
    box-sizing: content-box;
    width: 157px;
    display: flex;
    justify-content: center;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
};
