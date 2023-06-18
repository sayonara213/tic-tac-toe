import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { PropsWithChildren } from 'react';
import React from 'react';
import { reset } from '../../constants/reset';
import { normalize } from '../../constants/normalize';
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
  green: '#538d4e',
  //yellow: '#b59f3b',
  yellow: '#b53b3b',
  lightSecond: '#818384',
};
export const BORDER_RADIUS = {
  small: '4px',
  medium: '15px',
  large: '20px',
  circle: '50%',
};

export const theme = {
  fontSize: FONT_SIZE,
  font: FONT,
  borderRadius: BORDER_RADIUS,
  color: COLOR,
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
  body {
    background: ${COLOR.background};
  }
`;

export const Theme: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
