import React from 'react';
import { ICustomTextProps } from './CustomText.types';

import { CustomTextStyled as Styled } from './CustomText.styled';

const CustomText: React.FC<ICustomTextProps> = ({
  children,
  fontFamily = 'regular',
  fontSize = 'medium',
  color = 'text',
}) => {
  return (
    <Styled.Text color={color} fontSize={fontSize} fontFamily={fontFamily}>
      {children}
    </Styled.Text>
  );
};

export default CustomText;
