import React, { useState } from 'react';
import { IIconProps } from './Icon.types';

import { IconStyled as Styled } from './Icon.styled';
import { IMAGES, TIcon } from '../../../constants/images';
import { useAppSelector } from '../../../hooks/hooks';

const Icon: React.FC<IIconProps> = ({
  type,
  width = '32px',
  height = '32px',
  onClick,
  fadeIn = false,
}) => {
  const { isLight } = useAppSelector((state) => state.theme);

  const handleClick = () => {
    onClick && onClick();
  };

  const changedType = (isLight ? type + 'Black' : type) as TIcon;

  return (
    <Styled.Container
      src={IMAGES[changedType]}
      width={width}
      height={height}
      click={!!handleClick}
      onClick={handleClick}
      fadeIn={fadeIn}
    />
  );
};

export default Icon;
