import styled from 'styled-components';
import { greenTextAnimation, redTextAnimation } from '../../../constants/animation';

export const LogoStyled = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
    cursor: pointer;
    &:hover {
      & > span:nth-child(1) {
        animation: ${greenTextAnimation} 0.5s infinite 0.1s;
      }
      & > span:nth-child(2) {
        animation: ${redTextAnimation} 0.5s infinite 0.2s;
      }
      & > span:nth-child(3) {
        animation: ${greenTextAnimation} 0.5s infinite 0.8s;
      }
      & > span:nth-child(4) {
        animation: ${redTextAnimation} 0.5s infinite 0.4s;
      }
      & > span:nth-child(5) {
        animation: ${greenTextAnimation} 0.5s infinite 0.5s;
      }
      & > span:nth-child(6) {
        animation: ${redTextAnimation} 0.5s infinite 0.1s;
      }
      & > span:nth-child(7) {
        animation: ${greenTextAnimation} 0.5s infinite 0.7s;
      }
      & > span:nth-child(8) {
        animation: ${redTextAnimation} 0.5s infinite 0.2s;
      }
      & > span:nth-child(9) {
        animation: ${greenTextAnimation} 0.5s infinite 0.9s;
      }
    }
  `,
  Letter: styled.span`
    font-size: ${({ theme }) => theme.fontSize.xlarge};
    color: ${({ theme }) => theme.color.text};
    font-family: 'medium';
    text-transform: uppercase;
  `,
};
