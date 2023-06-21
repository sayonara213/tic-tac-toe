import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { PropsWithChildren } from 'react';
import React from 'react';
import { reset } from '../../constants/reset';
import { normalize } from '../../constants/normalize';
import { ITheme } from './theme.types';
export const FONT_SIZE = {
  footer: '12px',
  small: '14px',
  medium: '16px',
  big: '20px',
  large: '24px',
  xlarge: '36px',
};
export const FONT = {
  thin: 'thin',
  light: 'light',
  regular: 'regular',
  medium: 'medium',
  bold: 'bold',
  black: 'black',
};
export const COLOR = {
  background: '#121213',
  dark: '#3a3a3c',
  text: '#ffffff',
  light: '#c2c2c3',
  circle: '#538d4e',
  //yellow: '#b59f3b',
  cross: '#b53b3b',
  lightSecond: '#818384',
};

export const COLOR_LIGHT = {
  background: '#ededec',
  dark: '#3a3a3c',
  text: '#000000',
  light: '#535352',
  circle: '#4ac4c4',
  //yellow: '#b59f3b',
  cross: '#ac72b1',
  lightSecond: '#818384',
};

export const BORDER_RADIUS = {
  small: '4px',
  medium: '15px',
  large: '20px',
  circle: '50%',
};

export const light = {
  fontSize: FONT_SIZE,
  font: FONT,
  borderRadius: BORDER_RADIUS,
  color: COLOR_LIGHT,
};

export const dark = {
  fontSize: FONT_SIZE,
  font: FONT,
  borderRadius: BORDER_RADIUS,
  color: COLOR,
};

const GlobalStyle = createGlobalStyle<{ isLight: boolean }>`
  ${normalize}
  ${reset}
  body {
    background: ${({ isLight }) => (isLight ? COLOR_LIGHT.background : COLOR.background)};
  }
`;

export const Theme: React.FC<ITheme> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme ? light : dark}>
      <GlobalStyle isLight={theme} />
      {children}
    </ThemeProvider>
  );
};
