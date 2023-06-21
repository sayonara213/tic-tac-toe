import React from 'react';

import { ICustomInputProps } from './CustomInput.types';

import { CustomInputStyled as Styled } from './CustomInput.styled';

const CustomInput: React.FC<ICustomInputProps> = ({
  value,
  onChange,
  placeholder,
  width = '100%',
  height = '30px',
  autoFocus = false,
  fontFamily = 'regular',
  fontSize = 'medium',
  color = 'text',
  backgroundColor = 'background',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Styled.Container width={width} height={height}>
      <Styled.Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
      <Styled.Line />
    </Styled.Container>
  );
};

export default CustomInput;
