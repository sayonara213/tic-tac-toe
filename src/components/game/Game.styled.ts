import styled from 'styled-components';

export const GameStyled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  `,
  Span: styled.span`
    width: 100%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xlarge};
    color: ${({ theme }) => theme.color.text};
    font-family: 'bold';

    margin-bottom: 50px;
  `,
};
