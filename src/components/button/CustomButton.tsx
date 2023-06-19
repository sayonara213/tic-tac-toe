import React from 'react';
import { ICustomButtonProps } from './CustomButton.types';

import { CustomButtonStyled as Styled } from './CustomButton.styled';

const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  disabled,
  width = '100%',
  height = '50px',
}) => {
  return (
    <Styled.Button buttonType={type} width={width} height={height} onClick={onClick}>
      <Styled.Span>{children}</Styled.Span>
    </Styled.Button>
  );
};

export default CustomButton;
