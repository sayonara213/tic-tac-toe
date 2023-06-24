import { keyframes } from 'styled-components';

export const redAnimation = (colors: any) => keyframes`
  0% {
    background-color: ${colors.light};
  }
  50% {
     background-color: ${colors.cross};
  }
  100% {
     background-color: ${colors.light};
  }
`;

export const greenAnimation = (colors: any) => keyframes`
  0% {
    background-color: ${colors.light};
  }
  50% {
    background-color: ${colors.circle};
  }
  100% {
    background-color: ${colors.light};
  }
`;

export const greenTextAnimation = (colors: any) => keyframes`
  0% {
    color: ${colors.text};
  }
  50% {
    color: ${colors.circle};
  }
  100% {
    color: ${colors.text};
  }
`;

export const redTextAnimation = (colors: any) => keyframes`
  0% {
    color: ${colors.text};
  }
  50% {
    color: ${colors.cross};
  }
  100% {
    color: ${colors.text};
  }
`;

export const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;
