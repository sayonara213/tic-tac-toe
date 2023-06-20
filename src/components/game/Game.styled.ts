import styled from 'styled-components';

export const GameStyled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Span: styled.span`
    width: 500px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xlarge};
    color: ${({ theme }) => theme.color.text};
    font-family: 'bold';

    margin-bottom: 50px;
  `,
};
