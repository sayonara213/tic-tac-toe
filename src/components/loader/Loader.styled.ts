import styled, { keyframes } from 'styled-components';
import { greenAnimation, redAnimation } from '../../constants/animation';

const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(-15deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoaderStyled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Field: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);

    justify-items: center;
    grid-gap: 3px;
    animation-delay: 1s;
    animation: ${rotateAnimation} 2s infinite;

    margin-bottom: 30px;
  `,
  Cell: styled.div`
    width: 25px;
    height: 25px;
    background-color: ${({ theme }) => theme.color.light};
    &:nth-child(1) {
      animation: ${greenAnimation} 1s infinite;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation: ${redAnimation} 1s infinite;
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation: ${redAnimation} 1s infinite;
      animation-delay: 0.4s;
    }
    &:nth-child(4) {
      animation: ${greenAnimation} 1s infinite;
      animation-delay: 0.6s;
    }
    &:nth-child(5) {
      animation: ${redAnimation} 1s infinite;
      animation-delay: 1.2s;
    }
    &:nth-child(6) {
      animation: ${greenAnimation} 1s infinite;
      animation-delay: 1s;
    }
    &:nth-child(7) {
      animation: ${greenAnimation} 1s infinite;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      animation: ${greenAnimation} 1s infinite;
      animation-delay: 1.4s;
    }
    &:nth-child(9) {
      animation: ${redAnimation} 1s infinite;
      animation-delay: 1s;
    }
  `,
  Text: styled.span`
    font-size: 20px;
    font-family: 'medium';
    color: ${({ theme }) => theme.color.text};
    text-transform: uppercase;
    width: 100%;
    text-align: center;
  `,
};

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
`;
