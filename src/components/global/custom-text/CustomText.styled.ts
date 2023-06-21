import styled from 'styled-components';
import { ICustomTextStyles } from './CustomText.types';

export const CustomTextStyled = {
  Text: styled.p<ICustomTextStyles>`
    font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
    color: ${({ theme, color }) => theme.color[color]};
    font-family: ${({ theme, fontFamily }) => theme.font[fontFamily]};
  `,
};
