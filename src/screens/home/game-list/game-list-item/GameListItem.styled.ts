import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const skeletonFieldAnimation = keyframes`
  0% {
    background-position: -84px 0;
  }
  100% {
    background-position: calc(84px + 100%) 0;
  }
`;

const skeletonButtonAnimation = keyframes`
  0% {
    background-position: -100px 0;
  }
  100% {
    background-position: calc(100px + 100%) 0;
  }
`;

export const GameListItemStyled = {
  Container: styled.div`
    padding: 10px 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.color.light};
    border-bottom: none;
    box-sizing: border-box;

    &:first-child {
      border-top: none;
    }
  `,
  InteractiveContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  SkeletonText: styled.div`
    width: 200px;
    height: 50px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.color.background} 0px,
      ${({ theme }) => theme.color.dark} 200%,
      ${({ theme }) => theme.color.background} 400%
    );
    animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
    border-radius: 5px;
  `,
  SkeletonButton: styled.div`
    width: 100px;
    height: 50px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.color.background} 0px,
      ${({ theme }) => theme.color.dark} 200%,
      ${({ theme }) => theme.color.background} 400%
    );
    animation: ${skeletonButtonAnimation} 1.2s ease-in-out infinite;
    border-radius: 5px;
  `,
  SkeletonField: styled.div`
    width: 84px;
    height: 84px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.color.background} 0px,
      ${({ theme }) => theme.color.dark} 200%,
      ${({ theme }) => theme.color.background} 400%
    );

    animation: ${skeletonFieldAnimation} 1.2s ease-in-out infinite;

    border-radius: 5px;
  `,
};
