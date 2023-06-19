import styled, { css } from 'styled-components';
import { ICustomButtonProps, ICustomButtonStyledProps } from './CustomButton.types';

const buttonTypes = () => ({
  primary: css`
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    border: 2px solid ${({ theme }) => theme.color.light};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.color.light};
    color: ${({ theme }) => theme.color.text};
    border: 2px solid ${({ theme }) => theme.color.light};
  `,
  red: css`
    background-color: ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.text};
    border: none;
  `,
  green: css`
    background-color: ${({ theme }) => theme.color.green};
    color: ${({ theme }) => theme.color.text};
    border: none;
  `,
});

export const CustomButtonStyled = {
  Button: styled.button<ICustomButtonStyledProps>`
    margin-top: 50px;
    width: 500px;
    height: 60px;
    background-color: transparent;
    font-size: 30px;

    transition: all 0.1s ease-in-out;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px ${({ theme }) => theme.color.background};
    }

    &:active {
      transform: scale(1);
    }

    ${({ buttonType }) => buttonTypes()[buttonType]}
  `,
  Span: styled.span`
    font-size: ${({ theme }) => theme.fontSize.big};
    font-family: 'bold';
  `,
};
