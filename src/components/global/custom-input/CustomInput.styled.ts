import styled, { keyframes } from 'styled-components';

export const lineAnimation = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
`;

export const CustomInputStyled = {
  Container: styled.div<{ width: string; height: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    display: flex;
    flex-direction: column;
  `,
  Input: styled.input`
    width: 100%;
    height: 100%;
    border: none;
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    font-family: 'regular';
    font-size: ${({ theme }) => theme.fontSize.medium};
    outline: none;
  `,
  Line: styled.div`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.light};
    animation: ${lineAnimation} 0.5s cubic-bezier(0, 0.27, 1, 0.61);
  `,
};
