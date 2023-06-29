import styled, { css } from 'styled-components';
import { ICustomButtonStyledProps } from './CustomButton.types';

const buttonTypes = () => ({
  primary: css`
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    border: 2px solid ${({ theme }) => theme.color.light};

    &:hover {
      transform: translateY(-2px);
    }
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
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: transparent;
    font-size: 30px;
    text-transform: uppercase;
    border-radius: 5px;

    transition: all 0.1s ease-in-out;

    ${({ buttonType }) => buttonTypes()[buttonType]}
  `,
  Span: styled.span`
    font-size: ${({ theme }) => theme.fontSize.big};
    font-family: 'medium';
  `,
};
