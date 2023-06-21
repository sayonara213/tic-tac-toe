import styled, { css } from 'styled-components';
import { fadeInAnimation } from '../../../constants/animation';

export const IconStyled = {
  Container: styled.img<{ width: string; height: string; click: boolean; fadeIn: boolean }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    cursor: ${({ click }) => (click ? 'pointer' : 'default')};
    object-fit: contain;
    fill: ${({ theme }) => theme.color.text};

    ${({ fadeIn }) =>
      fadeIn &&
      css`
        animation: ${fadeInAnimation} 0.3s ease-in-out;
      `}
  `,
};
